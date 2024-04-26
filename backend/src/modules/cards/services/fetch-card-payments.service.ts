import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CardRepository } from 'src/modules/cards/repositories';
import { BaseFilters } from 'src/database/types';
import { PaymentRepository } from 'src/modules/payments/repositories';

@Injectable()
export class FetchCardPaymentsService {
  constructor(
    private readonly repository: CardRepository,
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(idCard: string, filters: BaseFilters) {
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

    return await this.paymentRepository.findByCard(idCard, filters);
  }
}
