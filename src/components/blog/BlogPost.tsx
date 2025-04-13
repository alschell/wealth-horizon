
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "./types";
import { RelatedArticles } from "./RelatedArticles";

interface BlogPostViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  goBack: () => void;
  viewBlogPost: (post: BlogPost) => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ 
  post, 
  allPosts,
  goBack, 
  viewBlogPost 
}) => {
  const { toast } = useToast();
  
  const handleShare = (platform: string) => {
    toast({
      title: "Shared!",
      description: `Article shared on ${platform}`,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
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
          onError={handleImageError}
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
      
      <RelatedArticles 
        currentPost={post} 
        allPosts={allPosts}
        goBack={goBack}
        viewBlogPost={viewBlogPost}
      />
    </div>
  );
};
