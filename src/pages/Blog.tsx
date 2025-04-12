
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, Clock, User, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Family Office Investment Strategies",
    excerpt: "Exploring how technology and changing markets are reshaping investment approaches for family offices in 2025 and beyond.",
    author: "Sarah Chen",
    date: "April 5, 2025",
    category: "Investment Strategy",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "ESG Integration: Beyond the Basics",
    excerpt: "How leading family offices are incorporating sophisticated ESG metrics into their investment decision-making process.",
    author: "Michael Roberts",
    date: "March 28, 2025",
    category: "ESG",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Navigating Regulatory Changes in Wealth Management",
    excerpt: "A comprehensive guide to recent regulatory shifts and how they impact wealth management operations.",
    author: "Jessica Wong",
    date: "March 15, 2025",
    category: "Compliance",
    readTime: "5 min read",
  },
];

const Blog = () => {
  return (
    <PageTemplate
      title="Blog"
      description="Insights, analysis, and updates from our wealth management experts."
      icon={FileText}
    >
      <div className="space-y-12">
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50"></div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">{post.category}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                        <User size={16} />
                      </div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets"].map((topic, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                <span className="text-gray-800">{topic}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Subscribe to our newsletter</h2>
              <p className="text-gray-600">Get the latest insights and analysis delivered to your inbox.</p>
            </div>
            <Button className="flex items-center gap-2">
              Subscribe Now <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Blog;
