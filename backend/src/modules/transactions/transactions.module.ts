import { Module } from '@nestjs/common';

import {
  TransactionRepository,
  SqlTransactionRepository,
} from './repositories';

import { CreateTransactionFromEventService } from './services';
import { CardsModule } from '../cards/cards.module';
import { AuthorizationsModule } from '../authorizations/authorizations.module';

@Module({
  controllers: [],
  providers: [
    { provide: TransactionRepository, useClass: SqlTransactionRepository },
    CreateTransactionFromEventService,
  ],
  imports: [CardsModule, AuthorizationsModule],
  exports: [CreateTransactionFromEventService],
})
export class TransactionsModule {}
