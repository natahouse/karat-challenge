import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';
import { BaseFilters, BaseReturn } from 'src/database/types';

@Injectable()
export abstract class PaymentRepository {
  abstract save(payment: PaymentEntity, tx?: Transaction): Promise<void>;

  abstract findOne(id: string): Promise<PaymentEntity>;

  abstract findOneByAuthorization(
    idAuthorization: string,
  ): Promise<PaymentEntity>;

  abstract findByCard(
    idCard: string,
    filters?: BaseFilters,
  ): Promise<BaseReturn<PaymentEntity>>;

  abstract getMetricsByCard(
    idCard: string,
  ): Promise<{ amount: number; total: number }>;

  abstract getCategoryMetricsByCard(
    idCard: string,
  ): Promise<{ category: string; total: number }[]>;

  abstract update(
    id: string,
    fields: Partial<PaymentEntity>,
    tx?: Transaction,
  ): Promise<void>;
}
