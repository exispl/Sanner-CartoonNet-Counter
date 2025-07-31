import { 
  type User, 
  type InsertUser, 
  type Machine, 
  type InsertMachine,
  type MachineConfiguration,
  type InsertMachineConfiguration,
  type ProductionSession,
  type InsertProductionSession,
  type BoxProduction,
  type InsertBoxProduction,
  users,
  machines,
  machineConfigurations,
  productionSessions,
  boxProduction
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Machine methods
  getMachines(): Promise<Machine[]>;
  getMachine(id: string): Promise<Machine | undefined>;
  createMachine(machine: InsertMachine): Promise<Machine>;
  updateMachine(id: string, updates: Partial<InsertMachine>): Promise<Machine | undefined>;
  
  // Machine configuration methods
  getMachineConfigurations(machineId: string): Promise<MachineConfiguration[]>;
  createMachineConfiguration(config: InsertMachineConfiguration): Promise<MachineConfiguration>;
  getDefaultConfiguration(machineId: string): Promise<MachineConfiguration | undefined>;
  
  // Production session methods
  getActiveSessions(): Promise<ProductionSession[]>;
  getSessionsForMachine(machineId: string): Promise<ProductionSession[]>;
  createProductionSession(session: InsertProductionSession): Promise<ProductionSession>;
  updateProductionSession(id: string, updates: Partial<InsertProductionSession>): Promise<ProductionSession | undefined>;
  endProductionSession(id: string): Promise<ProductionSession | undefined>;
  
  // Box production methods
  getBoxesForSession(sessionId: string): Promise<BoxProduction[]>;
  createBoxProduction(box: InsertBoxProduction): Promise<BoxProduction>;
  completeBox(id: string): Promise<BoxProduction | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Machine methods
  async getMachines(): Promise<Machine[]> {
    return await db.select().from(machines).where(eq(machines.isActive, true)).orderBy(machines.name);
  }

  async getMachine(id: string): Promise<Machine | undefined> {
    const [machine] = await db.select().from(machines).where(eq(machines.id, id));
    return machine || undefined;
  }

  async createMachine(insertMachine: InsertMachine): Promise<Machine> {
    const [machine] = await db
      .insert(machines)
      .values({
        ...insertMachine,
        updatedAt: new Date()
      })
      .returning();
    return machine;
  }

  async updateMachine(id: string, updates: Partial<InsertMachine>): Promise<Machine | undefined> {
    const [machine] = await db
      .update(machines)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(machines.id, id))
      .returning();
    return machine || undefined;
  }

  // Machine configuration methods
  async getMachineConfigurations(machineId: string): Promise<MachineConfiguration[]> {
    return await db
      .select()
      .from(machineConfigurations)
      .where(eq(machineConfigurations.machineId, machineId))
      .orderBy(desc(machineConfigurations.isDefault), machineConfigurations.name);
  }

  async createMachineConfiguration(config: InsertMachineConfiguration): Promise<MachineConfiguration> {
    const [configuration] = await db
      .insert(machineConfigurations)
      .values(config)
      .returning();
    return configuration;
  }

  async getDefaultConfiguration(machineId: string): Promise<MachineConfiguration | undefined> {
    const [config] = await db
      .select()
      .from(machineConfigurations)
      .where(and(
        eq(machineConfigurations.machineId, machineId),
        eq(machineConfigurations.isDefault, true)
      ));
    return config || undefined;
  }

  // Production session methods
  async getActiveSessions(): Promise<ProductionSession[]> {
    return await db
      .select()
      .from(productionSessions)
      .where(eq(productionSessions.status, "active"))
      .orderBy(productionSessions.startTime);
  }

  async getSessionsForMachine(machineId: string): Promise<ProductionSession[]> {
    return await db
      .select()
      .from(productionSessions)
      .where(eq(productionSessions.machineId, machineId))
      .orderBy(desc(productionSessions.startTime));
  }

  async createProductionSession(session: InsertProductionSession): Promise<ProductionSession> {
    const [productionSession] = await db
      .insert(productionSessions)
      .values(session)
      .returning();
    return productionSession;
  }

  async updateProductionSession(id: string, updates: Partial<InsertProductionSession>): Promise<ProductionSession | undefined> {
    const [session] = await db
      .update(productionSessions)
      .set(updates)
      .where(eq(productionSessions.id, id))
      .returning();
    return session || undefined;
  }

  async endProductionSession(id: string): Promise<ProductionSession | undefined> {
    const [session] = await db
      .update(productionSessions)
      .set({
        status: "completed",
        endTime: new Date()
      })
      .where(eq(productionSessions.id, id))
      .returning();
    return session || undefined;
  }

  // Box production methods
  async getBoxesForSession(sessionId: string): Promise<BoxProduction[]> {
    return await db
      .select()
      .from(boxProduction)
      .where(eq(boxProduction.sessionId, sessionId))
      .orderBy(boxProduction.boxNumber);
  }

  async createBoxProduction(box: InsertBoxProduction): Promise<BoxProduction> {
    const [boxProd] = await db
      .insert(boxProduction)
      .values(box)
      .returning();
    return boxProd;
  }

  async completeBox(id: string): Promise<BoxProduction | undefined> {
    const [box] = await db
      .update(boxProduction)
      .set({
        completedTime: new Date()
      })
      .where(eq(boxProduction.id, id))
      .returning();
    return box || undefined;
  }
}

export const storage = new DatabaseStorage();
