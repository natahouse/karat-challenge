DO $$ BEGIN
 CREATE TYPE "paymentStatusEnum" AS ENUM('pending', 'approved', 'declined');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "id_transaction" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "business_name" text;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "paymentStatus" "paymentStatusEnum" DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "category" text NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN IF EXISTS "status";