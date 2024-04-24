import { Controller, Get, Logger } from '@nestjs/common';

import { FetchAllPaymentsService } from './services/fetch-all-payments.service';

@Controller('payments')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(
    private readonly fetchAllPaymentsService: FetchAllPaymentsService,
  ) {}

  @Get()
  async findAll() {
    return await this.fetchAllPaymentsService.execute();
  }
}
