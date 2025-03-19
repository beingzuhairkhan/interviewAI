import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview = pgTable("interview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExp: varchar("jobExp").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockIdRef").notNull(),
  question: text("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const AlumniPost = pgTable("alumni_post", {
  id: serial("id").primaryKey(),                  
  title: text("title").notNull(),                  // Post title (e.g., "Hiring Software Engineers")
  content: text("content").notNull(),              // Detailed job post or career advice
  company: varchar("company"),                     // Company name (if applicable)
  location: varchar("location"),                   // Job location (optional)
  jobLink: varchar("jobLink"),                     // Application link (if job-related)
  alumniName: varchar("alumniName").notNull(),     // Alumni name
  alumniEmail: varchar("alumniEmail").notNull(),   // Alumni email
  createdAt: varchar("createdAt"),
});
