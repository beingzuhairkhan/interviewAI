CREATE TABLE "alumni_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"company" varchar,
	"location" varchar,
	"jobLink" varchar,
	"createdAt" varchar
);
