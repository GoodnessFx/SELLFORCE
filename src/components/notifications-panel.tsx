import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { 
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Check,
  Archive,
  Settings,
  Filter,
  MoreHorizontal,
  Clock,
  User,
  Package,
  DollarSign,
  TrendingUp,
  Calendar,
  Star
} from 'lucide-react';

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

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  unreadCount: number;
}

export function NotificationsPanel({ 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDeleteNotification, 
  unreadCount 
}: NotificationsPanelProps) {
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'important'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'warning' || type === 'error') return AlertTriangle;
    if (type === 'success') return CheckCircle;
    if (category === 'sales') return DollarSign;
    if (category === 'inventory') return Package;
    if (category === 'customer') return User;
    if (category === 'financial') return TrendingUp;
    return Info;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === 'unread' && notification.read) return false;
    if (filterType === 'important' && notification.priority !== 'high') return false;
    if (selectedCategory !== 'all' && notification.category !== selectedCategory) return false;
    return true;
  });

  const handleNotificationAction = (notification: Notification) => {
    if (notification.category === 'inventory' && notification.type === 'warning') {
      toast.success('Redirecting to inventory management...');
    } else if (notification.category === 'sales') {
      toast.success('Opening sales details...');
    } else if (notification.category === 'customer') {
      toast.success('Opening customer profile...');
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex flex-col h-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="outline">
                <Settings className="h-3 w-3" />
              </Button>
              {unreadCount > 0 && (
                <Button size="sm" onClick={onMarkAllAsRead}>
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2 p-4 border-b">
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                size="sm"
                variant={filterType === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilterType('unread')}
              >
                Unread
              </Button>
              <Button
                size="sm"
                variant={filterType === 'important' ? 'default' : 'outline'}
                onClick={() => setFilterType('important')}
              >
                Important
              </Button>
            </div>
            <div className="flex-1" />
            <Button size="sm" variant="outline">
              <Filter className="h-3 w-3" />
            </Button>
          </div>

          {/* Notifications List */}
          <ScrollArea className="flex-1">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <Bell className="h-8 w-8 mb-2 text-gray-300" />
                <p className="text-sm">No notifications</p>
                <p className="text-xs">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type, notification.category);
                  const iconColors = getNotificationColor(notification.type);
                  const priorityColor = getPriorityColor(notification.priority);

                  return (
                    <div
                      key={notification.id}
                      className={`relative p-4 hover:bg-gray-50 transition-colors border-l-4 ${priorityColor} ${
                        !notification.read ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-full ${iconColors}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`font-medium text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </p>
                            <div className="flex items-center space-x-1">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => onDeleteNotification(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {notification.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimestamp(notification.timestamp)}
                              </div>
                            </div>

                            <div className="flex items-center space-x-1">
                              {!notification.read && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => onMarkAsRead(notification.id)}
                                >
                                  Mark read
                                </Button>
                              )}
                              {notification.actionable && (
                                <Button
                                  size="sm"
                                  className="h-6 px-2 text-xs"
                                  onClick={() => handleNotificationAction(notification)}
                                >
                                  View
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t bg-gray-50">
            <Button size="sm" variant="ghost" className="text-xs">
              <Archive className="h-3 w-3 mr-1" />
              Archive all
            </Button>
            <Button size="sm" variant="ghost" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Notification settings
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Sample notifications for demo
export const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Coca-Cola 330ml is running low (5 units remaining). Consider restocking soon.',
    timestamp: new Date(),
    read: false,
    category: 'inventory',
    priority: 'high',
    actionable: true
  },
  {
    id: '2',
    type: 'success',
    title: 'Daily Target Achieved',
    message: 'Congratulations! You\'ve reached today\'s sales target of $500. Keep up the great work!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    category: 'sales',
    priority: 'medium',
    actionable: true
  },
  {
    id: '3',
    type: 'info',
    title: 'New Customer Registered',
    message: 'Sarah Johnson just joined your loyalty program and earned 50 welcome points.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    category: 'customer',
    priority: 'low',
    actionable: true
  },
  {
    id: '4',
    type: 'warning',
    title: 'Payment Failed',
    message: 'A payment of $45.60 failed to process. Customer was notified via SMS.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: false,
    category: 'financial',
    priority: 'high',
    actionable: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your weekly sales report for Jan 15-21 is ready to download.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    category: 'system',
    priority: 'low',
    actionable: true
  },
  {
    id: '6',
    type: 'success',
    title: 'Inventory Restocked',
    message: 'Successfully restocked 100 units of Energy Drink 500ml from Red Bull GmbH.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
    category: 'inventory',
    priority: 'low',
    actionable: false
  }
];