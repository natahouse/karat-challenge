import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { baseColumns } from '../utils';

export const card = pgTable('cards', {
  ...baseColumns,
  idExternal: text('id_external').notNull().unique(),
});

export const authorization = pgTable('authorizations', {
  ...baseColumns,
  idExternal: text('id_external').notNull().unique(),
  idCard: uuid('id_card')
    .references(() => card.id)
    .notNull(),
  status: text('status').notNull(),
});

export const transaction = pgTable('transactions', {
  ...baseColumns,
  idExternal: varchar('name', { length: 256 }),
  idAuthorization: uuid('id_authorization')
    .references(() => authorization.id)
    .notNull(),
  idCard: uuid('id_card')
    .references(() => card.id)
    .notNull(),
});

export const payment = pgTable('payments', {
  ...baseColumns,
  idExternal: text('id_external').notNull().unique(),
  idCard: uuid('id_card')
    .references(() => card.id)
    .notNull(),
  idAuthorization: uuid('id_authorization')
    .references(() => authorization.id)
    .notNull(),
  idTransaction: uuid('id_transaction')
    .references(() => transaction.id)
    .notNull(),
  status: text('status').notNull(),
  category: text('status').notNull(),
  amount: integer('amount'),
});
