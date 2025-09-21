import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { toast } from "sonner@2.0.3";
import { 
  HelpCircle,
  Search,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Play,
  FileText,
  Users,
  Star,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Zap,
  Shield,
  CreditCard,
  Package,
  BarChart3
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  avatar?: string;
}

interface HelpSupportProps {
  user: User;
}

const faqs = [
  {
    id: '1',
    question: 'How do I set up my POS system?',
    answer: 'Setting up your POS system is easy! Go to Settings > Business > POS Configuration. Connect your payment processor, configure tax rates, and add your products. Our setup wizard will guide you through each step.',
    category: 'Getting Started',
    helpful: 15
  },
  {
    id: '2',
    question: 'How do I add products to my inventory?',
    answer: 'Navigate to Inventory Management and click "Add Product". Fill in the product details including name, SKU, price, and stock levels. You can also bulk import products using our CSV template.',
    category: 'Inventory',
    helpful: 23
  },
  {
    id: '3',
    question: 'Can I customize my receipts?',
    answer: 'Yes! Go to Settings > Business > Receipt Settings. You can add your logo, customize the header/footer text, include promotional messages, and choose which information to display.',
    category: 'Customization',
    helpful: 18
  },
  {
    id: '4',
    question: 'How do I set up customer loyalty programs?',
    answer: 'In Customer Management, click "Loyalty Programs" and follow the setup wizard. You can configure point earning rates, rewards, tier benefits, and automated campaigns.',
    category: 'Customer Management',
    helpful: 31
  },
  {
    id: '5',
    question: 'What payment methods are supported?',
    answer: 'SELLFORCE supports all major payment methods including cash, credit/debit cards, mobile payments (Apple Pay, Google Pay), and digital wallets. Integration with Stripe, Square, and PayPal is available.',
    category: 'Payments',
    helpful: 27
  }
];

const tutorials = [
  {
    id: '1',
    title: 'Getting Started with SELLFORCE',
    description: 'Complete beginner guide to setting up your business',
    duration: '12 min',
    type: 'video',
    category: 'Getting Started',
    difficulty: 'Beginner'
  },
  {
    id: '2',
    title: 'Advanced Inventory Management',
    description: 'Master auto-reorder, forecasting, and supplier management',
    duration: '18 min',
    type: 'video',
    category: 'Inventory',
    difficulty: 'Advanced'
  },
  {
    id: '3',
    title: 'Customer Loyalty Best Practices',
    description: 'Build effective loyalty programs that drive retention',
    duration: '8 min',
    type: 'article',
    category: 'Customer Management',
    difficulty: 'Intermediate'
  },
  {
    id: '4',
    title: 'Financial Reporting & Analytics',
    description: 'Understanding your business metrics and KPIs',
    duration: '15 min',
    type: 'video',
    category: 'Analytics',
    difficulty: 'Intermediate'
  }
];

export function HelpSupport({ user }: HelpSupportProps) {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    priority: 'medium',
    category: 'general',
    message: ''
  });

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (!supportTicket.subject || !supportTicket.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setSupportTicket({
      subject: '',
      priority: 'medium',
      category: 'general',
      message: ''
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Getting Started': return Zap;
      case 'Inventory': return Package;
      case 'Customer Management': return Users;
      case 'Payments': return CreditCard;
      case 'Analytics': return BarChart3;
      case 'Customization': return Star;
      default: return HelpCircle;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600">
          Get the help you need to make the most of SELLFORCE
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Call Support</h3>
            <p className="text-sm text-gray-600 mb-3">1-800-SELLFORCE</p>
            <Badge className="bg-green-100 text-green-800 text-xs">24/7 Available</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-3">Chat with an agent</p>
            <Badge className="bg-green-100 text-green-800 text-xs">Online Now</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
            <p className="text-sm text-gray-600 mb-3">support@sellforce.com</p>
            <Badge className="bg-blue-100 text-blue-800 text-xs">24h Response</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-600 mb-3">Join the discussion</p>
            <Badge className="bg-orange-100 text-orange-800 text-xs">50k+ Members</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for help articles, tutorials, or FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 text-base"
          />
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq) => {
                  const IconComponent = getCategoryIcon(faq.category);
                  return (
                    <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center space-x-3 text-left">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{faq.question}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {faq.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Star className="h-3 w-3 mr-1" />
                                {faq.helpful} found helpful
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Helpful
                            </Button>
                            <Button size="sm" variant="outline">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Not Helpful
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Full Article
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Video Tutorials & Guides
              </CardTitle>
              <CardDescription>
                Step-by-step guides to master SELLFORCE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {tutorial.type === 'video' ? (
                            <Play className="h-6 w-6 text-blue-600" />
                          ) : (
                            <FileText className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{tutorial.description}</p>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {tutorial.duration}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {tutorial.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                              {tutorial.difficulty}
                            </Badge>
                          </div>
                          <Button size="sm" className="mt-3 w-full">
                            {tutorial.type === 'video' ? 'Watch Tutorial' : 'Read Guide'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Support Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Submit Support Ticket
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Contact our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={supportTicket.subject}
                    onChange={(e) => setSupportTicket({...supportTicket, subject: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select
                      id="priority"
                      className="w-full p-2 border rounded-md"
                      value={supportTicket.priority}
                      onChange={(e) => setSupportTicket({...supportTicket, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border rounded-md"
                      value={supportTicket.category}
                      onChange={(e) => setSupportTicket({...supportTicket, category: e.target.value})}
                    >
                      <option value="general">General</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing</option>
                      <option value="feature">Feature Request</option>
                      <option value="integration">Integration</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                    value={supportTicket.message}
                    onChange={(e) => setSupportTicket({...supportTicket, message: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-info">Business Information</Label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">
                    <p><strong>Business:</strong> {user.businessName}</p>
                    <p><strong>Type:</strong> {user.businessType}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </div>
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Multiple ways to reach our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-gray-600">1-800-SELLFORCE (24/7)</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className="text-sm text-gray-600">Available Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-gray-600">support@sellforce.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    • Include screenshots or screen recordings when reporting issues
                  </p>
                  <p className="text-sm text-gray-600">
                    • Check our status page for known issues before contacting support
                  </p>
                  <p className="text-sm text-gray-600">
                    • Be as specific as possible about steps to reproduce the issue
                  </p>
                  <p className="text-sm text-gray-600">
                    • Include your browser version and device information
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                System Status
              </CardTitle>
              <CardDescription>
                Current status of all SELLFORCE services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-green-900">All Systems Operational</p>
                      <p className="text-sm text-green-700">All services are running normally</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">99.9% Uptime</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { service: 'POS System', status: 'operational', uptime: '99.9%' },
                    { service: 'Payment Processing', status: 'operational', uptime: '99.8%' },
                    { service: 'Cloud Sync', status: 'operational', uptime: '99.9%' },
                    { service: 'Mobile App', status: 'operational', uptime: '99.7%' },
                    { service: 'API Services', status: 'operational', uptime: '99.9%' },
                    { service: 'Email Notifications', status: 'operational', uptime: '99.6%' }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium">{service.service}</span>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {service.uptime}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Detailed Status Page
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}