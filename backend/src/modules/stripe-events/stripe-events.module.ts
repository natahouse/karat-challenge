import { Module } from '@nestjs/common';
import { StripeEventsController } from './stripe-events.controller';
import { AuthorizationsModule } from '../authorizations/authorizations.module';

@Module({
  controllers: [StripeEventsController],
  imports: [AuthorizationsModule],
})
export class StripeEventsModule {}
