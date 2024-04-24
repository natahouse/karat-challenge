import { ExtractTablesWithRelations } from 'drizzle-orm';
import {
  NodePgQueryResultHKT,
  NodePgTransaction,
} from 'drizzle-orm/node-postgres';
import { PgTransaction } from 'drizzle-orm/pg-core';

export * as schema from '../schema';

export type DrizzleModuleOptions = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  sync: boolean;
};

export type Transaction = PgTransaction<
  NodePgQueryResultHKT,
  any,
  ExtractTablesWithRelations<any>
>;
