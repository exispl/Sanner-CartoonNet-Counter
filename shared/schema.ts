import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const machines = pgTable("machines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  defaultLimit: integer("default_limit").notNull().default(1000),
  defaultCycleTime: real("default_cycle_time").notNull().default(4.0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const machineConfigurations = pgTable("machine_configurations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  machineId: varchar("machine_id").notNull().references(() => machines.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  limit: integer("limit").notNull(),
  cycleTime: real("cycle_time").notNull(),
  isDefault: boolean("is_default").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productionSessions = pgTable("production_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  machineId: varchar("machine_id").notNull().references(() => machines.id, { onDelete: "cascade" }),
  configurationId: varchar("configuration_id").references(() => machineConfigurations.id),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  totalBoxes: integer("total_boxes").notNull().default(0),
  totalItems: integer("total_items").notNull().default(0),
  efficiency: real("efficiency"),
  status: text("status").notNull().default("active"), // active, paused, completed
  settings: jsonb("settings"), // Store cycle settings snapshot
});

export const boxProduction = pgTable("box_production", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => productionSessions.id, { onDelete: "cascade" }),
  boxNumber: integer("box_number").notNull(),
  itemsCount: integer("items_count").notNull(),
  startTime: timestamp("start_time").notNull(),
  completedTime: timestamp("completed_time"),
  targetLimit: integer("target_limit").notNull(),
});

// Relations
export const machinesRelations = relations(machines, ({ many }) => ({
  configurations: many(machineConfigurations),
  sessions: many(productionSessions),
}));

export const machineConfigurationsRelations = relations(machineConfigurations, ({ one, many }) => ({
  machine: one(machines, {
    fields: [machineConfigurations.machineId],
    references: [machines.id],
  }),
  sessions: many(productionSessions),
}));

export const productionSessionsRelations = relations(productionSessions, ({ one, many }) => ({
  machine: one(machines, {
    fields: [productionSessions.machineId],
    references: [machines.id],
  }),
  configuration: one(machineConfigurations, {
    fields: [productionSessions.configurationId],
    references: [machineConfigurations.id],
  }),
  boxes: many(boxProduction),
}));

export const boxProductionRelations = relations(boxProduction, ({ one }) => ({
  session: one(productionSessions, {
    fields: [boxProduction.sessionId],
    references: [productionSessions.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMachineSchema = createInsertSchema(machines).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMachineConfigurationSchema = createInsertSchema(machineConfigurations).omit({
  id: true,
  createdAt: true,
});

export const insertProductionSessionSchema = createInsertSchema(productionSessions).omit({
  id: true,
});

export const insertBoxProductionSchema = createInsertSchema(boxProduction).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Machine = typeof machines.$inferSelect;
export type InsertMachine = z.infer<typeof insertMachineSchema>;

export type MachineConfiguration = typeof machineConfigurations.$inferSelect;
export type InsertMachineConfiguration = z.infer<typeof insertMachineConfigurationSchema>;

export type ProductionSession = typeof productionSessions.$inferSelect;
export type InsertProductionSession = z.infer<typeof insertProductionSessionSchema>;

export type BoxProduction = typeof boxProduction.$inferSelect;
export type InsertBoxProduction = z.infer<typeof insertBoxProductionSchema>;
