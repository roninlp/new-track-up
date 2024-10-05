import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  habits: many(habits),
}));

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: int("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// habits table and relations
export const habits = sqliteTable("habit", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  frequencyDays: int("frequency_days").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const habitsRelations = relations(habits, ({ one, many }) => ({
  user: one(users, {
    fields: [habits.userId],
    references: [users.id],
  }),
  habitRecords: many(habitLogs),
}));

export type HabitType = typeof habits.$inferSelect;
export type InsertHabit = typeof habits.$inferInsert;

// habit logs table and relations
export const habitLogs = sqliteTable("habit_log", {
  id: int("id").primaryKey({ autoIncrement: true }),
  habitId: int("habit_id")
    .notNull()
    .references(() => habits.id),
  logDate: int("log_date", { mode: "timestamp" }).notNull(),
  status: int("status", { mode: "boolean" }).notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const habitLogsRelations = relations(habitLogs, ({ one }) => ({
  habits: one(habits, {
    fields: [habitLogs.habitId],
    references: [habits.id],
  }),
}));

export type HabitRecordType = typeof habitLogs.$inferSelect;
export type InsertHabitRecord = typeof habitLogs.$inferInsert;
