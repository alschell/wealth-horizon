import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlogList } from "@/components/blog/BlogList";
import { BlogPostView } from "@/components/blog/BlogPost";
import { PopularTopics } from "@/components/blog/PopularTopics";
import { NewsletterSubscription } from "@/components/blog/NewsletterSubscription";
import { BlogPost } from "@/components/blog/types";

// Mock blog data
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

const popularTopics = ["Investment Strategy", "Market Analysis", "Wealth Planning", "Regulatory Updates", "Family Governance", "Technology", "ESG", "Private Markets"];

const Blog = () => {
  const [showBlogPost, setShowBlogPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  
  // View blog post
  const viewBlogPost = (post: BlogPost) => {
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
          <BlogPostView 
            post={selectedPost} 
            allPosts={blogPosts}
            goBack={backToBlogList} 
            viewBlogPost={viewBlogPost}
          />
        ) : (
          <>
            <BlogList
              posts={blogPosts}
              allCategories={allCategories}
              viewBlogPost={viewBlogPost}
            />
            
            <Separator />
            
            <PopularTopics 
              topics={popularTopics}
              handleCategorySelect={() => {
                setShowBlogPost(false);
                // Note: We don't directly call handleCategorySelect here anymore
                // as that's handled within the BlogList component via the hook
              }}
            />
            
            <NewsletterSubscription />
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default Blog;
