import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { toast } from "sonner@2.0.3";
import { 
  User,
  Camera,
  Edit,
  Save,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Building2,
  Award,
  Star,
  Target,
  TrendingUp,
  Activity,
  Crown,
  Trophy,
  Upload,
  Download,
  Share2,
  Settings,
  LogOut
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface ProfileProps {
  user: User;
  onClose?: () => void;
}

export function Profile({ user, onClose }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    bio: 'Passionate business owner focused on providing excellent customer service and growing my local community.',
    joinDate: 'January 2023'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const achievements = [
    { id: 1, title: 'First Sale', description: 'Made your first sale', date: '2023-01-15', icon: Trophy },
    { id: 2, title: 'Customer Champion', description: '100 satisfied customers', date: '2023-03-22', icon: Star },
    { id: 3, title: 'Sales Milestone', description: '$10,000 in total sales', date: '2023-06-18', icon: Target },
    { id: 4, title: 'Community Member', description: 'Joined SELLFORCE Community', date: '2023-01-20', icon: Award },
  ];

  const stats = [
    { label: 'Total Sales', value: '$24,580', change: '+15.2%', trend: 'up' },
    { label: 'Customers', value: '1,284', change: '+8.1%', trend: 'up' },
    { label: 'Orders', value: '2,156', change: '+12.5%', trend: 'up' },
    { label: 'Rating', value: '4.9/5', change: '148 reviews', trend: 'neutral' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and business profile
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                {/* Basic Info */}
                <div className="text-center space-y-1">
                  <h2 className="text-xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">{user.businessName}</p>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Crown className="h-3 w-3 mr-1" />
                    Gold Member
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="w-full space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {profileData.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>{user.businessType}</span>
                  </div>
                </div>

                {/* Progress to Next Level */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress to Platinum</span>
                    <span className="font-medium">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                  <p className="text-xs text-gray-500">2,700 points to go!</p>
                </div>

                {/* Quick Actions */}
                <div className="w-full space-y-2">
                  <Button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full"
                    variant={isEditing ? "secondary" : "default"}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm">Email</Label>
                    <Input 
                      id="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone" className="text-sm">Phone</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="location" className="text-sm">Location</Label>
                    <Input 
                      id="location" 
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleSave} size="sm" className="w-full mt-3">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your business metrics at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                    <div className={`text-xs mt-2 flex items-center justify-center space-x-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest business activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Completed sale of $45.60</p>
                    <p className="text-xs text-gray-600">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">New customer Sarah J. joined loyalty program</p>
                    <p className="text-xs text-gray-600">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Low stock alert: Coca-Cola 330ml</p>
                    <p className="text-xs text-gray-600">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Weekly report generated</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Achievements
              </CardTitle>
              <CardDescription>Your business milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <achievement.icon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bio/About */}
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>Tell others about yourself and your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio"
                    className="w-full p-3 border rounded-lg resize-none h-24"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Tell others about yourself and your business..."
                  />
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Bio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}