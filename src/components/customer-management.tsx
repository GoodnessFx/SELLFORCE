import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Users, 
  Search, 
  Plus, 
  Star, 
  MessageSquare, 
  Gift,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  Download,
  MoreHorizontal,
  Heart,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Send,
  Target,
  Crown,
  Award
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  totalSpent: number;
  totalOrders: number;
  lastVisit: Date;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar?: string;
  joinDate: Date;
  favoriteCategory?: string;
}

interface CustomerManagementProps {
  user: User;
}

const customers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown',
    totalSpent: 2450.80,
    totalOrders: 45,
    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    loyaltyPoints: 2450,
    tier: 'Gold',
    joinDate: new Date('2023-01-15'),
    favoriteCategory: 'Electronics'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 234-5678',
    totalSpent: 1200.30,
    totalOrders: 23,
    lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    loyaltyPoints: 1200,
    tier: 'Silver',
    joinDate: new Date('2023-03-22'),
    favoriteCategory: 'Beverages'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@email.com',
    phone: '+1 (555) 345-6789',
    totalSpent: 5670.90,
    totalOrders: 78,
    lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    loyaltyPoints: 5670,
    tier: 'Platinum',
    joinDate: new Date('2022-11-08'),
    favoriteCategory: 'Snacks'
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 456-7890',
    totalSpent: 890.45,
    totalOrders: 15,
    lastVisit: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    loyaltyPoints: 890,
    tier: 'Bronze',
    joinDate: new Date('2023-05-10'),
    favoriteCategory: 'Electronics'
  },
  {
    id: '5',
    name: 'Lisa Williams',
    email: 'lisa.w@email.com',
    phone: '+1 (555) 567-8901',
    totalSpent: 3280.60,
    totalOrders: 52,
    lastVisit: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    loyaltyPoints: 3280,
    tier: 'Gold',
    joinDate: new Date('2022-12-03'),
    favoriteCategory: 'Beverages'
  }
];

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'Platinum': return 'bg-purple-100 text-purple-800';
    case 'Gold': return 'bg-yellow-100 text-yellow-800';
    case 'Silver': return 'bg-gray-100 text-gray-800';
    case 'Bronze': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTierIcon = (tier: string) => {
  switch (tier) {
    case 'Platinum': return <Crown className="h-4 w-4" />;
    case 'Gold': return <Award className="h-4 w-4" />;
    case 'Silver': return <Star className="h-4 w-4" />;
    case 'Bronze': return <Heart className="h-4 w-4" />;
    default: return <Heart className="h-4 w-4" />;
  }
};

export function CustomerManagement({ user }: CustomerManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesTier = selectedTier === 'All' || customer.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => 
    new Date().getTime() - c.lastVisit.getTime() < 30 * 24 * 60 * 60 * 1000
  ).length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

  const loyaltyStats = {
    Bronze: customers.filter(c => c.tier === 'Bronze').length,
    Silver: customers.filter(c => c.tier === 'Silver').length,
    Gold: customers.filter(c => c.tier === 'Gold').length,
    Platinum: customers.filter(c => c.tier === 'Platinum').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">
            Manage relationships and loyalty programs
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalCustomers}</div>
            <div className="text-sm text-green-600 mt-1">
              +12 new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeCustomers}</div>
            <div className="text-sm text-gray-600 mt-1">
              Last 30 days
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Total lifetime value
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Order Value</CardTitle>
            <ShoppingBag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${avgOrderValue.toFixed(2)}
            </div>
            <div className="text-sm text-green-600 mt-1">
              +5.2% vs last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loyalty Program Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Loyalty Program Overview</CardTitle>
          <CardDescription>Customer distribution across loyalty tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(loyaltyStats).map(([tier, count]) => (
              <div key={tier} className="text-center p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-center mb-2">
                  {getTierIcon(tier)}
                </div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{tier} Members</div>
                <Badge className={`mt-2 ${getTierColor(tier)}`}>
                  {tier}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customer List</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search customers by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedTier === 'All' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTier('All')}
              >
                All Tiers
              </Button>
              {['Bronze', 'Silver', 'Gold', 'Platinum'].map(tier => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTier(tier)}
                  className="hidden sm:inline-flex"
                >
                  {tier}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Customer List */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCustomers.map(customer => (
              <Card key={customer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{customer.name}</h3>
                          <Badge className={getTierColor(customer.tier)}>
                            {getTierIcon(customer.tier)}
                            <span className="ml-1">{customer.tier}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="font-medium text-gray-900">
                        ${customer.totalSpent.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {customer.totalOrders} orders
                      </div>
                      <div className="text-sm text-gray-600">
                        {customer.loyaltyPoints.toLocaleString()} points
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Gift className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Last visit: {customer.lastVisit.toLocaleDateString()}
                    </div>
                    <div>
                      Favorite: {customer.favoriteCategory}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Marketing Campaigns</CardTitle>
                  <CardDescription>Create and manage customer engagement campaigns</CardDescription>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Send className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">SMS Campaign</h3>
                    <p className="text-sm text-gray-600">Send targeted SMS to customers</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Gift className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Loyalty Rewards</h3>
                    <p className="text-sm text-gray-600">Create reward campaigns</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">Targeted Offers</h3>
                    <p className="text-sm text-gray-600">Personalized promotions</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Weekend Flash Sale</h4>
                    <p className="text-sm text-gray-600">SMS campaign to Gold & Platinum members</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                    <p className="text-sm text-gray-600 mt-1">85% open rate</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Birthday Rewards</h4>
                    <p className="text-sm text-gray-600">Automated birthday discounts</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                    <p className="text-sm text-gray-600 mt-1">12 recipients</p>
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
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <p>Customer acquisition chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Lifetime Value</CardTitle>
                <CardDescription>CLV distribution across tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <DollarSign className="h-8 w-8 mx-auto mb-2" />
                    <p>CLV analysis chart would go here</p>
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