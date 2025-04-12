
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { HelpCircle, Search, FileText, Video, MessageCircle, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const popularQuestions = [
  {
    id: 1,
    question: "How do I set up multi-factor authentication?",
    category: "Security"
  },
  {
    id: 2,
    question: "How can I connect my external accounts?",
    category: "Integrations"
  },
  {
    id: 3,
    question: "How do I generate custom reports?",
    category: "Reporting"
  },
  {
    id: 4,
    question: "What data sources do you support?",
    category: "Data Management"
  },
  {
    id: 5,
    question: "How do I invite team members to my account?",
    category: "User Management"
  },
  {
    id: 6,
    question: "How can I customize my dashboard?",
    category: "Platform Usage"
  }
];

const helpCategories = [
  {
    title: "Getting Started",
    icon: <BookOpen size={24} />,
    articles: 12
  },
  {
    title: "Account Management",
    icon: <Users size={24} />,
    articles: 8
  },
  {
    title: "Portfolio Management",
    icon: <BarChart3 size={24} />,
    articles: 15
  },
  {
    title: "Reporting & Analytics",
    icon: <FileText size={24} />,
    articles: 10
  },
  {
    title: "Integrations",
    icon: <Link size={24} />,
    articles: 7
  },
  {
    title: "Security & Privacy",
    icon: <Shield size={24} />,
    articles: 9
  }
];

import { BarChart3, Link, Users, Shield } from "lucide-react";

const HelpCenter = () => {
  return (
    <PageTemplate
      title="Help Center"
      description="Support resources, tutorials, and answers to frequently asked questions."
      icon={HelpCircle}
    >
      <div className="space-y-12">
        <section className="bg-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How can we help you today?</h2>
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for answers, tutorials, or topics..."
              className="pl-10 py-6 text-lg"
            />
            <Button className="absolute right-1.5 top-1.5">
              Search
            </Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularQuestions.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between">
                  <div>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1 mb-2 inline-block">
                      {item.category}
                    </span>
                    <h3 className="font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {item.question}
                    </h3>
                  </div>
                  <ArrowRight size={18} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Help Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.articles} articles</p>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm">
                  Browse articles <ArrowRight size={14} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Learning Resources</h2>
          <Tabs defaultValue="tutorials" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Step-by-Step Guides</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tutorials" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "Getting Started with WealthHorizon", duration: "5:32", level: "Beginner" },
                  { title: "Advanced Portfolio Analysis", duration: "12:45", level: "Advanced" },
                  { title: "Custom Reporting Walkthrough", duration: "8:17", level: "Intermediate" }
                ].map((video, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <div className="h-36 bg-gray-100 flex items-center justify-center relative">
                      <Video size={32} className="text-gray-400" />
                      <div className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-1 mb-2 inline-block">
                        {video.level}
                      </span>
                      <h3 className="font-medium text-gray-800">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Tutorials</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="guides" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Complete Guide to Portfolio Management", pages: 18, level: "Comprehensive" },
                  { title: "Setting Up Data Integrations", pages: 12, level: "Technical" },
                  { title: "Customizing Your Dashboard", pages: 8, level: "Beginner" },
                  { title: "Advanced Reporting Techniques", pages: 15, level: "Advanced" }
                ].map((guide, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow flex">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{guide.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="mr-3">{guide.pages} pages</span>
                        <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-0.5">
                          {guide.level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Guides</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="webinars" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Quarterly Platform Updates", date: "May 15, 2025", status: "Upcoming" },
                  { title: "ESG Integration Strategies", date: "April 22, 2025", status: "Upcoming" },
                  { title: "Maximizing Portfolio Performance", date: "March 30, 2025", status: "Recorded" },
                  { title: "Regulatory Compliance for Family Offices", date: "February 18, 2025", status: "Recorded" }
                ].map((webinar, index) => (
                  <div key={index} className="bg-white border border-gray-100 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 text-sm">{webinar.date}</span>
                      <span className={`text-xs font-medium rounded-full px-2 py-1 ${
                        webinar.status === "Upcoming" 
                          ? "bg-green-50 text-green-600" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {webinar.status}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-3">{webinar.title}</h3>
                    <Button 
                      variant={webinar.status === "Upcoming" ? "default" : "outline"}
                      size="sm"
                    >
                      {webinar.status === "Upcoming" ? "Register" : "Watch Recording"}
                    </Button>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button variant="outline">View All Webinars</Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 text-white rounded-xl p-8">
            <div className="flex items-center mb-4">
              <MessageCircle size={24} className="mr-3" />
              <h2 className="text-xl font-semibold">Contact Support</h2>
            </div>
            <p className="mb-6 opacity-90">
              Need personalized assistance? Our support team is available to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                Chat with Support
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-indigo-700">
                Submit a Ticket
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <BookOpen size={24} className="mr-3 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">Documentation</h2>
            </div>
            <p className="mb-6 text-gray-600">
              Access our comprehensive documentation for detailed information about all features and functionalities.
            </p>
            <Button variant="outline" className="flex items-center">
              View Documentation <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default HelpCenter;
