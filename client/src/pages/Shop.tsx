import { useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { trpc } from '@/lib/trpc';

const PRODUCT_TYPES = [
  { id: 'all', label: 'All' },
  { id: 'tshirt', label: 'T-Shirts' },
  { id: 'hoodie', label: 'Hoodies' },
  { id: 'mug', label: 'Mugs' },
  { id: 'water_bottle', label: 'Water Bottles' },
  { id: 'coffee_bottle', label: 'Coffee Bottles' },
  { id: 'phone_case', label: 'Phone Cases' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'self-care', label: 'Self-Care' },
  { id: 'luxury', label: 'Luxury Icons' },
  { id: 'neon-power', label: 'Neon Power' },
  { id: 'neon-vibes', label: 'Neon Vibes' },
  { id: 'animals', label: 'Cute Animals' },
  { id: 'empowerment', label: 'Empowerment' },
  { id: 'tech', label: 'Tech' },
  { id: 'scifi', label: 'Sci-Fi' },
  { id: 'digital', label: 'Digital Dreams' },
  { id: 'wellness', label: 'Wellness' },
];

interface ShopProduct {
  id: string;
  designName: string;
  designSlug?: string;
  description: string;
  imageUrl: string;
  productType: string;
  price: number | string;
  category: string;
  isActive?: number | boolean;
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  productType: string;
  designName: string;
}

function formatProductType(type: string) {
  return type.replace(/_/g, ' ');
}

function formatCategory(category: string) {
  return category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getPrice(value: number | string | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function uniqueByDesign(products: ShopProduct[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    const key = product.designSlug || product.designName;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function Shop() {
  const [, setLocation] = useLocation();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState('tshirt');
  const [sortBy, setSortBy] = useState('featured');
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, error } = trpc.shop.getAll.useQuery() as {
    data?: ShopProduct[];
    isLoading: boolean;
    error?: unknown;
  };

  const products = Array.isArray(data) ? data : [];

  const filteredProducts = useMemo(() => {
    let filtered = [...products].filter((product) => {
      if (product.isActive === 0) return false;
      return true;
    });

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedProductType !== 'all') {
      filtered = filtered.filter((product) => product.productType === selectedProductType);
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => getPrice(a.price) - getPrice(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => getPrice(b.price) - getPrice(a.price));
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.designName.localeCompare(b.designName));
    }

    return filtered;
  }, [products, selectedCategory, selectedProductType, sortBy]);

  const featuredProducts = useMemo(() => {
    return uniqueByDesign(filteredProducts).slice(0, 12);
  }, [filteredProducts]);

  const displayProducts = showAll ? filteredProducts : featuredProducts;

  const addToCart = (product: ShopProduct) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    const price = getPrice(product.price);

    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    setCart((prev) => [
      ...prev,
      {
        productId: product.id,
        productName: `${product.designName} - ${formatProductType(product.productType)}`,
        quantity: 1,
        price,
        productType: product.productType,
        designName: product.designName,
      },
    ]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setLocation('/checkout');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container px-4 py-10 md:px-6 md:py-14">
        <div className="mx-auto max-w-5xl text-center mb-10 md:mb-14">
          <p className="inline-flex items-center gap-2 text-xs md:text-sm border border-border rounded-full px-3 py-1 mb-4 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            Curated merch drop
          </p>
          <h1 className="font-display text-3xl md:text-5xl mb-4 glow-cyan">
            SHOP ANOM
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Curated merch, bold designs, and a cleaner way to browse the collection.
          </p>
        </div>

        <div className="mb-8 md:mb-10 space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRODUCT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedProductType(type.id);
                  setShowAll(false);
                }}
                className={`rounded-full px-4 py-2 text-xs md:text-sm transition ${
                  selectedProductType === type.id
                    ? 'bg-primary text-primary-foreground neon-border'
                    : 'border border-border hover:border-primary text-muted-foreground hover:text-foreground'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-border bg-card/50 p-4 md:p-5">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setShowAll(false);
                }}
                className="w-full md:w-[220px] bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
              >
                {CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-[200px] bg-background border border-border rounded px-3 py-2 text-sm text-foreground"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A–Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <p className="text-sm text-muted-foreground">
                {showAll
                  ? `${filteredProducts.length} products`
                  : `${displayProducts.length} featured`}
              </p>

              <button
                onClick={() => setShowCart(true)}
                className="relative inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/80 transition"
              >
                <ShoppingCart className="h-4 w-4" />
                Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-72">
            <Loader2 className="h-8 w-8 animate-spin glow-cyan" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400">Error loading products. Please try again later.</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found for this filter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {displayProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-card border-border hover:border-primary transition overflow-hidden group"
                >
                  <div className="relative h-72 md:h-80 overflow-hidden bg-background/40">
                    <img
                      src={product.imageUrl}
                      alt={product.designName}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                    <div className="absolute top-4 left-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-mono text-muted-foreground">
                      {formatCategory(product.category)}
                    </div>
                    <div className="absolute top-4 right-4 rounded-full border border-primary/40 bg-background/80 px-3 py-1 text-xs font-mono text-primary">
                      {formatProductType(product.productType)}
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-xl mb-2 glow-cyan">
                      {product.designName}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-2xl glow-magenta">
                        ${getPrice(product.price).toFixed(2)}
                      </span>

                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              {!showAll && filteredProducts.length > displayProducts.length ? (
                <Button
                  variant="outline"
                  className="border-border hover:border-primary"
                  onClick={() => setShowAll(true)}
                >
                  Browse More
                </Button>
              ) : showAll && filteredProducts.length > 12 ? (
                <Button
                  variant="outline"
                  className="border-border hover:border-primary"
                  onClick={() => setShowAll(false)}
                >
                  Back to Featured
                </Button>
              ) : null}
            </div>
          </>
        )}
      </div>

      {showCart && (
        <>
          <div
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-40"
            onClick={() => setShowCart(false)}
          />

          <div className="fixed right-0 top-0 z-50 h-full w-full md:w-[420px] bg-card border-l border-border shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl glow-cyan">CART</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="rounded p-2 hover:bg-background transition"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.productId}
                        className="rounded-lg border border-border bg-background p-4"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="font-semibold text-sm">{item.designName}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {formatProductType(item.productType)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-muted-foreground hover:text-foreground transition"
                            aria-label="Remove item"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 rounded border border-border bg-card">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-2 hover:bg-background transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="min-w-[24px] text-center text-sm font-semibold">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-2 hover:bg-background transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-5">
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-display text-lg">Total</span>
                      <span className="font-display text-2xl glow-magenta">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-display"
                    >
                      CHECKOUT
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
