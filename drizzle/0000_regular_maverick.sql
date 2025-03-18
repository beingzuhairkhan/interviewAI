CREATE TABLE "interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResponse" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDescription" varchar NOT NULL,
	"jobExp" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar,
	"mockId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockIdRef" varchar NOT NULL,
	"question" text NOT NULL,
	"correctAns" text,
	"userAns" text,
	"feedback" text,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar
);
