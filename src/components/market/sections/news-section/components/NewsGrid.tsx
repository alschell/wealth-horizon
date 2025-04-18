
import React from "react";
import { Grid } from "@/components/ui/grid";
import NewsCard from "./NewsCard";
import { motion } from "framer-motion";
import { NewsItem } from "../types";

interface NewsGridProps {
  news: NewsItem[];
  highlightId?: string;
}

const NewsGrid: React.FC<NewsGridProps> = ({ news, highlightId }) => {
  // Animation variants for staggered appearance
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.map((newsItem) => (
        <motion.div
          key={newsItem.id}
          variants={item}
          id={`news-article-${newsItem.id}`}
          className={highlightId === newsItem.id.toString() ? "ring-2 ring-indigo-500 rounded-lg" : ""}
        >
          <NewsCard item={newsItem} />
        </motion.div>
      ))}
    </Grid>
  );
};

export default NewsGrid;
