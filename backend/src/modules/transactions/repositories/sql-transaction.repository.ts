import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { transaction } from 'src/modules/libs/drizzle/schema';
import { TransactionRepository } from './transaction.repository';
import { TransactionEntity } from '../entities/transaction.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';
import { eq } from 'drizzle-orm';

@Injectable()
export class SqlTransactionRepository implements TransactionRepository {
  private schema = transaction;

  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDb();

    return await db.select({ id: this.schema.id }).from(this.schema);
  }

  async findByExternalId(idExternal: string) {
    const db = this.drizzleService.getDb();

    const [transaction] = await db
      .select({
        id: this.schema.id,
        idExternal: this.schema.idExternal,
        idAuthorization: this.schema.idAuthorization,
        idCard: this.schema.idCard,
      })
      .from(this.schema)
      .where(eq(this.schema.idExternal, idExternal))
      .limit(1);

    return transaction;
  }

  async save(transaction: TransactionEntity, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();
    const [entity] = await dbContext
      .insert(this.schema)
      .values({
        idExternal: transaction.idExternal,
        idCard: transaction.idCard,
        idAuthorization: transaction.idAuthorization,
      })
      .returning({ id: this.schema.id });

    return entity;
  }
}
