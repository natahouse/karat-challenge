import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AuthorizationRepository } from '../repositories';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import { AuthorizationEntity, AuthorizationEventEntity } from '../entities';
import { CardRepository } from 'src/modules/cards/repositories';

@Injectable()
export class CreateAuthorizationFromEventService {
  private logger = new Logger(CreateAuthorizationFromEventService.name);
  constructor(
    private readonly authorizationRepository: AuthorizationRepository,
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

      const authorization = await this.authorizationRepository.findByExternalId(
        event.id,
      );
      if (authorization) {
        this.logger.debug(
          `Authorization with external ID "${event.id}" was already registered. Exiting process...`,
        );
        return;
      }

      const entity: AuthorizationEntity = {
        idExternal: event.id,
        approved: event.approved,
        idCard: card.id,
      };

      await this.authorizationRepository.save(entity, tx);
    });
  }
}
