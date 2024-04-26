import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import { MODULE_OPTIONS_TOKEN } from '../drizzle.module-definition';
import { DrizzleModuleOptions } from '../types';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../schema';

@Injectable()
export class DrizzleService implements OnModuleInit {
  private drizzle: NodePgDatabase<Record<string, unknown>>;
  private logger = new Logger('DrizzleService');
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: DrizzleModuleOptions,
  ) {}

  async migrate() {
    const connection = new Client({
      host: this.options.host,
      port: this.options.port,
      user: this.options.user,
      password: this.options.password,
      database: this.options.database,
    });

    connection.connect().then(() => {
      migrate(drizzle(connection), { migrationsFolder: './drizzle/migrations' })
        .then(() => this.logger.debug('Migrations executed with success 🎉🎉'))
        .catch((err) => console.error(err))
        .finally(() => {
          connection.end();
        });
    });
  }

  getDb() {
    if (!this.drizzle) {
      const pool = new Pool({
        host: this.options.host,
        port: this.options.port,
        user: this.options.user,
        password: this.options.password,
        database: this.options.database,
      });

      this.drizzle = drizzle(pool, { schema, logger: true });
    }

    return this.drizzle;
  }

  async onModuleInit() {
    if (this.options.sync) {
      this.logger.debug('Checking for migrations...');
      await this.migrate();
    }
  }
}
