import { Module } from '@nestjs/common';

import {
  AuthorizationRepository,
  SqlAuthorizationRepository,
} from './repositories';
import { FetchAllAuthorizationsService } from './services/fetch-all-authorizations.service';
import { AuthorizationController } from './authorizations.controller';
import { CreateAuthorizationsService } from './services';

@Module({
  controllers: [AuthorizationController],
  providers: [
    { provide: AuthorizationRepository, useClass: SqlAuthorizationRepository },
    FetchAllAuthorizationsService,
    CreateAuthorizationsService,
  ],
})
export class AuthorizationsModule {}
