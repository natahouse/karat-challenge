import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { payment } from 'src/modules/libs/drizzle/schema';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class SqlPaymentRepository implements PaymentRepository {
  private schema = payment;

  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDb();

    return await db.select({ id: this.schema.id }).from(this.schema);
  }
}
