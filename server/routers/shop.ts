import { publicProcedure, router } from '../_core/trpc';
import { z } from 'zod';
import { createCashAppOrder, completeCashAppOrder } from '../cashapp';
import { PRODUCTS } from '../products';

export const shopRouter = router({
  /**
   * Get all products
   */
  getProducts: publicProcedure.query(async () => {
    return PRODUCTS;
  }),

  /**
   * Get product by ID
   */
  getProduct: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const product = PRODUCTS.find((p) => p.id === input.productId);
      if (!product) {
        throw new Error(`Product not found: ${input.productId}`);
      }
      return product;
    }),

  /**
   * Create Cash App order
   */
  createCashAppOrder: publicProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number().min(1),
            color: z.string().optional(),
            size: z.string().optional(),
          })
        ),
        userEmail: z.string().email(),
        userName: z.string(),
        cashAppHandle: z.string(), // e.g., $anomoriginals
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await createCashAppOrder(
          input.items,
          ctx.user?.id || 0, // Use 0 for anonymous users
          input.userEmail,
          input.userName,
          input.cashAppHandle,
          ctx.req.headers.origin || 'https://anomartsy.xyz'
        );

        return result;
      } catch (error) {
        console.error('[Shop] Failed to create Cash App order:', error);
        throw error;
      }
    }),

  /**
   * Complete Cash App order after payment
   */
  completeCashAppOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
        transactionReference: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await completeCashAppOrder(
          input.orderId,
          input.transactionReference
        );

        return result;
      } catch (error) {
        console.error('[Shop] Failed to complete Cash App order:', error);
        throw error;
      }
    }),
});
