import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CacheService } from 'src/modules/cache-manager/services';

import { CardRepository } from 'src/modules/cards/repositories';
import { PaymentRepository } from 'src/modules/payments/repositories';

@Injectable()
export class FetchCardPaymentsMetricsService {
  private logger = new Logger(FetchCardPaymentsMetricsService.name);
  constructor(
    private readonly repository: CardRepository,
    private readonly paymentRepository: PaymentRepository,
    private readonly cacheManager: CacheService,
  ) {}

  async execute(idCard: string) {
    if (!idCard)
      throw new BadRequestException({
        error: 'MissingCardId',
        message: 'Card ID is required',
      });

    const cached = await this.cacheManager.get(`CARD:${idCard}:METRICS`);
    if (cached) {
      this.logger.debug('Cache hit');
      return JSON.parse(cached);
    }

    const card = await this.repository.findOne(idCard);

    if (!card)
      throw new NotFoundException({
        error: 'CardNotFound',
        message: `Card with ID "${idCard}" not found.`,
      });

    const result = await this.paymentRepository.getMetricsByCard(idCard);

    const metrics = {
      amount: result.amount / 100,
      total: result.total,
    };

    this.cacheManager.set(
      `CARD:${idCard}:METRICS`,
      JSON.stringify(metrics),
      5 * 60 * 1000,
    );

    return metrics;
  }
}
