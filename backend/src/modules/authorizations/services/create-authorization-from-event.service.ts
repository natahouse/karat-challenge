import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthorizationRepository } from '../repositories';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import { AuthorizationEventEntity } from '../entities';
import { CardRepository } from 'src/modules/cards/repositories';
import { PaymentRepository } from 'src/modules/payments/repositories';

@Injectable()
export class CreateAuthorizationFromEventService {
  private logger = new Logger(CreateAuthorizationFromEventService.name);
  constructor(
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly cardRepository: CardRepository,
    private readonly drizzleService: DrizzleService,
  ) {}

  async execute(event: AuthorizationEventEntity) {
    return this.drizzleService.getDb().transaction(async (tx) => {
      const card = await this.cardRepository.findByExternalId(event.card.id);

      if (!card) {
        throw new NotFoundException({
          error: 'CardNotFound',
          message: `Card with external ID "${event.card.id}" wasn't found`,
        });
      }

      const alreadyExists =
        !!(await this.authorizationRepository.findByExternalId(event.id));

      if (alreadyExists) {
        this.logger.debug(
          `Authorization with external ID "${event.id}" was already registered. Exiting process...`,
        );
        return;
      }

      const authorization = await this.authorizationRepository.save(
        {
          idExternal: event.id,
          approved: event.approved,
          idCard: card.id,
        },
        tx,
      );

      await this.paymentRepository.save(
        {
          amount: event.amount,
          category: event.merchant_data.category,
          businessName: event.merchant_data.name,
          idCard: card.id,
          idAuthorization: authorization.id,
          status: !event.approved ? 'declined' : 'pending',
        },
        tx,
      );
    });
  }
}
