import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("client"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  category: text("category").notNull(),
  image: text("image"),
  isActive: boolean("is_active").default(true),
});

export const stylists = pgTable("stylists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(),
  experience: integer("experience").notNull(),
  image: text("image"),
  isAvailable: boolean("is_available").default(true),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  clientPhone: text("client_phone").notNull(),
  serviceId: integer("service_id").references(() => services.id),
  stylistId: integer("stylist_id").references(() => stylists.id),
  appointmentDate: timestamp("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),
  status: text("status").notNull().default("pending"),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  image: text("image"),
  inStock: boolean("in_stock").default(true),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("5.0"),
  isNew: boolean("is_new").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
});

export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  benefits: jsonb("benefits").notNull(),
  discount: integer("discount").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  beforeImage: text("before_image"),
  afterImage: text("after_image"),
  image: text("image"),
  category: text("category").notNull(),
  clientName: text("client_name"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("5.0"),
});

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  role: z.enum(["admin", "client"]),
}).omit({
  id: true,
  createdAt: true,
});

export const insertServiceSchema = createInsertSchema(services, {
  price: z.string().transform(val => parseFloat(val)),
  duration: z.number().min(15).max(480),
}).omit({
  id: true,
});

export const insertStylistSchema = createInsertSchema(stylists, {
  experience: z.number().min(0).max(50),
}).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings, {
  clientEmail: z.string().email(),
  clientPhone: z.string().min(10),
  serviceId: z.number().optional(),
  stylistId: z.number().optional(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
}).omit({
  id: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products, {
  price: z.string().transform(val => parseFloat(val)),
  originalPrice: z.string().transform(val => parseFloat(val)).optional(),
  rating: z.string().transform(val => parseFloat(val)).optional(),
}).omit({
  id: true,
});

export const insertMembershipSchema = createInsertSchema(memberships, {
  price: z.string().transform(val => parseFloat(val)),
  discount: z.number().min(0).max(100),
  benefits: z.array(z.string()),
}).omit({
  id: true,
});

export const insertGallerySchema = createInsertSchema(gallery, {
  rating: z.string().transform(val => parseFloat(val)).optional(),
}).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertStylist = z.infer<typeof insertStylistSchema>;
export type Stylist = typeof stylists.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertMembership = z.infer<typeof insertMembershipSchema>;
export type Membership = typeof memberships.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;
