import { Global, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './stripe.module-definition';
import { StripeService } from './services/stripe.service';

@Global()
@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule extends ConfigurableModuleClass {}
