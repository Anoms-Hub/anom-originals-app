import { mysqlTable, varchar, int, text, timestamp, decimal, boolean, enum as mysqlEnum } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

/**
 * E-commerce schema for Anom Originals store
 * Integrates with Stripe for payments and Printful for fulfillment
 */

// Orders table - stores order information
export const orders = mysqlTable('orders', {
  id: varchar('id', { length: 36 }).primaryKey(), // UUID
  userId: varchar('user_id', { length: 36 }).notNull(),
  stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 255 }).unique(),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }).unique(),
  status: mysqlEnum('status', ['pending', 'completed', 'failed', 'refunded']).default('pending'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(), // in USD
  currency: varchar('currency', { length: 3 }).default('USD'),
  
  // Fulfillment info
  printfulOrderId: varchar('printful_order_id', { length: 255 }),
  fulfillmentStatus: mysqlEnum('fulfillment_status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled']).default('pending'),
  trackingNumber: varchar('tracking_number', { length: 255 }),
  trackingUrl: text('tracking_url'),
  
  // Customer info (stored for reference, also in Stripe)
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerName: varchar('customer_name', { length: 255 }),
  
  // Shipping address
  shippingAddress: text('shipping_address'), // JSON stringified
  
  // Metadata
  metadata: text('metadata'), // JSON for custom data
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Order items table - individual items in an order
export const orderItems = mysqlTable('order_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  orderId: varchar('order_id', { length: 36 }).notNull(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  quantity: int('quantity').notNull().default(1),
  pricePerUnit: decimal('price_per_unit', { precision: 10, scale: 2 }).notNull(),
  
  // Product variant info
  color: varchar('color', { length: 100 }),
  size: varchar('size', { length: 100 }),
  
  // Printful product mapping
  printfulProductId: varchar('printful_product_id', { length: 255 }),
  printfulVariantId: varchar('printful_variant_id', { length: 255 }),
  
  createdAt: timestamp('created_at').defaultNow(),
});

// Cart items table - for shopping cart functionality
export const cartItems = mysqlTable('cart_items', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  productId: varchar('product_id', { length: 255 }).notNull(),
  quantity: int('quantity').notNull().default(1),
  
  // Product variant
  color: varchar('color', { length: 100 }),
  size: varchar('size', { length: 100 }),
  
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

// Relations
export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));
