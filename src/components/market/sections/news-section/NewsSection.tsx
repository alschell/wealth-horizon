
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NewsSectionProps } from "./types";
import { filterNewsItems, getNewsItems } from "./utils/newsUtils";
import NewsHeader from "./components/NewsHeader";
import NewsGrid from "./components/NewsGrid";
import LoadMoreButton from "./components/LoadMoreButton";

const NewsSection: React.FC<NewsSectionProps> = ({ articleId }) => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get all news items
  const newsItems = getNewsItems();
  
  // Effect to scroll to specific article if articleId is provided
  useEffect(() => {
    if (articleId) {
      // Find the article in our data
      const article = newsItems.find(item => item.id === articleId);
      if (article) {
        // We could automatically set the category filter based on the article
        setCategory(article.category !== "all" ? article.category : "all");
        
        // In a real implementation, you might want to scroll to the article or highlight it
        // This is a placeholder for that functionality
        console.log(`Article ${articleId} should be displayed prominently`);
      }
    }
  }, [articleId]);
  
  // Filter news based on category and search term
  const filteredNews = filterNewsItems(newsItems, category, searchTerm);
  
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
      
      <NewsGrid news={filteredNews} />
      
      <LoadMoreButton />
    </motion.div>
  );
};

export default NewsSection;
