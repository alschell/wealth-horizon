
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMarketNews } from "@/hooks/market-data/useNewsHooks";
import NewsFilters from "./components/NewsFilters";
import NewsList from "./components/NewsList";
import NewsArticle from "./components/NewsArticle";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ErrorMessage from "./components/ErrorMessage";

const NewsSection = ({ articleId }: { articleId?: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [categories] = useState([
    { id: "general", name: "General" },
    { id: "forex", name: "Forex" },
    { id: "crypto", name: "Crypto" },
    { id: "merger", name: "Mergers" },
    { id: "economy", name: "Economy" },
    { id: "ipo", name: "IPO" }
  ]);
  
  const { data: news, isLoading, error, refetch } = useMarketNews(selectedCategory, 20);
  
  // Set selected article from props if provided
  useEffect(() => {
    if (articleId) {
      setSelectedArticle(articleId);
    }
  }, [articleId]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Handle article selection
  const handleArticleSelect = (id: string) => {
    setSelectedArticle(id);
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedArticle(null);
  };

  // If loading
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // If error
  if (error) {
    return <ErrorMessage error={error} onRetry={refetch} />;
  }

  // If no news
  if (!news || news.length === 0) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">No news articles found</h3>
        <p className="text-muted-foreground mt-2">Try selecting a different category or check back later.</p>
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
      {!selectedArticle ? (
        <>
          <motion.div variants={item}>
            <NewsFilters 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <NewsList 
              news={news} 
              onSelectArticle={handleArticleSelect} 
            />
          </motion.div>
        </>
      ) : (
        <motion.div variants={item}>
          <NewsArticle 
            articleId={selectedArticle} 
            onBack={handleBackToList}
            news={news}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default NewsSection;
