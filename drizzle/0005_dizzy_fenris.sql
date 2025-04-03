ALTER TABLE "rankings" DROP CONSTRAINT "rankings_clerkUserId_unique";--> statement-breakpoint
ALTER TABLE "Submissions" DROP CONSTRAINT "Submissions_clerkUserId_unique";--> statement-breakpoint
ALTER TABLE "alumni_post" ADD COLUMN "imageURL" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ADD COLUMN "userName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "rankings" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Submissions" ADD COLUMN "userName" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Submissions" ADD COLUMN "email" text NOT NULL;