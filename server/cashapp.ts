/**
 * Cash App payment integration for Anom Originals
 * Generates payment requests and tracks Cash App payments
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
 * Create a Cash App payment request
 * Returns payment details for the user to complete manually
 */
export async function createCashAppOrder(
  items: CheckoutItem[],
  userId: number,
  userEmail: string,
  userName: string,
  cashAppHandle: string, // Your Cash App handle (e.g., $anomoriginals)
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
      pricePerUnit: product.price / 100,
      color: item.color,
      size: item.size,
    });
  }

  // Create order record in database
  const orderId = uuidv4();
  const totalAmountUSD = (totalAmount / 100).toFixed(2);

  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // Store order in database with pending status
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
      paymentMethod: 'cashapp',
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

  // Generate Cash App payment link
  // Format: cash.app/$handle/$amount
  const cashAppLink = `https://cash.app/${cashAppHandle}/${totalAmountUSD}`;

  return {
    orderId,
    totalAmount: totalAmountUSD,
    items: itemDetails,
    cashAppLink,
    paymentInstructions: `Send $${totalAmountUSD} to ${cashAppHandle} on Cash App. Include your order ID in the note: ${orderId}`,
    confirmationUrl: `${origin}/orders/${orderId}?status=pending`,
  };
}

/**
 * Mark Cash App order as completed
 * Called when user confirms payment has been sent
 */
export async function completeCashAppOrder(
  orderId: string,
  transactionReference?: string
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
        paymentMethod: 'cashapp',
        cashAppTransactionRef: transactionReference,
        completedAt: new Date().toISOString(),
      }),
      updatedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  return { success: true, orderId };
}

/**
 * Get Cash App payment status
 */
export async function getCashAppOrderStatus(orderId: string) {
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (result.length === 0) {
    throw new Error(`Order not found: ${orderId}`);
  }

  return result[0];
}
