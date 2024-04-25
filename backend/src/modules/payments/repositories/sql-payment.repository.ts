import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { payment } from 'src/modules/libs/drizzle/schema';
import { PaymentRepository } from './payment.repository';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

import { eq } from 'drizzle-orm';

@Injectable()
export class SqlPaymentRepository implements PaymentRepository {
  private schema = payment;

  constructor(private readonly drizzleService: DrizzleService) {}

  async save(payment: PaymentEntity, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();
    await dbContext.insert(this.schema).values({
      status: payment.status,
      amount: payment.amount,
      category: payment.category,
      businessName: payment.businessName,
      idCard: payment.idCard,
      idAuthorization: payment.idAuthorization,
      idTransaction: payment.idTransaction,
    });
  }

  async findOne(id: string) {
    const db = this.drizzleService.getDb();

    const [payment] = await db
      .select({
        id: this.schema.id,
        idAuthorization: this.schema.idTransaction,
        idTransaction: this.schema.idTransaction,
        idCard: this.schema.idCard,
        businessName: this.schema.businessName,
        category: this.schema.category,
        amount: this.schema.amount,
        createdAt: this.schema.createdAt,
        status: this.schema.status,
      })
      .from(this.schema)
      .where(eq(this.schema.id, id))
      .limit(1);

    return payment;
  }

  async findOneByAuthorization(idAuthorization: string) {
    const db = this.drizzleService.getDb();

    const [payment] = await db
      .select({
        id: this.schema.id,
        idAuthorization: this.schema.idTransaction,
        idTransaction: this.schema.idTransaction,
        idCard: this.schema.idCard,
        businessName: this.schema.businessName,
        category: this.schema.category,
        amount: this.schema.amount,
        createdAt: this.schema.createdAt,
        status: this.schema.status,
      })
      .from(this.schema)
      .where(eq(this.schema.idAuthorization, idAuthorization))

      .limit(1);

    return payment;
  }

  async update(id: string, fields: Partial<PaymentEntity>, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();

    const fieldsToUpdate: Partial<PaymentEntity> = {};

    if (fields.idAuthorization) {
      fieldsToUpdate.idAuthorization = fields.idAuthorization;
    }

    if (fields.idTransaction) {
      fieldsToUpdate.idTransaction = fields.idTransaction;
    }

    if (fields.status) {
      fieldsToUpdate.status = fields.status;
    }

    await dbContext
      .update(this.schema)
      .set(fieldsToUpdate)
      .where(eq(this.schema.id, id));
  }
}
