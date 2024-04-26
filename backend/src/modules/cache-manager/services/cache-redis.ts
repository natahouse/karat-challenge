import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import * as redis from 'redis';

import { CacheService } from './cache-service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheRedisService extends CacheService implements OnModuleInit {
  private readonly logger: Logger = new Logger(CacheRedisService.name);
  private client: ReturnType<typeof this.createClient>;

  constructor(private readonly configService: ConfigService) {
    super();
  }

  async onModuleInit() {
    this.logger.debug('Connecting to redis...');
    this.client = this.createClient();
    await this.client.connect();
    this.logger.debug('Successfully stablished redis connection.');
  }

  private createClient() {
    const host = this.configService.get<string>('REDIS_HOST');
    const port = this.configService.get<string>('REDIS_PORT');

    const client = redis.createClient({ url: `redis://${host}:${port}` });
    client.on('error', function (error) {
      this.logger.error(`Redis client failed: ${error}`);
    });

    return client;
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      this.logger.error(`Failed to get key: ${error.message}`);
      return null;
    }
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    try {
      await this.client.set(key, value);
      if (ttlInSeconds) {
        await this.client.expire(key, ttlInSeconds);
      }
    } catch (error) {
      this.logger.error(`Failed to save key: ${error.message}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      this.client.del(key);
    } catch (error) {
      this.logger.error(`Failed to delete key: ${error.message}`);
    }
  }

  async delByPattern(pattern: string): Promise<void> {
    try {
      for await (const key of this.client.scanIterator({
        TYPE: 'string',
        MATCH: `*${pattern}*`,
        COUNT: 100,
      })) {
        await this.client.del(key);
      }
    } catch (error) {
      this.logger.error(`Failed to delete keys: ${error.message}`);
    }
  }
}
