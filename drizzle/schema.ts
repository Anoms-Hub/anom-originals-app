import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// E-commerce tables
export const orders = mysqlTable('orders', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: int('user_id').notNull(),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).unique(),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }).unique(),
  status: mysqlEnum('status', ['pending', 'completed', 'failed', 'refunded']).default('pending'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  printfulOrderId: varchar('printful_order_id', { length: 255 }),
  fulfillmentStatus: mysqlEnum('fulfillment_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']).default('pending'),
  trackingNumber: varchar('tracking_number', { length: 255 }),
  trackingUrl: text('tracking_url'),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerName: varchar('customer_name', { length: 255 }),
  shippingAddress: text('shipping_address'),
  metadata: text('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export const orderItems = mysqlTable('order_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  orderId: varchar('order_id', { length: 36 }).notNull(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  quantity: int('quantity').notNull().default(1),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  color: varchar('color', { length: 100 }),
  size: varchar('size', { length: 100 }),
  printfulProductId: varchar('printful_product_id', { length: 255 }),
  printfulVariantId: varchar('printful_variant_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const cartItems = mysqlTable('cart_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: int('user_id').notNull(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  quantity: int('quantity').notNull().default(1),
  color: varchar('color', { length: 100 }),
  size: varchar('size', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;
// Products table for design merchandise
export const products = mysqlTable('products', {
  id: varchar('id', { length: 36 }).primaryKey(),
  designName: varchar('design_name', { length: 255 }).notNull(),
  designSlug: varchar('design_slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  productType: mysqlEnum('product_type', ['tshirt', 'hoodie', 'mug', 'water_bottle', 'coffee_bottle', 'phone_case']).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  printfulProductId: varchar('printful_product_id', { length: 255 }),
  printfulVariantId: varchar('printful_variant_id', { length: 255 }),
  category: varchar('category', { length: 100 }),
  tags: text('tags'),
  isActive: int('is_active').default(1),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
