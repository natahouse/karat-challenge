import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCardService } from './services/create-card.service';
import {
  FetchCardPaymentsCategoriesService,
  FetchCardPaymentsMetricsService,
  FetchCardPaymentsService,
} from './services';
import { isDate } from 'src/services/date/is-date';

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name);

  constructor(
    private readonly createCardService: CreateCardService,
    private readonly fetchCardPaymentsService: FetchCardPaymentsService,
    private readonly fetchCardPaymentsMetricsService: FetchCardPaymentsMetricsService,
    private readonly fetchCardPaymentsCategoriesService: FetchCardPaymentsCategoriesService,
  ) {}

  @Post()
  async createCard(@Body() body) {
    return await this.createCardService.execute(body.idExternal);
  }

  @Get(':id/metrics')
  async fetchMetrics(@Param('id') id) {
    return await this.fetchCardPaymentsMetricsService.execute(id);
  }

  @Get(':id/metrics/categories')
  async fetchCategoriesMetrics(@Param('id') id) {
    return await this.fetchCardPaymentsCategoriesService.execute(id);
  }

  @Get(':id/payments')
  async fetchPayments(
    @Param('id') id,
    @Query('limit') queryLimit,
    @Query('offset') queryOffset,
    @Query('createdAt') queryCreatedAt,
  ) {
    const limit =
      queryLimit && !isNaN(parseInt(queryLimit))
        ? parseInt(queryLimit)
        : undefined;

    const offset =
      queryLimit && !isNaN(parseInt(queryOffset))
        ? parseInt(queryOffset)
        : undefined;

    const createdAt = isDate(queryCreatedAt)
      ? new Date(queryCreatedAt)
      : undefined;

    return await this.fetchCardPaymentsService.execute(id, {
      limit,
      offset,
      createdAt,
    });
  }
}
