
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <Card className="hover:bg-gray-50 transition-colors">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">{item.title}</h3>
        <p className="text-sm text-gray-500">{item.source} · {item.date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{item.summary}</p>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
        >
          Read more
        </a>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
