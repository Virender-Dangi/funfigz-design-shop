import { useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  discount?: number;
}

export const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Creative Building Blocks Set",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      quantity: 2,
      discount: 29
    },
    {
      id: "3",
      name: "Architecture Master Set",
      price: 3999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      quantity: 1,
      discount: 33
    },
    {
      id: "7",
      name: "Space Explorer Kit",
      price: 3299,
      originalPrice: 4299,
      image: "https://images.unsplash.com/photo-1516389573391-5620a0263801?w=400&h=400&fit=crop",
      quantity: 1,
      discount: 23
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Empty Cart</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't made your choice yet...
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Check what we've got for you and get it swished!
            </p>
            <Link to="/products">
              <Button size="lg" className="w-full">
                <ArrowLeft className="w-4 h-4" />
                Back To Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/products">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{cartItems.length} items</Badge>
            <Badge variant="outline" className="text-green">
              You're saving ₹{totalSavings.toLocaleString()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover bg-muted"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <>
                          <span className="text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="text-orange">
                            {item.discount}% OFF
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-input rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <span className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green">
                    <span>Your Savings</span>
                    <span>-₹{totalSavings.toLocaleString()}</span>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add ₹{(2000 - subtotal).toLocaleString()} more for FREE shipping
                  </p>
                )}
              </div>

              <Button className="w-full mt-6" size="lg">
                Proceed to Checkout
              </Button>
              
              <Link to="/products" className="block mt-4">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green rounded-full"></div>
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue rounded-full"></div>
                    Fast Delivery
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-orange rounded-full"></div>
                    Easy Returns
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};