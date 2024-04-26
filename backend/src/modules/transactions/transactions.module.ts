import { Module } from '@nestjs/common';

import {
  TransactionRepository,
  SqlTransactionRepository,
} from './repositories';

import { CreateTransactionFromEventService } from './services';
import { CardsModule } from '../cards/cards.module';
import { AuthorizationsModule } from '../authorizations/authorizations.module';
import { PaymentsModule } from '../payments/payments.module';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';

@Module({
  controllers: [],
  providers: [
    { provide: TransactionRepository, useClass: SqlTransactionRepository },
    CreateTransactionFromEventService,
  ],
  imports: [
    CardsModule,
    AuthorizationsModule,
    PaymentsModule,
    CacheManagerModule,
  ],
  exports: [CreateTransactionFromEventService],
})
export class TransactionsModule {}
