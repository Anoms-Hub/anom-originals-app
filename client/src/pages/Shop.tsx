import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Filter } from 'lucide-react';
import { PRODUCTS } from '@/../../server/products';

export default function Shop() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<Map<string, { quantity: number; color?: string; size?: string }>>(new Map());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'apparel' | 'drinkware'>('all');
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (productId: string, quantity: number = 1, color?: string, size?: string) => {
    const key = `${productId}-${color}-${size}`;
    const existing = cart.get(key);
    const newCart = new Map(cart);
    newCart.set(key, {
      quantity: (existing?.quantity || 0) + quantity,
      color,
      size,
    });
    setCart(newCart);
  };

  const removeFromCart = (key: string) => {
    const newCart = new Map(cart);
    newCart.delete(key);
    setCart(newCart);
  };

  const cartTotal = Array.from(cart.entries()).reduce((total, [key, item]) => {
    const [productId] = key.split('-');
    const product = PRODUCTS.find(p => p.id === productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

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
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">FILTERS</h3>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setSelectedCategory('apparel')}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === 'apparel'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary'
                  }`}
                >
                  Apparel
                </button>
                <button
                  onClick={() => setSelectedCategory('drinkware')}
                  className={`w-full text-left px-4 py-2 rounded transition ${
                    selectedCategory === 'drinkware'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border hover:border-primary'
                  }`}
                >
                  Drinkware
                </button>
              </div>

              {/* Cart Summary */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-bold mb-4">CART ({cart.size})</h4>
                {cart.size > 0 ? (
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(cartTotal / 100).toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={() => setShowCart(!showCart)}
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {showCart ? 'Hide Cart' : 'View Cart'}
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Your cart is empty</p>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="bg-card border-border hover:border-primary transition overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-xl mb-2 glow-cyan">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                    {/* Size/Color Selection */}
                    {product.sizes && (
                      <div className="mb-4">
                        <label className="text-xs font-bold mb-2 block">SIZE</label>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              className="px-3 py-1 text-xs border border-border rounded hover:border-primary transition"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {product.colors && (
                      <div className="mb-4">
                        <label className="text-xs font-bold mb-2 block">COLOR</label>
                        <div className="flex flex-wrap gap-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              className="px-3 py-1 text-xs border border-border rounded hover:border-primary transition"
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${(product.price / 100).toFixed(2)}
                      </span>
                      <Button
                        onClick={() => addToCart(product.id, 1, product.colors?.[0], product.sizes?.[0])}
                        className="bg-primary text-primary-foreground hover:bg-primary/80"
                        size="sm"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Drawer */}
        {showCart && cart.size > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6 max-h-96 overflow-y-auto">
            <h3 className="font-display text-2xl mb-4 glow-cyan">YOUR CART</h3>
            <div className="space-y-4 mb-6">
              {Array.from(cart.entries()).map(([key, item]) => {
                const [productId] = key.split('-');
                const product = PRODUCTS.find(p => p.id === productId);
                return (
                  <div key={key} className="flex justify-between items-center border-b border-border pb-4">
                    <div>
                      <p className="font-bold">{product?.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>${((product?.price || 0) * item.quantity / 100).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(key)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>TOTAL:</span>
                <span className="text-primary">${(cartTotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  const cartData = Array.from(cart.entries()).map(([key, item]) => {
                    const [productId] = key.split('-');
                    const product = PRODUCTS.find(p => p.id === productId);
                    return {
                      productId,
                      productName: product?.name || 'Unknown',
                      quantity: item.quantity,
                      price: product?.price || 0,
                      color: item.color,
                      size: item.size,
                    };
                  });
                  localStorage.setItem('anom-cart', JSON.stringify(cartData));
                  setLocation('/checkout');
                }}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Cash App
              </Button>
              <Button
                onClick={() => {
                  setCart(new Map());
                  setShowCart(false);
                }}
                className="bg-muted text-foreground hover:bg-muted/80"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
