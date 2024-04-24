import { Module } from '@nestjs/common';
import { PaymentRepository } from './repositories/payment.repository';
import { SqlPaymentRepository } from './repositories/sql-payment.repository';
import { FetchAllPaymentsService } from './services/fetch-all-payments.service';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [PaymentController],
  providers: [
    { provide: PaymentRepository, useClass: SqlPaymentRepository },
    FetchAllPaymentsService,
  ],
})
export class PaymentsModule {}
