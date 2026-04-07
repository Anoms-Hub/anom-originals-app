/**
 * Printful API integration for Anom Originals
 * Handles order creation, fulfillment, and tracking
 */

import { getDb } from './db';
import { orders, orderItems } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const PRINTFUL_API_URL = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;

if (!PRINTFUL_API_KEY) {
  console.warn('[Printful] API key not configured. Set PRINTFUL_API_KEY environment variable.');
}

/**
 * Printful product variant mapping
 * Maps our product IDs to Printful product and variant IDs
 */
const PRINTFUL_PRODUCT_MAP: Record<string, { productId: number; variants: Record<string, number> }> = {
  'anom-tshirt-neon': {
    productId: 1, // Replace with actual Printful product ID
    variants: {
      'XS-Black': 1,
      'S-Black': 2,
      'M-Black': 3,
      'L-Black': 4,
      'XL-Black': 5,
      '2XL-Black': 6,
      '3XL-Black': 7,
      // Add more size/color combinations
    },
  },
  'anom-hoodie-neon': {
    productId: 2,
    variants: {
      'XS-Black': 101,
      'S-Black': 102,
      'M-Black': 103,
      'L-Black': 104,
      'XL-Black': 105,
      '2XL-Black': 106,
      '3XL-Black': 107,
    },
  },
  'anom-water-bottle': {
    productId: 3,
    variants: {
      '16oz-Black': 201,
      '24oz-Black': 202,
      '32oz-Black': 203,
    },
  },
  'anom-coffee-mug': {
    productId: 4,
    variants: {
      '11oz-White': 301,
      '15oz-White': 302,
      '11oz-Black': 303,
      '15oz-Black': 304,
    },
  },
  'anom-tumbler': {
    productId: 5,
    variants: {
      '20oz-Black': 401,
      '30oz-Black': 402,
      '20oz-Silver': 403,
      '30oz-Silver': 404,
    },
  },
};

interface PrintfulOrderItem {
  variant_id: number;
  quantity: number;
  retail_price?: string;
  files?: any[];
}

interface PrintfulOrderData {
  recipient: {
    name: string;
    email: string;
    address1: string;
    address2?: string;
    city: string;
    state_code: string;
    country_code: string;
    zip: string;
    phone?: string;
  };
  items: PrintfulOrderItem[];
  retail_costs?: {
    currency: string;
    subtotal: string;
    tax: string;
    shipping: string;
    total: string;
  };
  external_id?: string;
}

/**
 * Send order to Printful for fulfillment
 */
export async function sendOrderToPrintful(orderId: string, shippingInfo: any) {
  if (!PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured');
  }

  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  // Get order and items from database
  const orderResult = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  if (orderResult.length === 0) {
    throw new Error(`Order not found: ${orderId}`);
  }

  const order = orderResult[0];

  const itemsResult = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

  if (itemsResult.length === 0) {
    throw new Error(`No items found for order: ${orderId}`);
  }

  // Build Printful order items
  const printfulItems: PrintfulOrderItem[] = [];

  for (const item of itemsResult) {
    const productMap = PRINTFUL_PRODUCT_MAP[item.productId];
    if (!productMap) {
      console.warn(`[Printful] No mapping for product: ${item.productId}`);
      continue;
    }

    const variantKey = `${item.size}-${item.color}`;
    const variantId = productMap.variants[variantKey];

    if (!variantId) {
      console.warn(`[Printful] No variant mapping for ${item.productId} - ${variantKey}`);
      continue;
    }

    printfulItems.push({
      variant_id: variantId,
      quantity: item.quantity,
      retail_price: item.pricePerUnit,
    });
  }

  if (printfulItems.length === 0) {
    throw new Error('No valid items to send to Printful');
  }

  // Parse shipping address
  const shippingAddress = JSON.parse(shippingInfo || '{}');

  // Build Printful order
  const printfulOrder: PrintfulOrderData = {
    recipient: {
      name: order.customerName || 'Customer',
      email: order.customerEmail,
      address1: shippingAddress.address1 || '',
      address2: shippingAddress.address2,
      city: shippingAddress.city || '',
      state_code: shippingAddress.state || '',
      country_code: shippingAddress.country || 'US',
      zip: shippingAddress.zip || '',
      phone: shippingAddress.phone,
    },
    items: printfulItems,
    external_id: orderId,
  };

  // Send to Printful API
  try {
    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(printfulOrder),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Printful API error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    const printfulOrderId = data.result?.id;

    if (!printfulOrderId) {
      throw new Error('No order ID returned from Printful');
    }

    // Update order with Printful ID
    await db
      .update(orders)
      .set({
        printfulOrderId: printfulOrderId.toString(),
        fulfillmentStatus: 'processing',
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    console.log(`[Printful] Order ${orderId} sent to Printful as ${printfulOrderId}`);

    return {
      success: true,
      orderId,
      printfulOrderId,
    };
  } catch (error) {
    console.error('[Printful] Failed to send order:', error);
    throw error;
  }
}

/**
 * Get order status from Printful
 */
export async function getPrintfulOrderStatus(printfulOrderId: string) {
  if (!PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured');
  }

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/orders/${printfulOrderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Printful API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('[Printful] Failed to get order status:', error);
    throw error;
  }
}

/**
 * Update order tracking information from Printful
 */
export async function updateOrderTracking(orderId: string, printfulOrderId: string) {
  if (!PRINTFUL_API_KEY) {
    throw new Error('Printful API key not configured');
  }

  const db = await getDb();
  if (!db) {
    throw new Error('Database not available');
  }

  try {
    const printfulOrder = await getPrintfulOrderStatus(printfulOrderId);

    const trackingNumber = printfulOrder.shipments?.[0]?.tracking_number;
    const trackingUrl = printfulOrder.shipments?.[0]?.tracking_url;
    const status = printfulOrder.status;

    // Map Printful status to our fulfillment status
    let fulfillmentStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' = 'pending';
    if (status === 'draft') fulfillmentStatus = 'pending';
    if (status === 'pending') fulfillmentStatus = 'processing';
    if (status === 'confirmed') fulfillmentStatus = 'processing';
    if (status === 'shipped') fulfillmentStatus = 'shipped';
    if (status === 'delivered') fulfillmentStatus = 'delivered';
    if (status === 'failed') fulfillmentStatus = 'cancelled';

    await db
      .update(orders)
      .set({
        fulfillmentStatus,
        trackingNumber: trackingNumber || null,
        trackingUrl: trackingUrl || null,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    console.log(`[Printful] Updated tracking for order ${orderId}: ${fulfillmentStatus}`);

    return {
      orderId,
      fulfillmentStatus,
      trackingNumber,
      trackingUrl,
    };
  } catch (error) {
    console.error('[Printful] Failed to update tracking:', error);
    throw error;
  }
}
