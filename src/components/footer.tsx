import React from 'react';
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { 
  Heart, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  HelpCircle,
  FileText,
  Users,
  Star,
  ExternalLink
} from 'lucide-react';

const SELLFORCE_LOGO = "🚀";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{SELLFORCE_LOGO}</span>
              <span className="text-xl font-bold text-gray-900">SELLFORCE</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your all-in-one business management super app. Empowering small businesses 
              with intelligent POS, CRM, inventory, and financial tools.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for business owners</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <FileText className="h-3 w-3 mr-2" />
                User Guide
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <HelpCircle className="h-3 w-3 mr-2" />
                Help Center
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <Users className="h-3 w-3 mr-2" />
                Community
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <Star className="h-3 w-3 mr-2" />
                Feature Requests
              </Button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-3 w-3" />
                <span>support@sellforce.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-3 w-3" />
                <span>1-800-SELLFORCE</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>Available 24/7</span>
              </div>
              <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700">
                <ExternalLink className="h-3 w-3 mr-2" />
                Contact Support
              </Button>
            </div>
          </div>

          {/* Legal & Security */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Legal & Security</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <Shield className="h-3 w-3 mr-2" />
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <FileText className="h-3 w-3 mr-2" />
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-gray-600 hover:text-blue-600 justify-start">
                <Globe className="h-3 w-3 mr-2" />
                Data Security
              </Button>
              <div className="flex items-center space-x-2 text-sm text-green-600 mt-3">
                <Shield className="h-3 w-3" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>© {currentYear} SELLFORCE. All rights reserved.</span>
            <span>•</span>
            <span>Version 2.1.0</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All Systems Operational</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Trusted by 50,000+ businesses worldwide
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 text-yellow-500 fill-current" />
              ))}
              <span className="text-sm text-gray-600 ml-1">4.9/5</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}