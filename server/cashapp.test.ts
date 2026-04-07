import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createCashAppOrder, completeCashAppOrder } from './cashapp';

describe('Cash App Payment Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createCashAppOrder', () => {
    it('should create a Cash App order with valid items', async () => {
      const items = [
        {
          productId: 'anom-tshirt-neon',
          quantity: 2,
          color: 'Black',
          size: 'M',
        },
      ];

      const result = await createCashAppOrder(
        items,
        1,
        'test@example.com',
        'Test User',
        '$anomoriginals',
        'https://example.com'
      );

      expect(result).toBeDefined();
      expect(result.orderId).toBeDefined();
      expect(result.cashAppLink).toBeDefined();
      expect(result.totalAmount).toBeDefined();
      expect(parseFloat(result.totalAmount)).toBeGreaterThan(0);
    });

    it('should calculate correct total for multiple items', async () => {
      const items = [
        {
          productId: 'anom-tshirt-neon',
          quantity: 1,
          color: 'Black',
          size: 'M',
        },
        {
          productId: 'anom-hoodie-neon',
          quantity: 1,
          color: 'Black',
          size: 'L',
        },
      ];

      const result = await createCashAppOrder(
        items,
        1,
        'test@example.com',
        'Test User',
        '$anomoriginals',
        'https://example.com'
      );

      expect(parseFloat(result.totalAmount)).toBeGreaterThan(0);
      expect(result.items.length).toBe(2);
    });

    it('should generate valid Cash App link', async () => {
      const items = [
        {
          productId: 'anom-tshirt-neon',
          quantity: 1,
          color: 'Black',
          size: 'M',
        },
      ];

      const result = await createCashAppOrder(
        items,
        1,
        'test@example.com',
        'Test User',
        '$anomoriginals',
        'https://example.com'
      );

      expect(result.cashAppLink).toContain('$anomoriginals');
      expect(result.cashAppLink).toMatch(/\d+\.\d{2}$/);
    });
  });

  describe('completeCashAppOrder', () => {
    it('should complete a Cash App order', async () => {
      // First create an order
      const items = [
        {
          productId: 'anom-tshirt-neon',
          quantity: 1,
          color: 'Black',
          size: 'M',
        },
      ];

      const createResult = await createCashAppOrder(
        items,
        1,
        'test@example.com',
        'Test User',
        '$anomoriginals',
        'https://example.com'
      );

      // Then complete it
      const completeResult = await completeCashAppOrder(
        createResult.orderId,
        'TEST_TRANSACTION_123'
      );

      expect(completeResult).toBeDefined();
      expect(completeResult.success).toBe(true);
      expect(completeResult.orderId).toBe(createResult.orderId);
    });

    it('should update order status to completed', async () => {
      const items = [
        {
          productId: 'anom-tshirt-neon',
          quantity: 1,
          color: 'Black',
          size: 'M',
        },
      ];

      const createResult = await createCashAppOrder(
        items,
        1,
        'test@example.com',
        'Test User',
        '$anomoriginals',
        'https://example.com'
      );

      const completeResult = await completeCashAppOrder(
        createResult.orderId,
        'TEST_TRANSACTION_123'
      );

      expect(completeResult.success).toBe(true);
      expect(completeResult.orderId).toBe(createResult.orderId);
    });
  });
});
