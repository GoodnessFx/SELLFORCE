import React, { useState, useEffect } from 'react';
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { toast } from "sonner@2.0.3";
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart, 
  Bell, 
  Settings, 
  Menu,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Star,
  MessageSquare,
  Award,
  BookOpen,
  Zap,
  Target,
  CreditCard,
  Truck,
  UserCheck,
  AlertTriangle,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { Dashboard } from './components/dashboard';
import { FinancialIntelligence } from './components/financial-intelligence';
import { CustomerManagement } from './components/customer-management';
import { InventoryManagement } from './components/inventory-management';
import { TeamManagement } from './components/team-management';
import { CommunityHub } from './components/community-hub';
import { POSTerminal } from './components/pos-terminal';
import { Settings as SettingsComponent } from './components/settings';
import { Profile } from './components/profile';
import { QuickSale } from './components/quick-sale';
import { NotificationsPanel, sampleNotifications } from './components/notifications-panel';
import { HelpSupport } from './components/help-support';
import { Footer } from './components/footer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

const SELLFORCE_LOGO = "🚀";

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'system' | 'sales' | 'inventory' | 'customer' | 'financial';
  priority: 'low' | 'medium' | 'high';
  actionable?: boolean;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuickSale, setShowQuickSale] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Simulate user authentication
    setTimeout(() => {
      setUser({
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@mystore.com',
        businessName: 'Alex\'s Corner Store',
        businessType: 'Retail & Grocery'
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    setShowProfile(false); // Close profile when switching tabs
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-6xl mb-4">{SELLFORCE_LOGO}</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SELLFORCE</h1>
          <p className="text-gray-600">Loading your business dashboard...</p>
          <div className="mt-4 w-16 h-1 bg-blue-600 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">{SELLFORCE_LOGO}</div>
            <CardTitle>Welcome to SELLFORCE</CardTitle>
            <CardDescription>
              Your all-in-one business management super app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => toast.success("Demo mode activated!")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue with Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl">{SELLFORCE_LOGO}</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SELLFORCE</h1>
              <p className="text-sm text-gray-600">{user.businessName}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search customers, products..."
                className="pl-10 w-64"
              />
            </div>
            
            {/* Quick Sale Button */}
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 hidden md:flex"
              onClick={() => setShowQuickSale(true)}
            >
              <Zap className="h-4 w-4 mr-2" />
              Quick Sale
            </Button>
            
            {/* Notifications */}
            <NotificationsPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDeleteNotification={handleDeleteNotification}
              unreadCount={unreadNotifications}
            />
            
            {/* User Avatar with Menu */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="border-t mt-2 pt-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => {
                      setShowProfile(true);
                      setCurrentTab('profile');
                    }}
                  >
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleTabChange('settings')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleTabChange('help')}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </Button>
                  <div className="border-t my-2"></div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => toast.success('Signed out successfully')}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Button
              variant={currentTab === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('dashboard')}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button
              variant={currentTab === 'pos' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('pos')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              POS Terminal
            </Button>
            
            <Button
              variant={currentTab === 'financial' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('financial')}
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Financial Intelligence
            </Button>
            
            <Button
              variant={currentTab === 'customers' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('customers')}
            >
              <Users className="h-4 w-4 mr-2" />
              Customer Management
            </Button>
            
            <Button
              variant={currentTab === 'inventory' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('inventory')}
            >
              <Package className="h-4 w-4 mr-2" />
              Inventory Management
            </Button>
            
            <Button
              variant={currentTab === 'team' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('team')}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Team Management
            </Button>
            
            <Button
              variant={currentTab === 'community' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleTabChange('community')}
            >
              <Award className="h-4 w-4 mr-2" />
              Community Hub
            </Button>
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant={currentTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start text-gray-600"
                onClick={() => handleTabChange('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant={currentTab === 'help' ? 'default' : 'ghost'}
                className="w-full justify-start text-gray-600"
                onClick={() => handleTabChange('help')}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Help & Support
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto flex flex-col">
          <div className="flex-1">
            {currentTab === 'dashboard' && <Dashboard user={user} />}
            {currentTab === 'pos' && <POSTerminal user={user} />}
            {currentTab === 'financial' && <FinancialIntelligence user={user} />}
            {currentTab === 'customers' && <CustomerManagement user={user} />}
            {currentTab === 'inventory' && <InventoryManagement user={user} />}
            {currentTab === 'team' && <TeamManagement user={user} />}
            {currentTab === 'community' && <CommunityHub user={user} />}
            {currentTab === 'settings' && <SettingsComponent user={user} />}
            {currentTab === 'help' && <HelpSupport user={user} />}
            {showProfile && <Profile user={user} onClose={() => setShowProfile(false)} />}
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Button
            variant={currentTab === 'dashboard' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('dashboard')}
            className="flex-col h-auto py-2"
          >
            <BarChart className="h-4 w-4" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          
          <Button
            variant={currentTab === 'pos' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('pos')}
            className="flex-col h-auto py-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-xs mt-1">POS</span>
          </Button>
          
          <Button
            variant={currentTab === 'customers' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('customers')}
            className="flex-col h-auto py-2"
          >
            <Users className="h-4 w-4" />
            <span className="text-xs mt-1">Customers</span>
          </Button>
          
          <Button
            variant={currentTab === 'inventory' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleTabChange('inventory')}
            className="flex-col h-auto py-2"
          >
            <Package className="h-4 w-4" />
            <span className="text-xs mt-1">Inventory</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-col h-auto py-2"
            onClick={() => setShowQuickSale(true)}
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs mt-1">Quick Sale</span>
          </Button>
        </div>
      </div>

      {/* Quick Sale Modal */}
      <QuickSale 
        isOpen={showQuickSale} 
        onClose={() => setShowQuickSale(false)} 
      />
    </div>
  );
}