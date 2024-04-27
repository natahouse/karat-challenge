import { Module } from '@nestjs/common';
import { StripeEventsController } from './stripe-events.controller';
import { AuthorizationsModule } from '../authorizations/authorizations.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { BullModule } from '@nestjs/bull';
import {
  DEFAULT_REMOVE_ON_COMPLETION,
  DEFAULT_REMOVE_ON_FAIL,
  queueNames,
} from 'src/constants/queues';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  controllers: [StripeEventsController],
  imports: [
    AuthorizationsModule,
    TransactionsModule,
    BullModule.registerQueue({
      name: queueNames.AUTHORIZATION_QUEUE_NAME,
      defaultJobOptions: {
        removeOnComplete: DEFAULT_REMOVE_ON_COMPLETION,
        removeOnFail: DEFAULT_REMOVE_ON_FAIL,
      },
    }),
    BullBoardModule.forFeature({
      name: queueNames.AUTHORIZATION_QUEUE_NAME,
      adapter: BullAdapter,
    }),
    BullModule.registerQueue({
      name: queueNames.TRANSACTION_QUEUE_NAME,
      defaultJobOptions: {
        removeOnComplete: DEFAULT_REMOVE_ON_COMPLETION,
        removeOnFail: DEFAULT_REMOVE_ON_FAIL,
      },
    }),
    BullBoardModule.forFeature({
      name: queueNames.TRANSACTION_QUEUE_NAME,
      adapter: BullAdapter,
    }),
  ],
})
export class StripeEventsModule {}
