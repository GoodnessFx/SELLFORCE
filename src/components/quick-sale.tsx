import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search,
  CreditCard,
  Banknote,
  Smartphone,
  Calculator,
  Receipt,
  Zap,
  X,
  Package,
  Star,
  Clock
} from 'lucide-react';

interface QuickSaleProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuickItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

const quickItems = [
  { id: '1', name: 'Coca-Cola 330ml', price: 3.00, category: 'Beverages' },
  { id: '2', name: 'Bottled Water', price: 1.50, category: 'Beverages' },
  { id: '3', name: 'Energy Drink', price: 4.50, category: 'Beverages' },
  { id: '4', name: 'Pringles Original', price: 2.99, category: 'Snacks' },
  { id: '5', name: 'Protein Bar', price: 3.49, category: 'Snacks' },
  { id: '6', name: 'Chewing Gum', price: 1.99, category: 'Snacks' },
  { id: '7', name: 'Phone Charger', price: 29.99, category: 'Electronics' },
  { id: '8', name: 'Earphones', price: 19.99, category: 'Electronics' },
];

export function QuickSale({ isOpen, onClose }: QuickSaleProps) {
  const [cart, setCart] = useState<QuickItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile'>('cash');
  const [amountTendered, setAmountTendered] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  const filteredItems = quickItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: typeof quickItems[0]) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const change = parseFloat(amountTendered) - total;

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    if (paymentMethod === 'cash' && parseFloat(amountTendered) < total) {
      toast.error('Insufficient amount tendered');
      return;
    }

    toast.success(`Quick sale completed! Total: $${total.toFixed(2)}`);
    setCart([]);
    setAmountTendered('');
    onClose();
  };

  const clearCart = () => {
    setCart([]);
  };

  const addCustomAmount = () => {
    const amount = prompt('Enter custom amount:');
    if (amount && !isNaN(parseFloat(amount))) {
      const customItem: QuickItem = {
        id: `custom-${Date.now()}`,
        name: 'Custom Item',
        price: parseFloat(amount),
        category: 'Custom',
        quantity: 1
      };
      setCart(prevCart => [...prevCart, customItem]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            Quick Sale
          </DialogTitle>
          <DialogDescription>
            Fast checkout for walk-in customers
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex">
          {/* Products Section */}
          <div className="flex-1 pr-6 space-y-4 overflow-y-auto">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={addCustomAmount}>
                <Plus className="h-3 w-3 mr-1" />
                Custom Amount
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowCalculator(!showCalculator)}>
                <Calculator className="h-3 w-3 mr-1" />
                Calculator
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredItems.map(item => (
                <Button
                  key={item.id}
                  variant="outline"
                  onClick={() => addToCart(item)}
                  className="h-auto p-3 flex flex-col space-y-2 text-left hover:bg-blue-50"
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <Package className="h-4 w-4 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="w-80 border-l pl-6 flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Cart ({cart.length})</h3>
              {cart.length > 0 && (
                <Button size="sm" variant="outline" onClick={clearCart}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-6 w-6 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-sm font-medium w-16 text-right">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-2">
                  <Label className="text-sm">Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPaymentMethod('cash')}
                      className="flex flex-col h-auto py-2"
                    >
                      <Banknote className="h-4 w-4 mb-1" />
                      <span className="text-xs">Cash</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'card' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPaymentMethod('card')}
                      className="flex flex-col h-auto py-2"
                    >
                      <CreditCard className="h-4 w-4 mb-1" />
                      <span className="text-xs">Card</span>
                    </Button>
                    <Button
                      variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPaymentMethod('mobile')}
                      className="flex flex-col h-auto py-2"
                    >
                      <Smartphone className="h-4 w-4 mb-1" />
                      <span className="text-xs">Mobile</span>
                    </Button>
                  </div>
                </div>

                {/* Cash Payment */}
                {paymentMethod === 'cash' && (
                  <div className="space-y-2">
                    <Label htmlFor="amountTendered" className="text-sm">Amount Tendered</Label>
                    <Input
                      id="amountTendered"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amountTendered}
                      onChange={(e) => setAmountTendered(e.target.value)}
                    />
                    {amountTendered && parseFloat(amountTendered) >= total && (
                      <div className="text-sm text-green-600">
                        Change: ${change.toFixed(2)}
                      </div>
                    )}
                  </div>
                )}

                {/* Complete Sale Button */}
                <Button 
                  onClick={handleCompleteSale}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Complete Sale - ${total.toFixed(2)}
                </Button>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Receipt className="h-3 w-3 mr-1" />
                    Print Receipt
                  </Button>
                  <Button variant="outline" size="sm">
                    <Clock className="h-3 w-3 mr-1" />
                    Hold Order
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calculator Modal */}
        {showCalculator && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-64">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Calculator</CardTitle>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setShowCalculator(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input value="0" readOnly className="text-right text-lg" />
                  <div className="grid grid-cols-4 gap-2">
                    {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '0', '.', '='].map((key, index) => (
                      <Button key={index} variant="outline" size="sm" className="h-10">
                        {key}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}