import { Module } from '@nestjs/common';
import { StripeEventsService } from './stripe-events.service';
import { StripeEventsController } from './stripe-events.controller';

@Module({
  controllers: [StripeEventsController],
  providers: [StripeEventsService],
})
export class StripeEventsModule {}
