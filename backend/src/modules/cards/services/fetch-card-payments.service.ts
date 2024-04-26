import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CardRepository } from 'src/modules/cards/repositories';
import { PaymentRepository } from 'src/modules/payments/repositories';

@Injectable()
export class FetchCardPaymentsService {
  constructor(
    private readonly repository: CardRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(idCard: string, filters: { page: number; createdAt: Date }) {
    if (!idCard)
      throw new BadRequestException({
        error: 'MissingCardId',
        message: 'Card ID is required',
      });

    const card = await this.repository.findOne(idCard);

    if (!card)
      throw new NotFoundException({
        error: 'CardNotFound',
        message: `Card with ID "${idCard}" not found.`,
      });

    const limit = 6;
    const offset = limit * (filters.page - 1);
    const createdAt = filters.createdAt;

    const result = await this.paymentRepository.findByCard(idCard, {
      limit,
      offset,
      createdAt,
    });

    return {
      payments: result.entities,
      total: result.total,
    };
  }
}
