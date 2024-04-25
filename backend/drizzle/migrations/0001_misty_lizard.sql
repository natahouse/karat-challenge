ALTER TABLE "payments" DROP CONSTRAINT "payments_id_external_unique";--> statement-breakpoint
ALTER TABLE "authorizations" ADD COLUMN "approved" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "authorizations_id_external_idx" ON "authorizations" ("id_external");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cards_id_external_idx" ON "cards" ("id_external");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_id_external_idx" ON "transactions" ("name");--> statement-breakpoint
ALTER TABLE "authorizations" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "id_external";