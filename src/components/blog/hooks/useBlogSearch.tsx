
import { useState, useCallback, useMemo } from 'react';
import { BlogPost } from '../types';

interface UseBlogSearchProps {
  posts: BlogPost[];
  initialCategory?: string;
}

export const useBlogSearch = ({ posts, initialCategory = "All Topics" }: UseBlogSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);
  
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("All Topics");
  }, []);
  
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.category.toLowerCase().includes(searchQuery.toLowerCase());
                            
      const matchesCategory = selectedCategory === "All Topics" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleCategorySelect,
    filteredPosts,
    resetFilters
  };
};
