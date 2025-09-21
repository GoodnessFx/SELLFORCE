import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  Scan,
  CreditCard,
  Banknote,
  Smartphone,
  Trash2,
  Calculator,
  Receipt,
  User,
  Star,
  Package,
  Zap
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  barcode?: string;
  category: string;
  stock: number;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface POSTerminalProps {
  user: User;
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Coca-Cola 330ml', price: 3.00, category: 'Beverages', stock: 45, barcode: '123456789' },
  { id: '2', name: 'Pringles Original', price: 2.99, category: 'Snacks', stock: 23, barcode: '987654321' },
  { id: '3', name: 'Samsung Galaxy Buds', price: 149.99, category: 'Electronics', stock: 8, barcode: '456789123' },
  { id: '4', name: 'Energy Drink', price: 4.50, category: 'Beverages', stock: 67, barcode: '789123456' },
  { id: '5', name: 'iPhone Charger', price: 29.99, category: 'Electronics', stock: 15, barcode: '321654987' },
  { id: '6', name: 'Protein Bar', price: 3.49, category: 'Snacks', stock: 34, barcode: '654987321' },
  { id: '7', name: 'Bottled Water', price: 1.50, category: 'Beverages', stock: 89, barcode: '147258369' },
  { id: '8', name: 'Phone Case', price: 19.99, category: 'Electronics', stock: 12, barcode: '963852741' }
];

const categories = ['All', 'Beverages', 'Snacks', 'Electronics'];

export function POSTerminal({ user }: POSTerminalProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'mobile'>('cash');

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.barcode?.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          return prevCart.map(item =>
            item.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          toast.error(`Only ${product.stock} units available in stock`);
          return prevCart;
        }
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === productId) {
          const maxQuantity = sampleProducts.find(p => p.id === productId)?.stock || 0;
          if (newQuantity > maxQuantity) {
            toast.error(`Only ${maxQuantity} units available in stock`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleBarcodeScan = () => {
    const product = sampleProducts.find(p => p.barcode === barcodeInput);
    if (product) {
      addToCart(product);
      setBarcodeInput('');
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error('Product not found');
    }
  };

  const processPayment = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    // Simulate payment processing
    toast.success(`Payment of $${total.toFixed(2)} processed successfully!`);
    setCart([]);
    setCustomerPhone('');
    setBarcodeInput('');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      {/* Product Selection Area */}
      <div className="flex-1 p-6 space-y-6">
        {/* Search and Barcode */}
        <div className="space-y-4">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products by name or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button size="icon" variant="outline">
              <Scan className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Input 
              placeholder="Scan or enter barcode"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleBarcodeScan()}
              className="flex-1"
            />
            <Button onClick={handleBarcodeScan} variant="outline">
              Add
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => addToCart(product)}
            >
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant={product.stock > 10 ? "default" : "destructive"} className="text-xs">
                      {product.stock}
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart and Checkout Area */}
      <div className="w-full lg:w-96 bg-white border-l border-gray-200 flex flex-col">
        {/* Cart Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Current Sale</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 p-6 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Cart is empty</p>
              <p className="text-sm">Add products to start a sale</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Customer Info & Payment */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-6">
            {/* Customer Phone */}
            <div>
              <Label htmlFor="customer-phone" className="text-sm font-medium text-gray-700">
                Customer Phone (Optional)
              </Label>
              <div className="mt-1 flex">
                <Input 
                  id="customer-phone"
                  placeholder="Enter phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon" className="ml-2">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Payment Method
              </Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('cash')}
                  className="flex flex-col h-auto py-3"
                >
                  <Banknote className="h-4 w-4 mb-1" />
                  <span className="text-xs">Cash</span>
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('card')}
                  className="flex flex-col h-auto py-3"
                >
                  <CreditCard className="h-4 w-4 mb-1" />
                  <span className="text-xs">Card</span>
                </Button>
                <Button
                  variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPaymentMethod('mobile')}
                  className="flex flex-col h-auto py-3"
                >
                  <Smartphone className="h-4 w-4 mb-1" />
                  <span className="text-xs">Mobile</span>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={processPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                Complete Sale - ${total.toFixed(2)}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="h-4 w-4 mr-1" />
                  Calculator
                </Button>
                <Button variant="outline" size="sm">
                  <Receipt className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}