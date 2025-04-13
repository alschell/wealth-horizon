
import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, Clock, User, ArrowRight, Search, Filter, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Family Office Investment Strategies",
    excerpt: "Exploring how technology and changing markets are reshaping investment approaches for family offices in 2025 and beyond.",
    author: "Sarah Chen",
    date: "April 5, 2025",
    category: "Investment Strategy",
    readTime: "6 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 2,
    title: "ESG Integration: Beyond the Basics",
    excerpt: "How leading family offices are incorporating sophisticated ESG metrics into their investment decision-making process.",
    author: "Michael Roberts",
    date: "March 28, 2025",
    category: "ESG",
    readTime: "8 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 3,
    title: "Navigating Regulatory Changes in Wealth Management",
    excerpt: "A comprehensive guide to recent regulatory shifts and how they impact wealth management operations.",
    author: "Jessica Wong",
    date: "March 15, 2025",
    category: "Compliance",
    readTime: "5 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 4,
    title: "Digital Transformation in Family Offices",
    excerpt: "How technology is transforming the operations of modern family offices and creating new opportunities.",
    author: "James Wilson",
    date: "March 10, 2025",
    category: "Technology",
    readTime: "7 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 5,
    title: "Next-Generation Wealth Transfer Strategies",
    excerpt: "Preparing for successful wealth transfer to the next generation while maintaining family values and legacy.",
    author: "Emily Chen",
    date: "February 25, 2025",
    category: "Family Governance",
    readTime: "9 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 6,
    title: "Private Market Investment Trends",
    excerpt: "An analysis of current trends and opportunities in private equity, venture capital, and private debt markets.",
    author: "David Brown",
    date: "February 18, 2025",
    category: "Private Markets",
    readTime: "10 min read",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/assets/dashboard-fallback.png"
  },
];

const allCategories = ["All Topics", "Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets", "Compliance"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [showBlogPost, setShowBlogPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { toast } = useToast();
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  // Filter posts based on search query and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesCategory = selectedCategory === "All Topics" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      toast({
        title: "Subscription successful!",
        description: `You've been subscribed to our newsletter with ${subscriberEmail}`,
      });
      setSubscriberEmail("");
    } else {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe",
        variant: "destructive"
      });
    }
  };
  
  // View blog post
  const viewBlogPost = (post) => {
    setSelectedPost(post);
    setShowBlogPost(true);
    window.scrollTo(0, 0);
  };
  
  // Back to blog list
  const backToBlogList = () => {
    setShowBlogPost(false);
    setSelectedPost(null);
  };

  return (
    <PageTemplate
      title="Blog"
      description="Insights, analysis, and updates from our wealth management experts."
      icon={FileText}
    >
      <div className="space-y-12">
        {showBlogPost && selectedPost ? (
          <BlogPostView post={selectedPost} goBack={backToBlogList} />
        ) : (
          <>
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:max-w-md">
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-2 top-2 h-5 w-5 text-gray-400 hover:text-gray-600" 
                      onClick={clearSearch}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {allCategories.slice(0, 5).map((category) => (
                    <Badge 
                      key={category} 
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer whitespace-nowrap"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                  <div className="relative group">
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <Filter className="h-3 w-3 mr-1" /> More
                    </Badge>
                    <div className="absolute z-10 hidden group-hover:block mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      {allCategories.slice(5).map((category) => (
                        <div 
                          key={category} 
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredPosts.slice(0, 6).map((post) => (
                  <div 
                    key={post.id} 
                    className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => viewBlogPost(post)}
                  >
                    <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/assets/dashboard-fallback.png';
                        }}
                      />
                    </div>
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
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Topics");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
              
              {filteredPosts.length > 6 && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    Load more articles
                  </Button>
                </div>
              )}
            </section>
            
            <Separator />
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets"].map((topic, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleCategorySelect(topic)}
                  >
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
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <Input 
                    placeholder="Enter your email" 
                    type="email"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="w-full sm:w-64"
                  />
                  <Button className="flex items-center gap-2" onClick={handleSubscribe}>
                    Subscribe Now <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </PageTemplate>
  );
};

// Blog post view component
const BlogPostView = ({ post, goBack }) => {
  const { toast } = useToast();
  
  const handleShare = (platform) => {
    toast({
      title: "Shared!",
      description: `Article shared on ${platform}`,
    });
  };
  
  return (
    <div className="space-y-8">
      <Button variant="outline" onClick={goBack} className="mb-4">
        ← Back to all articles
      </Button>
      
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="outline">{post.category}</Badge>
        <span className="text-gray-500 flex items-center">
          <Clock size={14} className="mr-1" /> {post.readTime}
        </span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{post.title}</h1>
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <User size={20} />
        </div>
        <div>
          <div className="font-medium">{post.author}</div>
          <div className="text-sm text-gray-500">{post.date}</div>
        </div>
      </div>
      
      <div className="h-64 md:h-96 rounded-lg overflow-hidden bg-gray-100">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/dashboard-fallback.png';
          }}
        />
      </div>
      
      <div className="prose max-w-none">
        <p className="text-lg">{post.excerpt}</p>
        <p>{post.content}</p>
        <p>
          Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. 
          Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. 
          Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, 
          egestas eget quam. Curabitur blandit tempus porttitor.
        </p>
        <h2>Key Insights</h2>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
          <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</li>
          <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</li>
        </ul>
        <p>
          Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum. 
          Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. 
          Curabitur blandit tempus porttitor. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, 
          egestas eget quam.
        </p>
      </div>
      
      <Card className="mt-10">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold mb-2">Share this article</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" onClick={() => handleShare('Twitter')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare('LinkedIn')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare('Facebook')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare('Email')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </Button>
              </div>
            </div>
            
            <Button onClick={goBack}>
              Back to all articles
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id && (p.category === post.category || Math.random() > 0.5))
            .slice(0, 3)
            .map(relatedPost => (
              <div 
                key={relatedPost.id} 
                className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  goBack();
                  setTimeout(() => viewBlogPost(relatedPost), 0);
                }}
              >
                <div className="h-40 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/dashboard-fallback.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-1 inline-block mb-2">{relatedPost.category}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedPost.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
