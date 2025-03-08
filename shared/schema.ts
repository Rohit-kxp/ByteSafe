import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  phoneNumber: text("phone_number").notNull(),
  password: text("password").notNull(),
  faceVerified: boolean("face_verified").default(false),
  gestureVerified: boolean("gesture_verified").default(false),
  encryptionKey: text("encryption_key"),
  lastLoginLocation: text("last_login_location"),
  lastLoginTime: timestamp("last_login_time"),
});

export const devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  deviceId: text("device_id").notNull(),
  location: text("location").notNull(),
  encryptionKey: text("encryption_key").notNull(),
  lastUsed: timestamp("last_used").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  phoneNumber: true,
  password: true,
}).extend({
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  location: z.string(),
  deviceId: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type Device = typeof devices.$inferSelect;
