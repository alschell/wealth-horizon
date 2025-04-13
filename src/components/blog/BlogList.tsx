
import React from "react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./BlogCard";
import { BlogPost } from "./types";
import { BlogSearch } from "./BlogSearch";
import { useBlogSearch } from "./hooks/useBlogSearch";

interface BlogListProps {
  posts: BlogPost[];
  allCategories: string[];
  viewBlogPost: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogListProps> = ({
  posts,
  allCategories,
  viewBlogPost,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    handleCategorySelect,
    filteredPosts,
    resetFilters
  } = useBlogSearch({ posts });

  return (
    <section className="space-y-6">
      <BlogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        allCategories={allCategories}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.slice(0, 6).map((post) => (
          <BlogCard key={post.id} post={post} onClick={viewBlogPost} />
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
            onClick={resetFilters}
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
  );
};
