import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class PaymentRepository {
  abstract save(payment: PaymentEntity, tx?: Transaction): Promise<void>;

  abstract findOne(id: string): Promise<PaymentEntity>;

  abstract findOneByAuthorization(
    idAuthorization: string,
  ): Promise<PaymentEntity>;

  abstract update(
    id: string,
    fields: Partial<PaymentEntity>,
    tx?: Transaction,
  ): Promise<void>;
}
