import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  isNew: boolean("is_new").notNull().default(true),
});

export const insertProductSchema = createInsertSchema(products).extend({
  id: z.string().optional(),
  isNew: z.boolean().optional().default(true),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
