import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../entities/payment.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class PaymentRepository {
  abstract save(payment: PaymentEntity, tx?: Transaction): Promise<void>;
}
