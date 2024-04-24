import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repositories/payment.repository';

@Injectable()
export class FetchAllPaymentsService {
  constructor(private readonly repository: PaymentRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
