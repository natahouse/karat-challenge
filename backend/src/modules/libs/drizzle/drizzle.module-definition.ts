import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DrizzleModuleOptions } from './types';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DrizzleModuleOptions>()
    .setClassMethodName('forRoot')
    .build();
