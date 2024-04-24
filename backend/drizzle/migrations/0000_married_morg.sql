CREATE TABLE IF NOT EXISTS "authorizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id_external" text NOT NULL,
	"id_card" uuid NOT NULL,
	"status" text NOT NULL,
	CONSTRAINT "authorizations_id_external_unique" UNIQUE("id_external")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id_external" text NOT NULL,
	CONSTRAINT "cards_id_external_unique" UNIQUE("id_external")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id_external" text NOT NULL,
	"id_card" uuid NOT NULL,
	"id_authorization" uuid NOT NULL,
	"id_transaction" uuid NOT NULL,
	"status" text NOT NULL,
	"amount" integer,
	CONSTRAINT "payments_id_external_unique" UNIQUE("id_external")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar(256),
	"id_authorization" uuid NOT NULL,
	"id_card" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authorizations" ADD CONSTRAINT "authorizations_id_card_cards_id_fk" FOREIGN KEY ("id_card") REFERENCES "cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_id_card_cards_id_fk" FOREIGN KEY ("id_card") REFERENCES "cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_id_authorization_authorizations_id_fk" FOREIGN KEY ("id_authorization") REFERENCES "authorizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_id_transaction_transactions_id_fk" FOREIGN KEY ("id_transaction") REFERENCES "transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_authorization_authorizations_id_fk" FOREIGN KEY ("id_authorization") REFERENCES "authorizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_id_card_cards_id_fk" FOREIGN KEY ("id_card") REFERENCES "cards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
