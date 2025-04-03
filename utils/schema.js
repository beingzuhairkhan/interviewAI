import { pgTable, serial, text, varchar , integer } from "drizzle-orm/pg-core";

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
  imageURL:text("imageURL").notNull(),
  company: varchar("company"),
  location: varchar("location"),
  jobLink: varchar("jobLink"),
  alumniName: varchar("alumniName").notNull(),
  alumniEmail: varchar("alumniEmail").notNull(),
  alumniId: varchar("alumniId").notNull(), 
  role: varchar("role").notNull(),
  createdAt: varchar("createdAt"),
});

export const test = pgTable("tests" , {
  id: serial("id").primaryKey(),
  weekNumber: integer("week_number").unique().notNull(),
  topic:text("topic").notNull(),
  questions: text("questions").notNull(),
  createdAt: varchar("createdAt"),

})

export const submission = pgTable("Submissions" , {
  id:serial("id").primaryKey(),
  clerkUserId: varchar("clerkUserId").notNull(),
  userName:text("userName").notNull(),
  email:text("email").notNull(),
  testId: varchar("testid").notNull(),
  score:integer("score").notNull(),
  createdAt: varchar("createdAt"),
 
})

export const ranking = pgTable("rankings",{
  id:serial("id").primaryKey(),
  userName:text("userName").notNull(),
  email:text("email").notNull(),
  clerkUserId: varchar("clerkUserId").notNull(),
  totalScore: integer("total_score").default(0),
  createdAt: varchar("createdAt"),
})