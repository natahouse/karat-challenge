import { Module } from '@nestjs/common';

import {
  AuthorizationRepository,
  SqlAuthorizationRepository,
} from './repositories';
import { FetchAllAuthorizationsService } from './services/fetch-all-authorizations.service';
import { AuthorizationController } from './authorizations.controller';
import { CreateAuthorizationFromEventService } from './services';
import { CardsModule } from '../cards/cards.module';

@Module({
  controllers: [AuthorizationController],
  providers: [
    { provide: AuthorizationRepository, useClass: SqlAuthorizationRepository },
    FetchAllAuthorizationsService,
    CreateAuthorizationFromEventService,
  ],
  imports: [CardsModule],
  exports: [CreateAuthorizationFromEventService],
})
export class AuthorizationsModule {}
