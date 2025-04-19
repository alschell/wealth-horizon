import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { RelatedArticles } from "./RelatedArticles";
import { CommentsSection } from "./comments/CommentsSection";
import { BlogPost } from "./types";

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
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
  };

  return (
    <article className="space-y-8">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={goBack}
      >
        <ArrowLeft className="h-4 w-4" /> Back to All Articles
      </Button>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-block px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" /> {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-left">{post.title}</h1>
        </div>
        
        <div className="flex items-center justify-between border-y border-gray-100 py-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden mr-3">
              {post.authorAvatar ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <User className="w-6 h-6 text-indigo-600 m-2" />
              )}
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800">{post.author}</p>
              <p className="text-sm text-gray-500">{post.date}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              Share
            </Button>
            <Button variant="ghost" size="sm">
              Save
            </Button>
          </div>
        </div>
        
        <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-8">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </div>
        
        <div className="prose prose-indigo max-w-none prose-lg text-left" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <Separator className="my-12" />
        
        <RelatedArticles 
          currentPost={post}
          allPosts={allPosts}
          goBack={goBack}
          viewBlogPost={viewBlogPost}
        />
        
        <Separator className="my-12" />
        
        <CommentsSection postId={post.id} />
      </div>
    </article>
  );
};
