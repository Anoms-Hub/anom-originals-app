/**
 * Product catalog for Anom Originals e-commerce store
 * All prices in USD
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'apparel' | 'drinkware' | 'digital';
  price: number; // in cents
  image: string;
  printfulProductId?: string; // Printful product ID for integration
  colors?: string[];
  sizes?: string[];
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  // Apparel
  {
    id: 'anom-tshirt-neon',
    name: 'ANOM Neon Circuit T-Shirt',
    description: 'Unisex t-shirt with glowing neon ANOM circuit board design. Comfortable, breathable cotton blend perfect for everyday wear.',
    category: 'apparel',
    price: 2500, // $25.00
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/neon-tshirt-design-6UKPbqe4EpU7KkdB74Stg7.webp',
    colors: ['Black', 'Navy', 'Charcoal'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    featured: true,
  },
  {
    id: 'anom-hoodie-neon',
    name: 'ANOM ORIGINALS Neon Hoodie',
    description: 'Premium unisex hoodie with ANOM ORIGINALS neon text and circuit patterns. Perfect for comfort and style.',
    category: 'apparel',
    price: 4500, // $45.00
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/neon-hoodie-design-GZigJa86LrexdeVBjrYdYd.webp',
    colors: ['Black', 'Charcoal', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    featured: true,
  },

  // Drinkware
  {
    id: 'anom-water-bottle',
    name: 'ANOM Neon Water Bottle',
    description: 'Stainless steel insulated water bottle with neon geometric patterns. Keeps drinks cold for 24 hours or hot for 12 hours.',
    category: 'drinkware',
    price: 2800, // $28.00
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/neon-water-bottle-design-XxUCQx8S8EJk3QyNSc2evR.webp',
    colors: ['Black', 'Silver'],
    sizes: ['16oz', '24oz', '32oz'],
    featured: true,
  },
  {
    id: 'anom-coffee-mug',
    name: 'ANOM Neon Coffee Mug',
    description: 'Ceramic coffee mug with neon circuit design. Perfect for your morning coffee or tea. Dishwasher and microwave safe.',
    category: 'drinkware',
    price: 1500, // $15.00
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/neon-coffee-mug-design-GQsdewhgbiQnJ3e2wCsuRW.webp',
    colors: ['White', 'Black'],
    sizes: ['11oz', '15oz'],
    featured: false,
  },
  {
    id: 'anom-tumbler',
    name: 'ANOM Neon Tumbler',
    description: 'Insulated stainless steel tumbler with neon diamond patterns. Perfect for on-the-go drinks. Fits most car cup holders.',
    category: 'drinkware',
    price: 2200, // $22.00
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/neon-tumbler-design-2k7S9eCp4VLSe38dQp3Jhm.webp',
    colors: ['Black', 'Silver'],
    sizes: ['20oz', '30oz'],
    featured: false,
  },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter((p) => p.featured);

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}
