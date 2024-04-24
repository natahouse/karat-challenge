import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const id = uuid('id').defaultRandom().primaryKey();

export const baseColumns = {
  id,
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};
