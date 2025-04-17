import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NewsSectionProps, NewsItem } from "./types";
import NewsHeader from "./components/NewsHeader";
import NewsGrid from "./components/NewsGrid";
import LoadMoreButton from "./components/LoadMoreButton";
import { useMarketNews } from "@/hooks/market-data";
import { Loader2 } from "lucide-react";
import ErrorFallback from "@/components/shared/ErrorFallback";
import { NewsItem as APINewsItem } from "@/utils/market-data/types";

const NewsSection: React.FC<NewsSectionProps> = ({ articleId }) => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(12);
  
  // Fetch market news using the API hook
  const { data: apiNewsItems, isLoading, error } = useMarketNews(
    category !== "all" ? category : "general", 
    50 // Fetch more than we display initially so we can filter
  );
  
  // Map API news items to our component's NewsItem format
  const newsItems: NewsItem[] = React.useMemo(() => {
    if (!apiNewsItems || !Array.isArray(apiNewsItems)) return [];
    
    return apiNewsItems.map((item: APINewsItem): NewsItem => ({
      id: item.id.toString(),
      title: item.headline,
      summary: item.summary,
      imageUrl: item.image,
      source: item.source,
      date: new Date(item.datetime * 1000).toLocaleDateString(),
      url: item.url,
      category: item.category,
      headline: item.headline,
      datetime: item.datetime,
      image: item.image
    }));
  }, [apiNewsItems]);
  
  // Effect to scroll to specific article if articleId is provided
  useEffect(() => {
    if (articleId && newsItems) {
      // Find the article in our data
      const article = newsItems.find(item => item.id.toString() === articleId);
      if (article) {
        // We could automatically set the category filter based on the article
        setCategory("all"); // Reset to show all categories to ensure article is visible
        
        // In a real implementation, you might want to scroll to the article or highlight it
        setTimeout(() => {
          const element = document.getElementById(`news-article-${articleId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('ring-2', 'ring-indigo-500', 'ring-opacity-50');
          }
        }, 500);
      }
    }
  }, [articleId, newsItems]);
  
  // Filter news based on search term
  const filteredNews = React.useMemo(() => {
    if (!newsItems) return [];
    
    return newsItems.filter(item => {
      // First apply the search filter if a search term exists
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchLower) ||
          item.summary.toLowerCase().includes(searchLower) ||
          item.source.toLowerCase().includes(searchLower)
        );
      }
      
      // If no search term, all items are included
      return true;
    }).slice(0, displayCount); // Limit the number of items displayed
  }, [newsItems, searchTerm, displayCount]);
  
  // Handle load more button click
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Loading market news...</span>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <ErrorFallback 
        error={error as Error} 
        resetErrorBoundary={() => window.location.reload()} 
      />
    );
  }

  // Empty state
  if (!filteredNews || filteredNews.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No news articles found matching your criteria.</p>
        <button 
          onClick={() => {
            setSearchTerm('');
            setCategory('all');
          }}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <NewsHeader 
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <NewsGrid news={filteredNews} highlightId={articleId} />
      
      {filteredNews.length < (newsItems?.length || 0) && (
        <LoadMoreButton onClick={handleLoadMore} />
      )}
    </motion.div>
  );
};

export default NewsSection;
