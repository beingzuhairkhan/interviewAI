import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerkUserId").notNull().unique(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  role: varchar("role").notNull(),
  createdAt: varchar("createdAt"),
});

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
  userEmail: varchar("userEmail").notNull(),
  userName: varchar("userName").notNull(),
  userId: varchar("userId").notNull(), 
  createdAt: varchar("createdAt"),
});

export const AlumniPost = pgTable("alumni_post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  company: varchar("company"),
  location: varchar("location"),
  jobLink: varchar("jobLink"),
  alumniName: varchar("alumniName").notNull(),
  alumniEmail: varchar("alumniEmail").notNull(),
  alumniId: varchar("alumniId").notNull(), 
  role: varchar("role").notNull(),
  createdAt: varchar("createdAt"),
});
