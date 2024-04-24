import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/modules/libs/drizzle/schema/*',
  out: process.env.MIGRATIONS_DIR,
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
} satisfies Config;
