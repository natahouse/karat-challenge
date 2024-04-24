import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { Client } from 'pg';

import * as dotenv from 'dotenv';
dotenv.config();

const connection = new Client({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_HOST),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

connection.connect().then(() => {
  migrate(drizzle(connection), {
    migrationsFolder: process.env.MIGRATIONS_DIR,
  })
    .then(() => console.log('Migrations executed'))
    .catch((err) => console.error(err))
    .finally(() => {
      connection.end();
    });
});
