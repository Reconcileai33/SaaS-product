import { pgTable, text, serial, integer, boolean, timestamp, numeric, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  role: true,
});

// Transactions
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  description: text("description").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").default("USD"),
  status: text("status").default("pending"),
  gateway: text("gateway"),
  externalId: text("external_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  userId: true,
  description: true,
  amount: true,
  currency: true,
  status: true,
  gateway: true,
  externalId: true,
});

// Integrations
export const integrations = pgTable("integrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  apiKey: text("api_key"),
  apiSecret: text("api_secret"),
  isEnabled: boolean("is_enabled").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertIntegrationSchema = createInsertSchema(integrations).pick({
  userId: true,
  name: true,
  provider: true,
  apiKey: true,
  apiSecret: true,
  isEnabled: true,
});

// Reconciliation Rules
export const reconciliationRules = pgTable("reconciliation_rules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  condition: text("condition").notNull(),
  action: text("action").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertReconciliationRuleSchema = createInsertSchema(reconciliationRules).pick({
  userId: true,
  name: true,
  description: true,
  condition: true,
  action: true,
  isActive: true,
});

// Reconciliation Jobs
export const reconciliationJobs = pgTable("reconciliation_jobs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  schedule: text("schedule"),
  lastRun: timestamp("last_run"),
  nextRun: timestamp("next_run"),
  status: text("status").default("idle"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertReconciliationJobSchema = createInsertSchema(reconciliationJobs).pick({
  userId: true,
  name: true,
  schedule: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;

export type ReconciliationRule = typeof reconciliationRules.$inferSelect;
export type InsertReconciliationRule = z.infer<typeof insertReconciliationRuleSchema>;

export type ReconciliationJob = typeof reconciliationJobs.$inferSelect;
export type InsertReconciliationJob = z.infer<typeof insertReconciliationJobSchema>;
