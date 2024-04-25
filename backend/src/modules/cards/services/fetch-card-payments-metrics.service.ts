import { Injectable, NotFoundException } from '@nestjs/common';

import { CardRepository } from 'src/modules/cards/repositories';
import { PaymentRepository } from 'src/modules/payments/repositories';

@Injectable()
export class FetchCardPaymentsMetricsService {
  constructor(
    private readonly repository: CardRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(idCard: string) {
    const card = await this.repository.findOne(idCard);

    if (!card)
      throw new NotFoundException({
        error: 'CardNotFound',
        message: `Card with ID "${idCard}" not found.`,
      });

    return await this.paymentRepository.getMetricsByCard(idCard);
  }
}
