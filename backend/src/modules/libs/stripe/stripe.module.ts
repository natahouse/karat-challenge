import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './stripe.module-definition';
import { StripeService } from './services/stripe.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [StripeService],
  exports: [StripeService],
  imports: [ConfigModule],
})
export class StripeModule extends ConfigurableModuleClass {}
