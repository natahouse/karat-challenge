import { Module } from '@nestjs/common';

import { CacheService, CacheRedisService } from './services';

@Module({
  controllers: [],
  providers: [{ provide: CacheService, useClass: CacheRedisService }],
  exports: [CacheService],
})
export class CacheManagerModule {}
