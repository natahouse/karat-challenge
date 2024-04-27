import { Module } from '@nestjs/common';
import { StripeEventsController } from './stripe-events.controller';
import { AuthorizationsModule } from '../authorizations/authorizations.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/constants/queues';

@Module({
  controllers: [StripeEventsController],
  imports: [
    AuthorizationsModule,
    TransactionsModule,
    BullModule.registerQueue({
      name: queueNames.AUTHORIZATION_QUEUE_NAME,
    }),
    BullModule.registerQueue({
      name: queueNames.TRANSACTION_QUEUE_NAME,
    }),
  ],
})
export class StripeEventsModule {}
