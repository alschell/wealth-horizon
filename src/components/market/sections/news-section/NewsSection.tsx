
import React from 'react';
import NewsCard from './components/NewsCard';
import { NewsSectionProps } from './types';

const NewsSection: React.FC<NewsSectionProps> = ({ news, articleId }) => {
  // We can use articleId to filter or scroll to a specific article if needed
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default NewsSection;
