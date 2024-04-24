import { Module } from '@nestjs/common';
import { FetchAllPaymentsService } from './services';
import { PaymentController } from './payment.controller';
import { PaymentRepository, SqlPaymentRepository } from './repositories';

@Module({
  controllers: [PaymentController],
  providers: [
    { provide: PaymentRepository, useClass: SqlPaymentRepository },
    FetchAllPaymentsService,
  ],
})
export class PaymentsModule {}
