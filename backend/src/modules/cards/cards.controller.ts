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
  FetchCardByExternalIdService,
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
    private readonly fetchCardByExternalIdService: FetchCardByExternalIdService,
    private readonly fetchCardPaymentsMetricsService: FetchCardPaymentsMetricsService,
    private readonly fetchCardPaymentsCategoriesService: FetchCardPaymentsCategoriesService,
  ) {}

  @Post()
  async createCard(@Body() body) {
    return await this.createCardService.execute(body.idExternal);
  }

  @Get('external/:idExternal')
  async fetchCardByExternalId(@Param('idExternal') id) {
    return await this.fetchCardByExternalIdService.execute(id);
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
    @Query('page') queryPage,
    @Query('createdAt') queryCreatedAt,
  ) {
    const page =
      queryPage && !isNaN(parseInt(queryPage)) ? parseInt(queryPage) : 1;

    const createdAt = isDate(queryCreatedAt)
      ? new Date(queryCreatedAt)
      : undefined;

    return await this.fetchCardPaymentsService.execute(id, {
      page,
      createdAt,
    });
  }
}
