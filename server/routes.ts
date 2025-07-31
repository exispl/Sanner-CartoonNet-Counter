import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertMachineSchema, 
  insertMachineConfigurationSchema,
  insertProductionSessionSchema,
  insertBoxProductionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Machine routes
  app.get("/api/machines", async (req, res) => {
    try {
      const machines = await storage.getMachines();
      res.json(machines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch machines" });
    }
  });

  app.post("/api/machines", async (req, res) => {
    try {
      const result = insertMachineSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid machine data", details: result.error });
      }
      
      const machine = await storage.createMachine(result.data);
      res.status(201).json(machine);
    } catch (error) {
      res.status(500).json({ error: "Failed to create machine" });
    }
  });

  app.put("/api/machines/:id", async (req, res) => {
    try {
      const result = insertMachineSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid machine data", details: result.error });
      }

      const machine = await storage.updateMachine(req.params.id, result.data);
      if (!machine) {
        return res.status(404).json({ error: "Machine not found" });
      }
      
      res.json(machine);
    } catch (error) {
      res.status(500).json({ error: "Failed to update machine" });
    }
  });

  // Machine configuration routes
  app.get("/api/machines/:machineId/configurations", async (req, res) => {
    try {
      const configurations = await storage.getMachineConfigurations(req.params.machineId);
      res.json(configurations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch configurations" });
    }
  });

  app.post("/api/machines/:machineId/configurations", async (req, res) => {
    try {
      const configData = { ...req.body, machineId: req.params.machineId };
      const result = insertMachineConfigurationSchema.safeParse(configData);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid configuration data", details: result.error });
      }

      const configuration = await storage.createMachineConfiguration(result.data);
      res.status(201).json(configuration);
    } catch (error) {
      res.status(500).json({ error: "Failed to create configuration" });
    }
  });

  // Production session routes
  app.get("/api/sessions/active", async (req, res) => {
    try {
      const sessions = await storage.getActiveSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch active sessions" });
    }
  });

  app.get("/api/machines/:machineId/sessions", async (req, res) => {
    try {
      const sessions = await storage.getSessionsForMachine(req.params.machineId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  app.post("/api/sessions", async (req, res) => {
    try {
      const result = insertProductionSessionSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid session data", details: result.error });
      }

      const session = await storage.createProductionSession(result.data);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to create session" });
    }
  });

  app.put("/api/sessions/:id", async (req, res) => {
    try {
      const result = insertProductionSessionSchema.partial().safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid session data", details: result.error });
      }

      const session = await storage.updateProductionSession(req.params.id, result.data);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to update session" });
    }
  });

  app.post("/api/sessions/:id/end", async (req, res) => {
    try {
      const session = await storage.endProductionSession(req.params.id);
      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to end session" });
    }
  });

  // Box production routes
  app.get("/api/sessions/:sessionId/boxes", async (req, res) => {
    try {
      const boxes = await storage.getBoxesForSession(req.params.sessionId);
      res.json(boxes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch boxes" });
    }
  });

  app.post("/api/sessions/:sessionId/boxes", async (req, res) => {
    try {
      const boxData = { ...req.body, sessionId: req.params.sessionId };
      const result = insertBoxProductionSchema.safeParse(boxData);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid box data", details: result.error });
      }

      const box = await storage.createBoxProduction(result.data);
      res.status(201).json(box);
    } catch (error) {
      res.status(500).json({ error: "Failed to create box" });
    }
  });

  app.post("/api/boxes/:id/complete", async (req, res) => {
    try {
      const box = await storage.completeBox(req.params.id);
      if (!box) {
        return res.status(404).json({ error: "Box not found" });
      }

      res.json(box);
    } catch (error) {
      res.status(500).json({ error: "Failed to complete box" });
    }
  });

  // Initialize default machines if none exist
  app.post("/api/initialize", async (req, res) => {
    try {
      const existingMachines = await storage.getMachines();
      
      if (existingMachines.length === 0) {
        const machine1 = await storage.createMachine({
          name: "MA820051",
          defaultLimit: 1000,
          defaultCycleTime: 4.0,
          isActive: true
        });

        const machine2 = await storage.createMachine({
          name: "MA820054", 
          defaultLimit: 1500,
          defaultCycleTime: 5.0,
          isActive: true
        });

        // Create default configurations
        await storage.createMachineConfiguration({
          machineId: machine1.id,
          name: "Default",
          limit: 1000,
          cycleTime: 4.0,
          isDefault: true
        });

        await storage.createMachineConfiguration({
          machineId: machine2.id,
          name: "Default", 
          limit: 1500,
          cycleTime: 5.0,
          isDefault: true
        });

        res.json({ message: "Default machines initialized", machines: [machine1, machine2] });
      } else {
        res.json({ message: "Machines already exist", machines: existingMachines });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to initialize machines" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
