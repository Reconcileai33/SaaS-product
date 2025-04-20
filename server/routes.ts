import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTransactionSchema, insertIntegrationSchema, insertReconciliationRuleSchema, insertReconciliationJobSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard API
  app.get("/api/dashboard", async (req, res) => {
    try {
      const stats = {
        totalTransactions: await storage.getTotalTransactions(),
        successRate: await storage.getTransactionSuccessRate(),
        processingTime: 1.2,
        activeRules: await storage.getActiveRulesCount(),
        feeIntelligence: {
          savings: 1250,
          feeRate: 2.3,
          chartData: [
            { provider: "Stripe", amount: 2200 },
            { provider: "PayPal", amount: 1700 },
            { provider: "Square", amount: 1200 },
            { provider: "Wise", amount: 800 }
          ]
        },
        aiInsights: [
          { 
            id: 1, 
            type: "duplicate", 
            message: "Detected 3 potential duplicate payments in recent transactions",
            severity: "warning" 
          },
          { 
            id: 2, 
            type: "trend", 
            message: "Transaction volume has increased by 15% compared to last month",
            severity: "info" 
          },
          { 
            id: 3, 
            type: "optimization", 
            message: "Recommended optimization: Enable automatic matching for new-rule transactions",
            severity: "info" 
          },
          { 
            id: 4, 
            type: "alert", 
            message: "Alert: Unusual payment pattern detected in recent PayPal transactions",
            severity: "error" 
          }
        ]
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to load dashboard data" });
    }
  });
  
  // Transactions API
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transactions" });
    }
  });
  
  app.post("/api/transactions", async (req, res) => {
    try {
      const data = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(data);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create transaction" });
      }
    }
  });
  
  // Integrations API
  app.get("/api/integrations", async (req, res) => {
    try {
      const integrations = await storage.getAllIntegrations();
      res.json(integrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch integrations" });
    }
  });
  
  app.post("/api/integrations", async (req, res) => {
    try {
      const data = insertIntegrationSchema.parse(req.body);
      const integration = await storage.createIntegration(data);
      res.status(201).json(integration);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create integration" });
      }
    }
  });
  
  app.patch("/api/integrations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const integration = await storage.updateIntegration(id, req.body);
      if (!integration) {
        return res.status(404).json({ error: "Integration not found" });
      }
      res.json(integration);
    } catch (error) {
      res.status(500).json({ error: "Failed to update integration" });
    }
  });
  
  // Reconciliation API
  app.get("/api/reconciliations", async (req, res) => {
    try {
      const reconciliationData = {
        stats: {
          totalTransactions: 0,
          aiMatched: 0,
          pendingReview: 0,
          successRate: 0
        },
        jobs: await storage.getAllReconciliationJobs()
      };
      res.json(reconciliationData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reconciliation data" });
    }
  });
  
  app.post("/api/reconciliation-rules", async (req, res) => {
    try {
      const data = insertReconciliationRuleSchema.parse(req.body);
      const rule = await storage.createReconciliationRule(data);
      res.status(201).json(rule);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create reconciliation rule" });
      }
    }
  });
  
  app.post("/api/reconciliation-jobs", async (req, res) => {
    try {
      const data = insertReconciliationJobSchema.parse(req.body);
      const job = await storage.createReconciliationJob(data);
      res.status(201).json(job);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create reconciliation job" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
