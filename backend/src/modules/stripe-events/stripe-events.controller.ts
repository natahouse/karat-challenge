import {
  Controller,
  Post,
  Headers,
  BadRequestException,
  UnauthorizedException,
  Logger,
  RawBody,
  Header,
  HttpCode,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { StripeService } from '../libs/stripe/services/stripe.service';
import Stripe from 'stripe';
import { CreateAuthorizationFromEventService } from '../authorizations/services';
import { CreateTransactionFromEventService } from '../transactions/services';

@Controller('stripe-events')
export class StripeEventsController {
  private readonly logger = new Logger(StripeEventsController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
    private readonly createAuthorizationFromEventService: CreateAuthorizationFromEventService,
    private readonly createTransactionFromEventService: CreateTransactionFromEventService,
  ) {}

  @Post()
  @Header('Stripe-Version', '2024-04-10')
  @HttpCode(200)
  async handleWebhook(
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

    this.logger.debug({
      event,
    });

    if (event.type === 'issuing_authorization.request') {
      return { approved: true };
    }

    if (event.type === 'issuing_authorization.created') {
      await this.createAuthorizationFromEventService.execute(event.data.object);
      return { approved: true };
    }

    if (event.type === 'issuing_transaction.created') {
      await this.createTransactionFromEventService.execute(event.data.object);
      return { approved: true };
    }
  }
}
