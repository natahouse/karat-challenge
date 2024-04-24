import {
  Controller,
  Get,
  Post,
  Req,
  RawBodyRequest,
  Headers,
  BadRequestException,
  UnauthorizedException,
  Logger,
  Res,
  RawBody,
  Header,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { StripeService } from '../libs/stripe/services/stripe.service';
import Stripe from 'stripe';

@Controller('stripe-events')
export class StripeEventsController {
  private readonly logger = new Logger(StripeEventsController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) {}

  @Post()
  @Header('Stripe-Version', '2024-04-10')
  @HttpCode(200)
  handleWebhook(
    @RawBody() rawBody: any,
    @Headers('stripe-signature') signature,
  ) {
    let event: Stripe.Event;

    try {
      const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      event = this.stripeService.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        secret,
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    if (!event) throw new BadRequestException('Invalid Event');

    if (event.type === 'issuing_authorization.request') {
    }

    if (event.type === 'issuing_authorization.created') {
      const data = event.data;
    }

    if (event.type === 'issuing_transaction.created') {
      const data = event.data;
    }

    this.logger.debug({
      event,
    });

    return { approved: true };
  }
}
