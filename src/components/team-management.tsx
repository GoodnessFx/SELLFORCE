import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { 
  Users, 
  UserPlus, 
  Search, 
  Star, 
  Award,
  Target,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  UserCheck,
  Settings,
  MoreHorizontal,
  Edit,
  Eye,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Activity,
  Crown,
  Trophy,
  Zap
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Manager' | 'Cashier' | 'Sales Associate' | 'Supervisor';
  status: 'active' | 'inactive' | 'on-break';
  hireDate: Date;
  totalSales: number;
  todaySales: number;
  todayTransactions: number;
  performance: number; // percentage
  shift: 'Morning' | 'Afternoon' | 'Night';
  hourlyRate: number;
  avatar?: string;
  achievements: string[];
  isTopPerformer?: boolean;
}

interface TeamManagementProps {
  user: User;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria.r@store.com',
    phone: '+1 (555) 111-2222',
    role: 'Manager',
    status: 'active',
    hireDate: new Date('2022-03-15'),
    totalSales: 45600.80,
    todaySales: 850.30,
    todayTransactions: 28,
    performance: 95,
    shift: 'Morning',
    hourlyRate: 18.50,
    achievements: ['Top Performer Q4', 'Customer Service Excellence', 'Sales Target Achiever'],
    isTopPerformer: true
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.w@store.com',
    phone: '+1 (555) 333-4444',
    role: 'Sales Associate',
    status: 'active',
    hireDate: new Date('2023-01-20'),
    totalSales: 28400.50,
    todaySales: 520.75,
    todayTransactions: 19,
    performance: 87,
    shift: 'Afternoon',
    hourlyRate: 15.00,
    achievements: ['New Employee of the Month', 'Quick Learner'],
    isTopPerformer: false
  },
  {
    id: '3',
    name: 'Aisha Patel',
    email: 'aisha.p@store.com',
    phone: '+1 (555) 555-6666',
    role: 'Cashier',
    status: 'on-break',
    hireDate: new Date('2022-08-10'),
    totalSales: 32100.20,
    todaySales: 380.90,
    todayTransactions: 15,
    performance: 92,
    shift: 'Morning',
    hourlyRate: 16.00,
    achievements: ['Accuracy Champion', 'Customer Favorite'],
    isTopPerformer: true
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael.c@store.com',
    phone: '+1 (555) 777-8888',
    role: 'Supervisor',
    status: 'active',
    hireDate: new Date('2021-11-05'),
    totalSales: 38750.60,
    todaySales: 720.40,
    todayTransactions: 22,
    performance: 89,
    shift: 'Night',
    hourlyRate: 17.25,
    achievements: ['Leadership Excellence', 'Team Builder'],
    isTopPerformer: false
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    email: 'sarah.j@store.com',
    phone: '+1 (555) 999-0000',
    role: 'Cashier',
    status: 'inactive',
    hireDate: new Date('2023-05-12'),
    totalSales: 12800.30,
    todaySales: 0,
    todayTransactions: 0,
    performance: 78,
    shift: 'Afternoon',
    hourlyRate: 14.50,
    achievements: ['Friendly Service'],
    isTopPerformer: false
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'on-break': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Manager': return 'bg-purple-100 text-purple-800';
    case 'Supervisor': return 'bg-blue-100 text-blue-800';
    case 'Sales Associate': return 'bg-green-100 text-green-800';
    case 'Cashier': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return 'text-green-600';
  if (performance >= 80) return 'text-yellow-600';
  return 'text-red-600';
};

export function TeamManagement({ user }: TeamManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || member.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roles = ['All', ...Array.from(new Set(teamMembers.map(m => m.role)))];
  const statuses = ['All', 'active', 'inactive', 'on-break'];

  const totalMembers = teamMembers.length;
  const activeMembers = teamMembers.filter(m => m.status === 'active').length;
  const todayTotalSales = teamMembers.reduce((sum, m) => sum + m.todaySales, 0);
  const topPerformers = teamMembers.filter(m => m.isTopPerformer).length;
  const avgPerformance = teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length;

  const topPerformerOfWeek = teamMembers.reduce((top, member) => 
    member.performance > top.performance ? member : top
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">
            Manage staff performance and schedule for {user.businessName}
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
            <div className="text-sm text-green-600 mt-1">
              {activeMembers} currently active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${todayTotalSales.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              By team members
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Performance</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPerformanceColor(avgPerformance)}`}>
              {avgPerformance.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Team average
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{topPerformers}</div>
            <div className="text-sm text-gray-600 mt-1">
              Exceeding targets
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performer Highlight */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Employee of the Week</h3>
                <p className="text-yellow-100 mt-1">
                  {topPerformerOfWeek.name} - {topPerformerOfWeek.performance}% Performance
                </p>
                <p className="text-yellow-100 text-sm">
                  ${topPerformerOfWeek.todaySales} in sales today
                </p>
              </div>
            </div>
            <Avatar className="h-16 w-16 border-4 border-white/30">
              <AvatarImage src={topPerformerOfWeek.avatar} />
              <AvatarFallback className="bg-white/20 text-white text-xl">
                {topPerformerOfWeek.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select 
                className="px-3 py-2 border rounded-md text-sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>
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
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMembers.map(member => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {member.isTopPerformer && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{member.name}</h3>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getRoleColor(member.role)} variant="outline">
                            {member.role}
                          </Badge>
                          <span className="text-sm text-gray-600">{member.shift} Shift</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {member.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {member.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {/* Performance */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Performance</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </div>
                      <Progress value={member.performance} className="h-2" />
                    </div>

                    {/* Today's Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${member.todaySales.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-600">Today's Sales</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          {member.todayTransactions}
                        </div>
                        <div className="text-xs text-gray-600">Transactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">
                          ${member.hourlyRate}
                        </div>
                        <div className="text-xs text-gray-600">Hourly Rate</div>
                      </div>
                    </div>

                    {/* Achievements */}
                    {member.achievements.length > 0 && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-600 mb-2">Recent Achievements:</div>
                        <div className="flex flex-wrap gap-1">
                          {member.achievements.slice(0, 2).map((achievement, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Trophy className="h-3 w-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                          {member.achievements.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{member.achievements.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance Leaderboard</CardTitle>
                <CardDescription>Top performers this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers
                    .sort((a, b) => b.todaySales - a.todaySales)
                    .slice(0, 5)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                          {index + 1}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-gray-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.role}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">${member.todaySales.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">{member.todayTransactions} orders</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Team performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-8 w-8 mx-auto mb-2" />
                    <p>Performance analytics chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Manage team work schedules</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Edit Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center">
                    <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-blue-50 rounded text-xs">
                        <div className="font-medium">Maria R.</div>
                        <div className="text-gray-600">8AM-4PM</div>
                      </div>
                      <div className="p-2 bg-green-50 rounded text-xs">
                        <div className="font-medium">James W.</div>
                        <div className="text-gray-600">12PM-8PM</div>
                      </div>
                      <div className="p-2 bg-orange-50 rounded text-xs">
                        <div className="font-medium">Aisha P.</div>
                        <div className="text-gray-600">6AM-2PM</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Report</CardTitle>
                <CardDescription>Team productivity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                    <p>Productivity report chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Report</CardTitle>
                <CardDescription>Team attendance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p>Attendance report chart would go here</p>
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