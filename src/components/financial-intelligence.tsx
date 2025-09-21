import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { Progress } from "./ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  AlertTriangle,
  Target,
  PieChart,
  BarChart3,
  Activity,
  ArrowUp,
  ArrowDown,
  Zap,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Bell
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface FinancialIntelligenceProps {
  user: User;
}

const monthlyData = [
  { month: 'Jan', revenue: 12500, expenses: 8200, profit: 4300, forecast: 13000 },
  { month: 'Feb', revenue: 15200, expenses: 9800, profit: 5400, forecast: 15500 },
  { month: 'Mar', revenue: 18900, expenses: 11200, profit: 7700, forecast: 19200 },
  { month: 'Apr', revenue: 16800, expenses: 10500, profit: 6300, forecast: 17500 },
  { month: 'May', revenue: 21500, expenses: 12800, profit: 8700, forecast: 22000 },
  { month: 'Jun', revenue: 24300, expenses: 14200, profit: 10100, forecast: 25000 },
  { month: 'Jul', revenue: 26800, expenses: 15600, profit: 11200, forecast: 27500 },
  { month: 'Aug', revenue: 25200, expenses: 14800, profit: 10400, forecast: 26000 },
  { month: 'Sep', revenue: 28900, expenses: 16200, profit: 12700, forecast: 29500 },
  { month: 'Oct', revenue: 31200, expenses: 17500, profit: 13700, forecast: 32000 },
  { month: 'Nov', revenue: 29800, expenses: 16800, profit: 13000, forecast: 30500 },
  { month: 'Dec', revenue: 35400, expenses: 19200, profit: 16200, forecast: 36000 }
];

const expenseBreakdown = [
  { category: 'Inventory', amount: 12500, percentage: 45, color: '#3B82F6' },
  { category: 'Rent & Utilities', amount: 3200, percentage: 12, color: '#10B981' },
  { category: 'Staff Salaries', amount: 5800, percentage: 21, color: '#F59E0B' },
  { category: 'Marketing', amount: 1800, percentage: 6, color: '#EF4444' },
  { category: 'Equipment', amount: 2200, percentage: 8, color: '#8B5CF6' },
  { category: 'Other', amount: 2000, percentage: 8, color: '#6B7280' }
];

const cashFlowData = [
  { date: '1', inflow: 2400, outflow: 1800 },
  { date: '5', inflow: 1800, outflow: 2200 },
  { date: '10', inflow: 3200, outflow: 1600 },
  { date: '15', inflow: 2800, outflow: 2400 },
  { date: '20', inflow: 3600, outflow: 2000 },
  { date: '25', inflow: 2200, outflow: 2800 },
  { date: '30', inflow: 4200, outflow: 1900 }
];

const alerts = [
  {
    id: '1',
    type: 'warning',
    title: 'Cash Flow Alert',
    message: 'Expected cash shortage in 15 days. Consider accelerating receivables.',
    severity: 'high',
    action: 'View Details'
  },
  {
    id: '2',
    type: 'info',
    title: 'Profit Margin Decline',
    message: 'Profit margin decreased by 2.3% compared to last month.',
    severity: 'medium',
    action: 'Analyze Costs'
  },
  {
    id: '3',
    type: 'success',
    title: 'Revenue Target Achieved',
    message: 'Monthly revenue target of $25,000 exceeded by 15.6%.',
    severity: 'low',
    action: 'View Report'
  }
];

export function FinancialIntelligence({ user }: FinancialIntelligenceProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [showForecast, setShowForecast] = useState(true);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const profitGrowth = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit) * 100;
  const profitMargin = (currentMonth.profit / currentMonth.revenue) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Intelligence</h1>
          <p className="text-gray-600 mt-1">
            Real-time insights and forecasting for {user.businessName}
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} className={`border-l-4 ${
            alert.severity === 'high' ? 'border-l-red-500 bg-red-50' :
            alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-50' :
            'border-l-green-500 bg-green-50'
          }`}>
            <AlertTriangle className={`h-4 w-4 ${
              alert.severity === 'high' ? 'text-red-600' :
              alert.severity === 'medium' ? 'text-yellow-600' :
              'text-green-600'
            }`} />
            <AlertDescription>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{alert.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                </div>
                <Button size="sm" variant="outline" className="ml-2">
                  {alert.action}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${currentMonth.revenue.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm mt-1 ${
              revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {revenueGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(revenueGrowth).toFixed(1)}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${currentMonth.profit.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm mt-1 ${
              profitGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {profitGrowth >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(profitGrowth).toFixed(1)}% vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Profit Margin</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {profitMargin.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Industry avg: 15.2%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${currentMonth.expenses.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {((currentMonth.expenses / currentMonth.revenue) * 100).toFixed(1)}% of revenue
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profit-loss">P&L Analysis</TabsTrigger>
          <TabsTrigger value="expenses">Expense Breakdown</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue vs Forecast */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue & Forecast</CardTitle>
                    <CardDescription>Actual vs predicted revenue (12 months)</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowForecast(!showForecast)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showForecast ? 'Hide' : 'Show'} Forecast
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="Actual Revenue"
                    />
                    {showForecast && (
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Forecast"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Profit Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
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
                      dataKey="profit" 
                      stroke="#10B981" 
                      fillOpacity={1} 
                      fill="url(#profitGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profit & Loss Statement</CardTitle>
              <CardDescription>Detailed P&L breakdown for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  <Bar dataKey="profit" fill="#10B981" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
                <CardDescription>Breakdown of monthly expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Detailed breakdown with percentages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseBreakdown.map((expense, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: expense.color }}
                        />
                        <span className="font-medium text-gray-900">{expense.category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${expense.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{expense.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={expense.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Analysis</CardTitle>
              <CardDescription>Daily cash inflow vs outflow for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" fontSize={12} />
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
                    dataKey="inflow" 
                    stackId="1"
                    stroke="#10B981" 
                    fill="url(#inflowGradient)"
                    name="Cash Inflow"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outflow" 
                    stackId="2"
                    stroke="#EF4444" 
                    fill="url(#outflowGradient)"
                    name="Cash Outflow"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">AI Financial Insights</h3>
                <p className="text-blue-100 mb-4">
                  Get personalized recommendations to improve your financial performance
                </p>
                <Button variant="secondary" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Get AI Insights
                </Button>
              </div>
              <Activity className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Set Financial Goals</h3>
                <p className="text-green-100 mb-4">
                  Create targets and track your progress towards financial milestones
                </p>
                <Button variant="secondary" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Set Goals
                </Button>
              </div>
              <Target className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}