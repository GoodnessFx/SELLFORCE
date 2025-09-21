import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Users, 
  Award, 
  BookOpen, 
  Network,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Play,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  ExternalLink,
  Crown,
  Gift,
  Zap,
  Handshake,
  Building,
  DollarSign,
  Truck,
  Phone,
  Wifi,
  CreditCard,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface CommunityMember {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  location: string;
  memberSince: Date;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  points: number;
  achievements: string[];
  avatar?: string;
  isOnline: boolean;
}

interface BusinessPartner {
  id: string;
  name: string;
  category: 'Vendor' | 'Bank' | 'Logistics' | 'Telco' | 'Payment';
  description: string;
  logo?: string;
  rating: number;
  partnership: 'Preferred' | 'Standard' | 'New';
}

interface LearningContent {
  id: string;
  title: string;
  type: 'video' | 'article' | 'webinar';
  duration: string;
  instructor: string;
  rating: number;
  thumbnail?: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface CommunityHubProps {
  user: User;
}

const communityMembers: CommunityMember[] = [
  {
    id: '1',
    name: 'David Kim',
    businessName: 'Kim\'s Electronics',
    businessType: 'Electronics Store',
    location: 'Los Angeles, CA',
    memberSince: new Date('2022-01-15'),
    level: 'Platinum',
    points: 12500,
    achievements: ['Top Seller Q4', 'Community Helper', 'Innovation Award'],
    isOnline: true
  },
  {
    id: '2',
    name: 'Lisa Chen',
    businessName: 'Fresh Market Cafe',
    businessType: 'Restaurant',
    location: 'New York, NY',
    memberSince: new Date('2022-03-22'),
    level: 'Gold',
    points: 8750,
    achievements: ['Customer Service Excellence', 'Growth Champion'],
    isOnline: false
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    businessName: 'Hassan Convenience',
    businessType: 'Convenience Store',
    location: 'Chicago, IL',
    memberSince: new Date('2021-11-08'),
    level: 'Diamond',
    points: 18900,
    achievements: ['Community Leader', 'Mentor', 'Sales Master', 'Tech Innovator'],
    isOnline: true
  }
];

const businessPartners: BusinessPartner[] = [
  {
    id: '1',
    name: 'QuickPay Solutions',
    category: 'Payment',
    description: 'Advanced payment processing with lowest fees',
    rating: 4.8,
    partnership: 'Preferred'
  },
  {
    id: '2',
    name: 'FastTrack Delivery',
    category: 'Logistics',
    description: 'Same-day delivery service for your customers',
    rating: 4.6,
    partnership: 'Preferred'
  },
  {
    id: '3',
    name: 'Business Bank Pro',
    category: 'Bank',
    description: 'Microfinance and business loans for growth',
    rating: 4.7,
    partnership: 'Standard'
  },
  {
    id: '4',
    name: 'ConnectTel Services',
    category: 'Telco',
    description: 'Airtime and data reseller program',
    rating: 4.5,
    partnership: 'New'
  },
  {
    id: '5',
    name: 'Global Suppliers Network',
    category: 'Vendor',
    description: 'Direct access to wholesale suppliers',
    rating: 4.9,
    partnership: 'Preferred'
  }
];

const learningContent: LearningContent[] = [
  {
    id: '1',
    title: 'Maximizing Customer Retention',
    type: 'video',
    duration: '15 min',
    instructor: 'Sarah Martinez',
    rating: 4.8,
    category: 'Customer Management',
    level: 'Intermediate'
  },
  {
    id: '2',
    title: 'Inventory Optimization Strategies',
    type: 'webinar',
    duration: '45 min',
    instructor: 'Dr. Michael Chen',
    rating: 4.9,
    category: 'Operations',
    level: 'Advanced'
  },
  {
    id: '3',
    title: 'Digital Marketing for Small Business',
    type: 'video',
    duration: '20 min',
    instructor: 'Emily Rodriguez',
    rating: 4.7,
    category: 'Marketing',
    level: 'Beginner'
  },
  {
    id: '4',
    title: 'Financial Planning Fundamentals',
    type: 'article',
    duration: '10 min',
    instructor: 'James Wilson',
    rating: 4.6,
    category: 'Finance',
    level: 'Beginner'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Diamond': return 'bg-cyan-100 text-cyan-800';
    case 'Platinum': return 'bg-purple-100 text-purple-800';
    case 'Gold': return 'bg-yellow-100 text-yellow-800';
    case 'Silver': return 'bg-gray-100 text-gray-800';
    case 'Bronze': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'Diamond': return <Star className="h-4 w-4" />;
    case 'Platinum': return <Crown className="h-4 w-4" />;
    case 'Gold': return <Award className="h-4 w-4" />;
    case 'Silver': return <Trophy className="h-4 w-4" />;
    case 'Bronze': return <Target className="h-4 w-4" />;
    default: return <Star className="h-4 w-4" />;
  }
};

const getPartnershipColor = (partnership: string) => {
  switch (partnership) {
    case 'Preferred': return 'bg-green-100 text-green-800';
    case 'Standard': return 'bg-blue-100 text-blue-800';
    case 'New': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Payment': return <CreditCard className="h-5 w-5" />;
    case 'Logistics': return <Truck className="h-5 w-5" />;
    case 'Bank': return <Building className="h-5 w-5" />;
    case 'Telco': return <Phone className="h-5 w-5" />;
    case 'Vendor': return <Handshake className="h-5 w-5" />;
    default: return <Building className="h-5 w-5" />;
  }
};

export function CommunityHub({ user }: CommunityHubProps) {
  const [activeTab, setActiveTab] = useState('community');

  const userLevel = 'Gold';
  const userPoints = 8950;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600 mt-1">
            Connect, learn, and grow with the SELLFORCE community
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Badge className={getLevelColor(userLevel)}>
              {getLevelIcon(userLevel)}
              <span className="ml-1">{userLevel} Member</span>
            </Badge>
            <div className="text-sm text-gray-600">
              {userPoints.toLocaleString()} points
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Community Rank</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">#47</div>
            <div className="text-sm text-green-600 mt-1">
              +12 this week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Learning Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600 mt-1">
              Courses completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Network Connections</CardTitle>
            <Network className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">84</div>
            <div className="text-sm text-gray-600 mt-1">
              Business connections
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Partner Benefits</CardTitle>
            <Gift className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$2,450</div>
            <div className="text-sm text-green-600 mt-1">
              Savings this year
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="learning">Business School</TabsTrigger>
          <TabsTrigger value="partners">B2B Partners</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Community Feed */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Feed</CardTitle>
                  <CardDescription>Latest updates from your network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-purple-600 text-white">AH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Ahmed Hassan</span>
                        <Badge className={getLevelColor('Diamond')}>
                          {getLevelIcon('Diamond')}
                          <span className="ml-1">Diamond</span>
                        </Badge>
                        <span className="text-sm text-gray-600">2 hours ago</span>
                      </div>
                      <p className="text-gray-700 mt-2">
                        Just hit $50K in monthly sales! 🎉 Thanks to the inventory optimization tips from last week's webinar. 
                        The auto-reorder feature in SELLFORCE has been a game changer.
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Button size="sm" variant="ghost">
                          <Heart className="h-4 w-4 mr-1" />
                          24
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          8
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-green-600 text-white">LC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Lisa Chen</span>
                        <Badge className={getLevelColor('Gold')}>
                          {getLevelIcon('Gold')}
                          <span className="ml-1">Gold</span>
                        </Badge>
                        <span className="text-sm text-gray-600">4 hours ago</span>
                      </div>
                      <p className="text-gray-700 mt-2">
                        Looking for advice on setting up delivery partnerships. 
                        Has anyone worked with local delivery services? What should I look for?
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Button size="sm" variant="ghost">
                          <Heart className="h-4 w-4 mr-1" />
                          12
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          15
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-blue-900">SELLFORCE Team</span>
                        <Badge className="bg-blue-100 text-blue-800">Official</Badge>
                        <span className="text-sm text-blue-700">6 hours ago</span>
                      </div>
                      <p className="text-blue-800 mt-2">
                        🚀 New Feature Alert: AI-powered customer insights now available! 
                        Get personalized recommendations for customer retention and upselling.
                      </p>
                      <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Members */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Community Members</CardTitle>
                  <CardDescription>Most active members this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityMembers.map((member, index) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-blue-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {member.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{member.name}</span>
                          <Badge className={`${getLevelColor(member.level)} text-xs`}>
                            {member.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{member.businessName}</p>
                        <p className="text-xs text-gray-500">{member.points.toLocaleString()} points</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connect
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-900">Weekly Business Webinar</span>
                    </div>
                    <p className="text-sm text-green-700">Tomorrow, 2:00 PM</p>
                    <p className="text-sm text-green-600">Topic: Customer Loyalty Programs</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-900">Regional Meetup</span>
                    </div>
                    <p className="text-sm text-purple-700">Friday, 6:00 PM</p>
                    <p className="text-sm text-purple-600">Los Angeles Community Center</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SELLFORCE Business School</CardTitle>
                  <CardDescription>Master the art of retail business with expert-led courses</CardDescription>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Courses
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {learningContent.map(content => (
                  <Card key={content.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          {content.type === 'video' ? (
                            <Play className="h-8 w-8 text-blue-600" />
                          ) : content.type === 'webinar' ? (
                            <Users className="h-8 w-8 text-blue-600" />
                          ) : (
                            <BookOpen className="h-8 w-8 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{content.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {content.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">By {content.instructor}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {content.duration}
                            </div>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-500" />
                              {content.rating}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {content.category}
                            </Badge>
                          </div>
                          <Button size="sm" className="mt-3 w-full">
                            {content.type === 'video' ? 'Watch Now' : 
                             content.type === 'webinar' ? 'Join Webinar' : 'Read Article'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Track your business education journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">12</div>
                  <div className="text-sm text-green-700">Courses Completed</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">3</div>
                  <div className="text-sm text-blue-700">Certificates Earned</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">24</div>
                  <div className="text-sm text-purple-700">Hours of Learning</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>B2B Partner Network</CardTitle>
              <CardDescription>Exclusive partnerships to grow your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {businessPartners.map(partner => (
                  <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(partner.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{partner.name}</h3>
                            <Badge className={getPartnershipColor(partner.partnership)}>
                              {partner.partnership}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{partner.description}</p>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{partner.rating}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {partner.category}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              Connect
                            </Button>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partnership Benefits</CardTitle>
              <CardDescription>Savings and benefits from our partner network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-green-900">$2,450</div>
                  <div className="text-sm text-green-700">Total Savings</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-blue-900">1.8%</div>
                  <div className="text-sm text-blue-700">Payment Fees</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Truck className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-purple-900">Free</div>
                  <div className="text-sm text-purple-700">Local Delivery</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Building className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-orange-900">5.2%</div>
                  <div className="text-sm text-orange-700">Loan Interest</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Sellers This Month</CardTitle>
                <CardDescription>Leading performers in the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communityMembers
                    .sort((a, b) => b.points - a.points)
                    .map((member, index) => (
                      <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-orange-500' : 'bg-blue-600'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar>
                          <AvatarFallback className="bg-gray-600 text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{member.name}</span>
                            <Badge className={getLevelColor(member.level)}>
                              {getLevelIcon(member.level)}
                              <span className="ml-1">{member.level}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{member.businessName}</p>
                          <p className="text-sm text-gray-500">{member.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{member.points.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">points</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Leaders</CardTitle>
                <CardDescription>Top performers in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg">
                    <Crown className="h-8 w-8 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Regional Champion</h3>
                    <p className="text-yellow-100">Ahmed Hassan</p>
                    <p className="text-yellow-100 text-sm">Hassan Convenience - Chicago, IL</p>
                    <div className="text-2xl font-bold mt-2">18,900 points</div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-3">Your Regional Rank</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-blue-900">#47</div>
                        <div className="text-sm text-blue-700">Los Angeles Region</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-900">{userPoints.toLocaleString()}</div>
                        <div className="text-sm text-blue-700">points</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Next Milestone</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-700">Progress to Silver</span>
                      <span className="text-sm text-green-700">89%</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <p className="text-sm text-green-600 mt-2">1,050 points to go!</p>
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