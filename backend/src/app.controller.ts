import {
  Controller,
  Get,
  Post,
  Req,
  RawBodyRequest,
  UnauthorizedException,
} from '@nestjs/common';

import { StripeService } from './modules/libs/stripe/services/stripe.service';

@Controller()
export class AppController {
  constructor(private readonly stripeService: StripeService) {}

  @Get()
  async test() {
    return this.stripeService.stripe.accounts.list();
  }
}
