import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // GET /api/products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve products" });
    }
  });

  // GET /api/products/:id
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve product" });
    }
  });

  // POST /api/products
  app.post("/api/products", async (req, res) => {
    try {
      const parsed = insertProductSchema.safeParse(req.body);
      if (!parsed.success) {
        const valError = fromZodError(parsed.error);
        return res.status(400).json({ message: valError.message });
      }

      const product = await storage.createProduct(parsed.data);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  return httpServer;
}
