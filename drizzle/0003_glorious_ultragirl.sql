CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkUserId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"role" varchar NOT NULL,
	"createdAt" varchar,
	CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "userAnswer" ALTER COLUMN "userEmail" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "alumni_post" ADD COLUMN "alumniId" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "alumni_post" ADD COLUMN "role" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "userName" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "userAnswer" ADD COLUMN "userId" varchar NOT NULL;