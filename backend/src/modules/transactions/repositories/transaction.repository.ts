import { Injectable } from '@nestjs/common';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class TransactionRepository {
  abstract findAll(): Promise<
    {
      id: string;
    }[]
  >;

  abstract save(
    transactionEntity: TransactionEntity,
    tx: Transaction,
  ): Promise<void>;

  abstract findByExternalId(idExternal: string): Promise<TransactionEntity>;
}
