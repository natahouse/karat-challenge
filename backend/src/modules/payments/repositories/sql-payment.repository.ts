import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { payment } from 'src/modules/libs/drizzle/schema';
import { PaymentRepository } from './payment.repository';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

import { and, countDistinct, desc, eq, lte, ne, sql } from 'drizzle-orm';
import { BaseFilters } from 'src/database/types';

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

  async findByCard(idCard: string, filters?: BaseFilters) {
    const db = this.drizzleService.getDb();

    const queryFilters = [
      eq(this.schema.idCard, idCard),
      filters.createdAt
        ? lte(this.schema.createdAt, filters.createdAt)
        : undefined,
      ne(this.schema.status, 'pending'),
    ];

    const [{ total }] = await db
      .select({ total: countDistinct(this.schema.id) })
      .from(this.schema)
      .where(and(...queryFilters));

    if (total === 0)
      return {
        total: 0,
        entities: [],
      };

    const entities = await db
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
      .where(and(...queryFilters))
      .limit(filters.limit ?? 10)
      .offset(filters.offset ?? 0)
      .orderBy(desc(this.schema.createdAt));

    return {
      entities,
      total,
    };
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

  async getCategoryMetricsByCard(idCard: string) {
    const db = this.drizzleService.getDb();

    const result = await db
      .select({
        category: this.schema.category,
        total: countDistinct(this.schema.id),
      })
      .from(this.schema)
      .where(
        and(eq(this.schema.idCard, idCard), eq(this.schema.status, 'approved')),
      )
      .groupBy(this.schema.category);

    return result;
  }

  async getMetricsByCard(idCard: string) {
    const db = this.drizzleService.getDb();

    const [result] = await db
      .select({
        total: countDistinct(this.schema.id),
        amount: sql`sum(${this.schema.amount})`.mapWith(Number),
      })
      .from(this.schema)
      .where(
        and(eq(this.schema.idCard, idCard), eq(this.schema.status, 'approved')),
      );

    return result;
  }
}
