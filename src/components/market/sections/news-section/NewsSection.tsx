
import React from 'react';
import NewsCard from './components/NewsCard';
import { NewsSectionProps } from './types';

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  return (
    <div className="space-y-4">
      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default NewsSection;
