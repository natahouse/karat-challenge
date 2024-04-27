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
import { InjectQueue } from '@nestjs/bull';
import { queueNames } from 'src/constants/queues';
import { Queue } from 'bull';
import { AuthorizationEventEntity } from '../authorizations/entities';
import { TransactionEventEntity } from '../transactions/entities';

@Controller('stripe-events')
export class StripeEventsController {
  private readonly logger = new Logger(StripeEventsController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
    @InjectQueue(queueNames.AUTHORIZATION_QUEUE_NAME)
    private authorizationQueue: Queue<AuthorizationEventEntity>,
    @InjectQueue(queueNames.TRANSACTION_QUEUE_NAME)
    private transactionQueue: Queue<TransactionEventEntity>,
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
      await this.authorizationQueue.add(event.data.object);
    }

    if (event.type === 'issuing_transaction.created') {
      await this.transactionQueue.add(event.data.object);
    }
  }
}
