import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import { TransactionEntity, TransactionEventEntity } from '../entities';
import { CardRepository } from 'src/modules/cards/repositories';
import { AuthorizationRepository } from 'src/modules/authorizations/repositories';

@Injectable()
export class CreateTransactionFromEventService {
  private logger = new Logger(CreateTransactionFromEventService.name);
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly cardRepository: CardRepository,
    private readonly drizzleService: DrizzleService,
  ) {}

  async execute(event: TransactionEventEntity) {
    return this.drizzleService.getDb().transaction(async (tx) => {
      const transaction = await this.transactionRepository.findByExternalId(
        event.id,
      );
      if (transaction) {
        this.logger.debug(
          `Transaction with external ID "${event.id}" was already registered. Exiting process...`,
        );
        return;
      }

      const idCard =
        typeof event.card === 'string' ? event.card : event.card.id;

      const card = await this.cardRepository.findByExternalId(idCard);

      if (!card) {
        throw new NotFoundException({
          error: 'CardNotFound',
          message: `Card with external ID "${idCard}" wasn't found`,
        });
      }

      const idAuthorization =
        typeof event.authorization === 'string'
          ? event.authorization
          : event.authorization.id;

      const authorization =
        await this.authorizationRepository.findByExternalId(idAuthorization);

      if (!authorization) {
        throw new NotFoundException({
          error: 'AuthorizationNotFound',
          message: `Authorization with external ID "${idAuthorization}" wasn't found`,
        });
      }

      const entity: TransactionEntity = {
        idExternal: event.id,
        idAuthorization: authorization.id,
        idCard: card.id,
      };

      await this.transactionRepository.save(entity, tx);
    });
  }
}
