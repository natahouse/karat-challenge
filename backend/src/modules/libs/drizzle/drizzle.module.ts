import { Global, Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './drizzle.module-definition';
import { DrizzleService } from './services/drizzle.service';

@Global()
@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DrizzleModule extends ConfigurableModuleClass {}
