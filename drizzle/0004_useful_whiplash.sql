CREATE TABLE "rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkUserId" varchar NOT NULL,
	"total_score" integer DEFAULT 0,
	"createdAt" varchar,
	CONSTRAINT "rankings_clerkUserId_unique" UNIQUE("clerkUserId")
);
--> statement-breakpoint
CREATE TABLE "Submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerkUserId" varchar NOT NULL,
	"testid" varchar NOT NULL,
	"score" integer NOT NULL,
	"createdAt" varchar,
	CONSTRAINT "Submissions_clerkUserId_unique" UNIQUE("clerkUserId")
);
--> statement-breakpoint
CREATE TABLE "tests" (
	"id" serial PRIMARY KEY NOT NULL,
	"week_number" integer NOT NULL,
	"topic" text NOT NULL,
	"questions" text NOT NULL,
	"createdAt" varchar,
	CONSTRAINT "tests_week_number_unique" UNIQUE("week_number")
);
