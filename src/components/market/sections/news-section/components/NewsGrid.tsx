
import React from "react";
import { motion } from "framer-motion";
import { NewsCard } from "@/components/market/components/NewsCard";
import { NewsItem } from "../types";

interface NewsGridProps {
  news: NewsItem[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ news }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: { 
          opacity: 1,
          transition: { staggerChildren: 0.05 }
        }
      }}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {news.map(news => (
        <NewsCard key={news.id} news={news} />
      ))}
    </motion.div>
  );
};

export default NewsGrid;
