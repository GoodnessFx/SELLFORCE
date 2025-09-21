import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Package, 
  Search, 
  Plus, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Download,
  Filter,
  BarChart3,
  Zap,
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Archive,
  Clock,
  DollarSign,
  Boxes,
  Target
} from 'lucide-react';

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
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  lastRestocked: Date;
  daysToReorder: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstock';
  velocity: 'fast' | 'medium' | 'slow';
  image?: string;
}

interface InventoryManagementProps {
  user: User;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Coca-Cola 330ml',
    sku: 'COC-330-001',
    category: 'Beverages',
    currentStock: 5,
    minStock: 20,
    maxStock: 200,
    costPrice: 2.00,
    sellingPrice: 3.00,
    supplier: 'Coca-Cola Company',
    lastRestocked: new Date('2024-01-10'),
    daysToReorder: 2,
    status: 'low-stock',
    velocity: 'fast'
  },
  {
    id: '2',
    name: 'Samsung Galaxy Buds',
    sku: 'SAM-BUD-001',
    category: 'Electronics',
    currentStock: 15,
    minStock: 5,
    maxStock: 50,
    costPrice: 120.00,
    sellingPrice: 149.99,
    supplier: 'Samsung Electronics',
    lastRestocked: new Date('2024-01-15'),
    daysToReorder: 12,
    status: 'in-stock',
    velocity: 'medium'
  },
  {
    id: '3',
    name: 'Pringles Original',
    sku: 'PRI-ORI-001',
    category: 'Snacks',
    currentStock: 45,
    minStock: 10,
    maxStock: 100,
    costPrice: 2.00,
    sellingPrice: 2.99,
    supplier: 'Kellogg Company',
    lastRestocked: new Date('2024-01-12'),
    daysToReorder: 7,
    status: 'in-stock',
    velocity: 'fast'
  },
  {
    id: '4',
    name: 'Energy Drink 500ml',
    sku: 'ENE-DRI-500',
    category: 'Beverages',
    currentStock: 0,
    minStock: 15,
    maxStock: 150,
    costPrice: 3.00,
    sellingPrice: 4.50,
    supplier: 'Red Bull GmbH',
    lastRestocked: new Date('2024-01-05'),
    daysToReorder: 0,
    status: 'out-of-stock',
    velocity: 'fast'
  },
  {
    id: '5',
    name: 'iPhone Charger Cable',
    sku: 'IPH-CHA-001',
    category: 'Electronics',
    currentStock: 25,
    minStock: 8,
    maxStock: 40,
    costPrice: 20.00,
    sellingPrice: 29.99,
    supplier: 'Apple Inc.',
    lastRestocked: new Date('2024-01-18'),
    daysToReorder: 15,
    status: 'in-stock',
    velocity: 'medium'
  },
  {
    id: '6',
    name: 'Protein Bar Chocolate',
    sku: 'PRO-BAR-CHO',
    category: 'Snacks',
    currentStock: 78,
    minStock: 20,
    maxStock: 60,
    costPrice: 2.50,
    sellingPrice: 3.49,
    supplier: 'Quest Nutrition',
    lastRestocked: new Date('2024-01-20'),
    daysToReorder: 20,
    status: 'overstock',
    velocity: 'slow'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock': return 'bg-green-100 text-green-800';
    case 'low-stock': return 'bg-yellow-100 text-yellow-800';
    case 'out-of-stock': return 'bg-red-100 text-red-800';
    case 'overstock': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getVelocityColor = (velocity: string) => {
  switch (velocity) {
    case 'fast': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'slow': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getVelocityIcon = (velocity: string) => {
  switch (velocity) {
    case 'fast': return <TrendingUp className="h-3 w-3" />;
    case 'medium': return <Target className="h-3 w-3" />;
    case 'slow': return <TrendingDown className="h-3 w-3" />;
    default: return <Target className="h-3 w-3" />;
  }
};

export function InventoryManagement({ user }: InventoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const statuses = ['All', 'in-stock', 'low-stock', 'out-of-stock', 'overstock'];

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.status === 'low-stock').length;
  const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;
  const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.costPrice), 0);

  const criticalItems = products.filter(p => p.status === 'out-of-stock' || p.status === 'low-stock');
  const fastMovingItems = products.filter(p => p.velocity === 'fast');
  const slowMovingItems = products.filter(p => p.velocity === 'slow');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">
            Track stock levels and optimize inventory for {user.businessName}
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(outOfStockCount > 0 || lowStockCount > 0) && (
        <div className="space-y-3">
          {outOfStockCount > 0 && (
            <Alert className="border-l-4 border-l-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-red-900">Critical Stock Alert</p>
                    <p className="text-sm text-red-700">
                      {outOfStockCount} product{outOfStockCount > 1 ? 's are' : ' is'} out of stock
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    View Items
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          {lowStockCount > 0 && (
            <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-yellow-900">Low Stock Warning</p>
                    <p className="text-sm text-yellow-700">
                      {lowStockCount} product{lowStockCount > 1 ? 's need' : ' needs'} restocking soon
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700">
                    Auto Reorder
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
            <div className="text-sm text-gray-600 mt-1">
              Across {categories.length - 1} categories
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{lowStockCount + outOfStockCount}</div>
            <div className="text-sm text-red-600 mt-1">
              Requires attention
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 mt-1">
              Total stock value
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fast Moving</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{fastMovingItems.length}</div>
            <div className="text-sm text-gray-600 mt-1">
              High velocity items
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">All Products</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="reorder">Auto Reorder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select 
                className="px-3 py-2 border rounded-md text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select 
                className="px-3 py-2 border rounded-md text-sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'All Status' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-4 font-medium text-gray-600">Product</th>
                      <th className="text-left p-4 font-medium text-gray-600">SKU</th>
                      <th className="text-left p-4 font-medium text-gray-600">Category</th>
                      <th className="text-left p-4 font-medium text-gray-600">Stock</th>
                      <th className="text-left p-4 font-medium text-gray-600">Status</th>
                      <th className="text-left p-4 font-medium text-gray-600">Velocity</th>
                      <th className="text-left p-4 font-medium text-gray-600">Value</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="h-5 w-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-600">{product.supplier}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">{product.sku}</td>
                        <td className="p-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {product.currentStock} / {product.maxStock}
                            </div>
                            <Progress 
                              value={(product.currentStock / product.maxStock) * 100} 
                              className="h-2 w-20"
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusColor(product.status)}>
                            {product.status.replace('-', ' ')}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getVelocityColor(product.velocity)}>
                            {getVelocityIcon(product.velocity)}
                            <span className="ml-1">{product.velocity}</span>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            <div className="font-medium">
                              ${(product.currentStock * product.costPrice).toFixed(2)}
                            </div>
                            <div className="text-gray-600">
                              @${product.costPrice.toFixed(2)}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Critical Stock Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  Critical Stock Items
                </CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalItems.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Current: {product.currentStock} | Min: {product.minStock}
                        </p>
                        <p className="text-sm text-gray-600">
                          Supplier: {product.supplier}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Reorder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Slow Moving Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="h-5 w-5 mr-2 text-orange-600" />
                  Slow Moving Items
                </CardTitle>
                <CardDescription>Items with low turnover rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {slowMovingItems.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <Badge className={getVelocityColor(product.velocity)}>
                            <TrendingDown className="h-3 w-3 mr-1" />
                            {product.velocity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Stock: {product.currentStock} units
                        </p>
                        <p className="text-sm text-gray-600">
                          Last restocked: {product.lastRestocked.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Promote
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reorder" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Auto Reorder Settings</CardTitle>
                  <CardDescription>Configure automatic restocking rules</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Enable Auto Reorder
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Reorder Rules</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Fast-Moving Items</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Reorder when stock falls below 25% of max capacity
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Medium-Moving Items</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Reorder when stock falls below 20% of max capacity
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900">Slow-Moving Items</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Reorder when stock falls below 15% of max capacity
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Pending Reorders</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Coca-Cola 330ml</h4>
                          <p className="text-sm text-gray-600">Quantity: 100 units</p>
                          <p className="text-sm text-gray-600">Supplier: Coca-Cola Company</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 mb-2">Pending</Badge>
                          <p className="text-sm text-gray-600">$200.00</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Energy Drink 500ml</h4>
                          <p className="text-sm text-gray-600">Quantity: 75 units</p>
                          <p className="text-sm text-gray-600">Supplier: Red Bull GmbH</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-2">Ordered</Badge>
                          <p className="text-sm text-gray-600">$225.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Turnover</CardTitle>
                <CardDescription>Product turnover rate analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                    <p>Inventory turnover chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stock Value Trends</CardTitle>
                <CardDescription>Inventory value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2" />
                    <p>Stock value trend chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}