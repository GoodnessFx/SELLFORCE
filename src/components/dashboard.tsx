import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  AlertTriangle,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Star,
  Target,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Footer } from './footer';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface DashboardProps {
  user: User;
}

const salesData = [
  { name: 'Mon', sales: 1200, orders: 45 },
  { name: 'Tue', sales: 1900, orders: 52 },
  { name: 'Wed', sales: 800, orders: 35 },
  { name: 'Thu', sales: 2200, orders: 68 },
  { name: 'Fri', sales: 2800, orders: 78 },
  { name: 'Sat', sales: 3200, orders: 85 },
  { name: 'Sun', sales: 2100, orders: 62 }
];

const categoryData = [
  { name: 'Beverages', value: 35, color: '#3B82F6' },
  { name: 'Snacks', value: 25, color: '#10B981' },
  { name: 'Electronics', value: 20, color: '#F59E0B' },
  { name: 'Other', value: 20, color: '#EF4444' }
];

const topProducts = [
  { name: 'Coca-Cola 330ml', sales: 156, revenue: 468, trend: 'up' },
  { name: 'Samsung Galaxy Buds', sales: 45, revenue: 2250, trend: 'up' },
  { name: 'Pringles Original', sales: 89, revenue: 267, trend: 'down' },
  { name: 'iPhone Charger', sales: 32, revenue: 960, trend: 'up' },
  { name: 'Energy Drink', sales: 78, revenue: 390, trend: 'up' }
];

const recentTransactions = [
  { id: 'TXN001', customer: 'Sarah Johnson', amount: 45.60, items: 3, time: '2 mins ago', status: 'completed' },
  { id: 'TXN002', customer: 'Mike Chen', amount: 12.30, items: 1, time: '8 mins ago', status: 'completed' },
  { id: 'TXN003', customer: 'Guest Customer', amount: 78.90, items: 5, time: '15 mins ago', status: 'completed' },
  { id: 'TXN004', customer: 'Emma Davis', amount: 23.45, items: 2, time: '28 mins ago', status: 'completed' },
  { id: 'TXN005', customer: 'John Smith', amount: 156.80, items: 8, time: '35 mins ago', status: 'refunded' }
];

export function Dashboard({ user }: DashboardProps) {
  const todaySales = 2847.50;
  const dailyGoal = 3000;
  const goalProgress = (todaySales / dailyGoal) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good morning, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with {user.businessName} today
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Quick Sale
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${todaySales.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12.5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+8.2% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,284</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+5.1% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$24,580</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>-2.1% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goal Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Daily Sales Goal</CardTitle>
              <CardDescription>Track your progress towards today's target</CardDescription>
            </div>
            <Badge variant={goalProgress >= 90 ? "default" : goalProgress >= 70 ? "secondary" : "destructive"}>
              {goalProgress.toFixed(1)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current: ${todaySales.toLocaleString()}</span>
              <span>Goal: ${dailyGoal.toLocaleString()}</span>
            </div>
            <Progress value={goalProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              ${(dailyGoal - todaySales).toLocaleString()} remaining to reach your goal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend (7 Days)</CardTitle>
            <CardDescription>Daily sales performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#salesGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performers this week</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{product.name}</span>
                      {product.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {product.sales} sold • ${product.revenue} revenue
                    </div>
                  </div>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest customer purchases</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{transaction.customer}</span>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {transaction.items} items • {transaction.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">${transaction.amount}</div>
                    <div className="text-xs text-gray-500">{transaction.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Boost Your Sales Today!</h3>
              <p className="text-blue-100 mb-4 lg:mb-0">
                Send targeted promotions to your loyal customers or launch a flash sale
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="secondary" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Loyalty Campaign
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Target className="h-4 w-4 mr-2" />
                Flash Sale
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}