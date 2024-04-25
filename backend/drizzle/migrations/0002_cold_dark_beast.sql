ALTER TABLE "transactions" RENAME COLUMN "name" TO "id_external";--> statement-breakpoint
DROP INDEX IF EXISTS "transactions_id_external_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_id_external_idx" ON "transactions" ("id_external");