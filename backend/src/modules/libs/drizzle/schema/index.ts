import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  uuid,
  varchar,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { baseColumns } from '../utils';

export const card = pgTable(
  'cards',
  {
    ...baseColumns,
    idExternal: text('id_external').notNull().unique(),
  },
  (table) => {
    return {
      idExternalIdx: index('cards_id_external_idx').on(table.idExternal),
    };
  },
);

export const authorization = pgTable(
  'authorizations',
  {
    ...baseColumns,
    idExternal: text('id_external').notNull().unique(),
    idCard: uuid('id_card')
      .references(() => card.id)
      .notNull(),
    approved: boolean('approved').notNull().default(false),
  },
  (table) => {
    return {
      idExternalIdx: index('authorizations_id_external_idx').on(
        table.idExternal,
      ),
    };
  },
);

export const transaction = pgTable(
  'transactions',
  {
    ...baseColumns,
    idExternal: varchar('id_external', { length: 256 }),
    idAuthorization: uuid('id_authorization')
      .references(() => authorization.id)
      .notNull(),
    idCard: uuid('id_card')
      .references(() => card.id)
      .notNull(),
  },
  (table) => {
    return {
      idExternalIdx: index('transactions_id_external_idx').on(table.idExternal),
    };
  },
);

const paymentStatus = ['pending', 'approved', 'declined'] as const;
export type PaymentStatus = (typeof paymentStatus)[number];
export const paymentStatusEnum = pgEnum('paymentStatusEnum', paymentStatus);

export const payment = pgTable(
  'payments',
  {
    ...baseColumns,
    idCard: uuid('id_card')
      .references(() => card.id)
      .notNull(),
    idAuthorization: uuid('id_authorization')
      .references(() => authorization.id)
      .notNull(),
    idTransaction: uuid('id_transaction').references(() => transaction.id),
    businessName: text('business_name'),
    status: paymentStatusEnum('paymentStatus').default('pending').notNull(),
    category: text('category').notNull(),
    amount: integer('amount'),
  },
  (table) => {
    return {
      idAuthorizationIdx: index('payments_id_authorization_idx').on(
        table.idAuthorization,
      ),
    };
  },
);
