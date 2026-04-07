import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Filter, X, Plus, Minus } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Loader2 } from 'lucide-react';

const PRODUCT_TYPES = [
  { id: 'tshirt', label: 'T-Shirts', icon: '👕' },
  { id: 'hoodie', label: 'Hoodies', icon: '🧥' },
  { id: 'mug', label: 'Mugs', icon: '☕' },
  { id: 'water_bottle', label: 'Water Bottles', icon: '💧' },
  { id: 'coffee_bottle', label: 'Coffee Bottles', icon: '🔥' },
  { id: 'phone_case', label: 'Phone Cases', icon: '📱' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Designs' },
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

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  productType: string;
  designName: string;
}

export default function Shop() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch all products
  const { data: products = [], isLoading, error } = trpc.shop.getAll.useQuery() as any;

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p: any) => p.category === selectedCategory);
    }

    if (selectedProductType) {
      filtered = filtered.filter((p: any) => p.productType === selectedProductType);
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      filtered.sort((a: any, b: any) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'name') {
      filtered.sort((a: any, b: any) => a.designName.localeCompare(b.designName));
    }

    return filtered;
  }, [products, selectedCategory, selectedProductType, sortBy]);

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.productId === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: `${product.designName} - ${product.productType}`,
        quantity: 1,
        price: parseFloat(product.price),
        productType: product.productType,
        designName: product.designName,
      }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
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
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-5xl mb-4 glow-cyan">SHOP ANOM</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exclusive neon-designed merchandise. Limited edition comfort wear for the creative soul.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Product Type Filter */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <h3 className="font-display text-lg mb-4 glow-magenta">PRODUCT TYPE</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedProductType(null)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedProductType === null
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-card-foreground/10'
                    }`}
                  >
                    All Products
                  </button>
                  {PRODUCT_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedProductType(type.id)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedProductType === type.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-card-foreground/10'
                      }`}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <h3 className="font-display text-lg mb-4 glow-yellow">CATEGORIES</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                        selectedCategory === cat.id
                          ? 'bg-secondary text-secondary-foreground'
                          : 'hover:bg-card-foreground/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="bg-card border border-border p-6 rounded-lg">
                <h3 className="font-display text-lg mb-4 glow-cyan">SORT</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-background border border-border rounded px-3 py-2 text-foreground"
                >
                  <option value="newest">Newest</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-8 w-8 animate-spin glow-cyan" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500">
                Error loading products. Please try again later.
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="relative flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart ({cartCount})
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No products found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product: any) => (
                      <Card key={product.id} className="bg-card border-border hover:border-primary transition group overflow-hidden">
                        <div className="relative h-64 bg-background/50 overflow-hidden">
                          <img
                            src={product.imageUrl}
                            alt={product.designName}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-lg mb-2 glow-cyan truncate">
                            {product.designName}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2 capitalize">
                            {product.productType.replace('_', ' ')}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-display text-xl glow-magenta">
                              ${parseFloat(product.price).toFixed(2)}
                            </span>
                            <Button
                              onClick={() => addToCart(product)}
                              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              size="sm"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-card border-l border-border shadow-lg z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl glow-cyan">CART</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-background rounded"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.productId} className="bg-background p-4 rounded border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold text-sm">{item.designName}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {item.productType.replace('_', ' ')}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center gap-2 bg-card border border-border rounded">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1 hover:bg-background"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1 hover:bg-background"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-display text-lg">Total:</span>
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
        )}
      </div>
    </div>
  );
}
