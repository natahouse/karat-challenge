import { Controller, Get, Post, Req, RawBodyRequest, UnauthorizedException } from '@nestjs/common';
import { StripeEventsService } from './stripe-events.service';

import stripe from 'stripe';
import { ConfigService } from '@nestjs/config';


@Controller('stripe-events')
export class StripeEventsController {
  constructor(private readonly service: StripeEventsService, private readonly configService: ConfigService) {}

  @Get()
  async test() {
    return this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
  }

  @Post()
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    try {
      const signature = req.headers['stripe-signature'];
      const secret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
      const event = stripe.webhooks.constructEvent(req.rawBody, signature, secret);

   
    } catch (err) {
      throw new UnauthorizedException('Invalid webhook signature')
    }

  }
}
