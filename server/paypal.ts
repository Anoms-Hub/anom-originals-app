/**
 * PayPal payment integration for Anom Originals
 * Handles order creation and payment processing through PayPal
 */

import { PRODUCTS } from './products';
import { getDb } from './db';
import { orders, orderItems } from '../drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

export interface CheckoutItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

/**
 * Create a PayPal order for payment
 */
export async function createPayPalOrder(
  items: CheckoutItem[],
  userId: number,
  userEmail: string,
  userName: string,
  origin: string
) {
  // Validate items and calculate total
  let totalAmount = 0;
  const itemDetails: any[] = [];

  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const amount = product.price * item.quantity;
    totalAmount += amount;

    itemDetails.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      pricePerUnit: product.price / 100, // Convert to dollars
      color: item.color,
      size: item.size,
    });
  }

  // Create order record in database
  const orderId = uuidv4();
  const totalAmountUSD = (totalAmount / 100).toFixed(2); // Convert cents to dollars

  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // Store order in database
  await db.insert(orders).values({
    id: orderId,
    userId,
    status: 'pending',
    totalAmount: totalAmountUSD,
    currency: 'USD',
    customerEmail: userEmail,
    customerName: userName,
    fulfillmentStatus: 'pending',
    metadata: JSON.stringify({
      paymentMethod: 'paypal',
      items: itemDetails,
    }),
  });

  // Store order items
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      await db.insert(orderItems).values({
        id: uuidv4(),
        orderId,
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        pricePerUnit: (product.price / 100).toFixed(2),
        color: item.color,
        size: item.size,
      });
    }
  }

  // Return order details for PayPal integration
  return {
    orderId,
    totalAmount: totalAmountUSD,
    items: itemDetails,
    returnUrl: `${origin}/orders/${orderId}?status=success`,
    cancelUrl: `${origin}/shop?status=cancelled`,
  };
}

/**
 * Mark order as completed after PayPal payment
 */
export async function completePayPalOrder(
  orderId: string,
  transactionId: string
) {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db
    .update(orders)
    .set({
      status: 'completed',
      metadata: JSON.stringify({
        paymentMethod: 'paypal',
        paypalTransactionId: transactionId,
      }),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return { success: true, orderId };
}

/**
 * Mark order as failed
 */
export async function failPayPalOrder(orderId: string, reason: string) {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db
    .update(orders)
    .set({
      status: 'failed',
      metadata: JSON.stringify({
        paymentMethod: 'paypal',
        failureReason: reason,
      }),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return { success: true, orderId };
}
