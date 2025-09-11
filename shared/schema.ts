import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for potential future authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Course schema
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  institution: text("institution").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  level: text("level").notNull(), // 'undergraduate' | 'postgraduate'
  studyArea: text("study_area").notNull(),
  intakeDate: text("intake_date").notNull(),
  applicationDeadline: text("application_deadline").notNull(),
  tuitionCost: text("tuition_cost").notNull(),
  requirements: jsonb("requirements"), // Store qualification requirements as JSON
  description: text("description"),
});

// User qualification submission
export const qualificationSubmissions = pgTable("qualification_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studyLevel: text("study_level").notNull(),
  country: text("country").notNull(),
  qualifications: jsonb("qualifications").notNull(), // Store all qualifications as JSON
  additionalInfo: jsonb("additional_info"), // Store degree, experience, etc.
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertQualificationSubmissionSchema = createInsertSchema(qualificationSubmissions).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type QualificationSubmission = typeof qualificationSubmissions.$inferSelect;
export type InsertQualificationSubmission = z.infer<typeof insertQualificationSubmissionSchema>;

// Frontend types for form handling
export const gradeOptions = ['A', 'B', 'C', 'D', 'E'] as const;
export type Grade = typeof gradeOptions[number];

export const studyLevelOptions = ['undergraduate', 'postgraduate'] as const;
export type StudyLevel = typeof studyLevelOptions[number];

export interface SubjectGrade {
  subject: string;
  grade: Grade;
}

export interface QualificationFormData {
  studyLevel: StudyLevel;
  country: string;
  qualifications: SubjectGrade[];
  // Undergraduate specific
  undergradDegree?: string;
  undergradGrade?: string;
  // Postgraduate specific
  workExperience?: string;
  researchInterest?: string;
}