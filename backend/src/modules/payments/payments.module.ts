import { Module } from '@nestjs/common';

import { PaymentRepository, SqlPaymentRepository } from './repositories';

@Module({
  controllers: [],
  providers: [{ provide: PaymentRepository, useClass: SqlPaymentRepository }],
  exports: [{ provide: PaymentRepository, useClass: SqlPaymentRepository }],
})
export class PaymentsModule {}
