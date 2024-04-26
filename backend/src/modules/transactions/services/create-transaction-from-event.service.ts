import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repositories';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import { TransactionEntity, TransactionEventEntity } from '../entities';
import { CardRepository } from 'src/modules/cards/repositories';
import { AuthorizationRepository } from 'src/modules/authorizations/repositories';
import { PaymentRepository } from 'src/modules/payments/repositories';
import { CacheService } from 'src/modules/cache-manager/services';

@Injectable()
export class CreateTransactionFromEventService {
  private logger = new Logger(CreateTransactionFromEventService.name);
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly cardRepository: CardRepository,
    private readonly drizzleService: DrizzleService,
    private readonly cacheManager: CacheService,
  ) {}

  async execute(event: TransactionEventEntity) {
    return this.drizzleService.getDb().transaction(async (tx) => {
      const alreadyExists =
        !!(await this.transactionRepository.findByExternalId(event.id));

      if (alreadyExists) {
        this.logger.debug(
          `Transaction with external ID "${event.id}" was already registered. Exiting process...`,
        );
        return;
      }

      const idCardExternal =
        typeof event.card === 'string' ? event.card : event.card.id;

      const card = await this.cardRepository.findByExternalId(idCardExternal);

      if (!card) {
        throw new NotFoundException({
          error: 'CardNotFound',
          message: `Card with external ID "${idCardExternal}" wasn't found`,
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

      const transaction = await this.transactionRepository.save(
        {
          idExternal: event.id,
          idAuthorization: authorization.id,
          idCard: card.id,
        },
        tx,
      );

      const payment = await this.paymentRepository.findOneByAuthorization(
        authorization.id,
      );

      // invalidate cache for precalculated metrics
      await this.cacheManager.delByPattern(`CARD:${card.id}:METRICS`);

      if (!payment)
        throw new NotFoundException({
          error: 'PaymentNotFound',
          message: 'No payment entity found for the given authorization.',
        });

      await this.paymentRepository.update(
        payment.id,
        {
          idTransaction: transaction.id,
          status: 'approved',
        },
        tx,
      );
    });
  }
}
