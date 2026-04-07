import Stripe from 'stripe';
import { PRODUCTS } from './products';
import { getDb } from './db';
import { orders, orderItems } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export interface CheckoutItem {
  productId: string;
  quantity: number;
  color?: string;
  size?: string;
}

/**
 * Create a Stripe checkout session for an order
 */
export async function createCheckoutSession(
  items: CheckoutItem[],
  userId: number,
  userEmail: string,
  userName: string,
  origin: string
) {
  // Validate items and build line items for Stripe
  const lineItems: any[] = [];
  let totalAmount = 0;

  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    const amount = product.price * item.quantity;
    totalAmount += amount;

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.image],
          metadata: {
            productId: product.id,
            color: item.color || 'N/A',
            size: item.size || 'N/A',
          },
        },
        unit_amount: product.price, // Amount in cents
      },
      quantity: item.quantity,
    });
  }

  // Create order record in database
  const orderId = uuidv4();
  const totalAmountUSD = (totalAmount / 100).toString(); // Convert cents to dollars

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${origin}/orders/${orderId}?status=success`,
    cancel_url: `${origin}/shop?status=cancelled`,
    customer_email: userEmail,
    client_reference_id: userId.toString(),
    metadata: {
      userId: userId.toString(),
      userEmail: userEmail,
      userName: userName,
      orderId: orderId,
    } as any,
    allow_promotion_codes: true,
  });

  // Store order in database with pending status
  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  await db.insert(orders).values({
    id: orderId,
    userId,
    stripeSessionId: session.id,
    status: 'pending',
    totalAmount: totalAmountUSD,
    currency: 'USD',
    customerEmail: userEmail,
    customerName: userName,
    fulfillmentStatus: 'pending',
    metadata: JSON.stringify({
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
    }),
  });

  // Store order items
  for (const item of items) {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      const db2 = await getDb();
      if (db2) {
        await db2.insert(orderItems).values({
          id: uuidv4(),
          orderId,
          productId: product.id,
          productName: product.name,
          quantity: item.quantity,
          pricePerUnit: (product.price / 100).toString(),
          color: item.color,
          size: item.size,
        });
      }
    }
  }

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
    orderId,
  };
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(event: Stripe.Event) {
  const db = await getDb();
  if (!db) {
    console.warn('[Stripe] Database not available for webhook handling');
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      const paymentIntentId = session.payment_intent as string;

      if (orderId) {
        // Update order status to completed
        await db
          .update(orders)
          .set({
            status: 'completed',
            stripePaymentIntentId: paymentIntentId,
            updatedAt: new Date(),
          })
          .where(eq(orders.id, orderId));

        console.log(`[Stripe] Order ${orderId} completed`);
      }
      break;
    }

    case 'charge.failed': {
      const charge = event.data.object as Stripe.Charge;
      const metadata = charge.metadata;
      const orderId = metadata?.orderId;

      if (orderId && db) {
        await db
          .update(orders)
          .set({
            status: 'failed',
            updatedAt: new Date(),
          })
          .where(eq(orders.id, orderId));

        console.log(`[Stripe] Order ${orderId} payment failed`);
      }
      break;
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      const metadata = charge.metadata;
      const orderId = metadata?.orderId;

      if (orderId && db) {
        await db
          .update(orders)
          .set({
            status: 'refunded',
            updatedAt: new Date(),
          })
          .where(eq(orders.id, orderId));

        console.log(`[Stripe] Order ${orderId} refunded`);
      }
      break;
    }

    default:
      console.log(`[Stripe] Unhandled event type: ${event.type}`);
  }
}

export { stripe };
