import { Module } from '@nestjs/common';
import { StripeEventsController } from './stripe-events.controller';
import { AuthorizationsModule } from '../authorizations/authorizations.module';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  controllers: [StripeEventsController],
  imports: [AuthorizationsModule, TransactionsModule],
})
export class StripeEventsModule {}
