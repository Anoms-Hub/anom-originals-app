import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Copy, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface CheckoutProps {
  cartItems: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  total: number;
}

export default function Checkout() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'info' | 'payment' | 'confirmation'>('info');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cashAppHandle: '', // e.g., $anomoriginals
  });
  const [orderId, setOrderId] = useState<string>('');
  const [cashAppLink, setCashAppLink] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get cart from localStorage
  const cartData = typeof window !== 'undefined' ? localStorage.getItem('anom-cart') : null;
  const cartItems = cartData ? JSON.parse(cartData) : [];
  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const createCashAppOrderMutation = trpc.shop.createCashAppOrder.useMutation();
  const completeCashAppOrderMutation = trpc.shop.completeCashAppOrder.useMutation();

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createCashAppOrderMutation.mutateAsync({
        items: cartItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
        })),
        userEmail: formData.email,
        userName: formData.name,
        cashAppHandle: '$anomoriginals', // Your Cash App handle
      });

      setOrderId(result.orderId);
      setCashAppLink(result.cashAppLink);
      setStep('payment');
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentConfirm = async () => {
    setIsLoading(true);

    try {
      await completeCashAppOrderMutation.mutateAsync({
        orderId,
        transactionReference: formData.cashAppHandle,
      });

      setStep('confirmation');
      // Clear cart
      localStorage.removeItem('anom-cart');
    } catch (error) {
      console.error('Failed to confirm payment:', error);
      alert('Failed to confirm payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cashAppLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container py-12 max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-display text-5xl mb-4 glow-cyan">CHECKOUT</h1>
          <p className="text-muted-foreground">Secure payment via Cash App</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-12">
          <div className={`flex-1 text-center pb-4 border-b-2 ${step === 'info' ? 'border-primary' : 'border-border'}`}>
            <div className={`text-sm font-bold ${step === 'info' ? 'text-primary' : 'text-muted-foreground'}`}>
              1. YOUR INFO
            </div>
          </div>
          <div className={`flex-1 text-center pb-4 border-b-2 ${step === 'payment' ? 'border-primary' : 'border-border'}`}>
            <div className={`text-sm font-bold ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              2. PAYMENT
            </div>
          </div>
          <div className={`flex-1 text-center pb-4 border-b-2 ${step === 'confirmation' ? 'border-primary' : 'border-border'}`}>
            <div className={`text-sm font-bold ${step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}`}>
              3. CONFIRMATION
            </div>
          </div>
        </div>

        {/* Step 1: Customer Info */}
        {step === 'info' && (
          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="font-display text-2xl mb-6 glow-cyan">YOUR INFORMATION</h2>
            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-input border-border focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-input border-border focus:border-primary"
                />
              </div>

              {/* Order Summary */}
              <div className="border-t border-border pt-6">
                <h3 className="font-bold mb-4">ORDER SUMMARY</h3>
                <div className="space-y-2 mb-4">
                  {cartItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.productName} x{item.quantity}</span>
                      <span>${(item.price * item.quantity / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-border pt-4">
                  <span>TOTAL:</span>
                  <span className="text-primary">${(total / 100).toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Continue to Payment'
                )}
              </Button>
            </form>
          </Card>
        )}

        {/* Step 2: Cash App Payment */}
        {step === 'payment' && (
          <Card className="bg-card border-border p-8 mb-8">
            <h2 className="font-display text-2xl mb-6 glow-cyan">CASH APP PAYMENT</h2>

            <div className="bg-green-900/20 border border-green-600 rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">
                Send payment to Anom Originals via Cash App. Click the button below to open Cash App or copy the link.
              </p>

              <div className="space-y-4">
                {/* Cash App Link */}
                <div>
                  <label className="block text-sm font-bold mb-2">Cash App Link</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={cashAppLink}
                      readOnly
                      className="bg-input border-border"
                    />
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                      className="border-border"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-bold mb-2">Amount to Send</label>
                  <div className="text-3xl font-bold text-primary">
                    ${(total / 100).toFixed(2)}
                  </div>
                </div>

                {/* Order ID */}
                <div>
                  <label className="block text-sm font-bold mb-2">Order ID (include in note)</label>
                  <Input
                    type="text"
                    value={orderId}
                    readOnly
                    className="bg-input border-border font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <h3 className="font-bold mb-3">PAYMENT INSTRUCTIONS:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Open Cash App on your phone</li>
                <li>Click the link above or search for $anomoriginals</li>
                <li>Enter amount: ${(total / 100).toFixed(2)}</li>
                <li>In the note, paste your Order ID: {orderId}</li>
                <li>Send payment</li>
                <li>Return here and click "Payment Sent" to confirm</li>
              </ol>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handlePaymentConfirm}
                disabled={isLoading}
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Confirming...
                  </>
                ) : (
                  'I\'ve Sent Payment'
                )}
              </Button>

              <Button
                onClick={() => setStep('info')}
                variant="outline"
                className="w-full border-border"
              >
                Back
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && (
          <Card className="bg-card border-border p-8 mb-8 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="font-display text-3xl mb-2 glow-cyan">PAYMENT RECEIVED!</h2>
              <p className="text-muted-foreground">Thank you for your order</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-bold mb-3">ORDER DETAILS:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="text-primary font-bold">${(total / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-500">Payment Confirmed</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Your order has been received and will be processed shortly. You'll receive an email confirmation with tracking information once your items ship.
            </p>

            <Button
              onClick={() => setLocation('/')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
            >
              Return to Home
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
