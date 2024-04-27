import { Module } from '@nestjs/common';

import {
  AuthorizationRepository,
  SqlAuthorizationRepository,
} from './repositories';
import { AuthorizationController } from './authorizations.controller';
import {
  AuthorizationEventConsumer,
  CreateAuthorizationFromEventService,
  FetchAllAuthorizationsService,
} from './services';
import { CardsModule } from '../cards/cards.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  controllers: [AuthorizationController],
  providers: [
    { provide: AuthorizationRepository, useClass: SqlAuthorizationRepository },
    FetchAllAuthorizationsService,
    CreateAuthorizationFromEventService,
    AuthorizationEventConsumer,
  ],
  imports: [CardsModule, PaymentsModule],
  exports: [
    CreateAuthorizationFromEventService,
    { provide: AuthorizationRepository, useClass: SqlAuthorizationRepository },
  ],
})
export class AuthorizationsModule {}
