
import React from "react";
import { Clock, User } from "@/utils/icons";
import { BlogPost } from "./types";

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
  };

  return (
    <div 
      className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(post)}
    >
      <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
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
              {post.authorAvatar ? (
                <img 
                  src={post.authorAvatar} 
                  alt={post.author}
                  className="w-full h-full rounded-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <User size={16} />
              )}
            </div>
            <span className="text-sm text-gray-600">{post.author}</span>
          </div>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
      </div>
    </div>
  );
};
