import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { payment } from 'src/modules/libs/drizzle/schema';
import { PaymentRepository } from './payment.repository';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

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
}
