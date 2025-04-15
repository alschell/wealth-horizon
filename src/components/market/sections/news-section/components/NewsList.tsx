
import React from "react";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import type { NewsItem } from "@/utils/market-data/types";

interface NewsListProps {
  news: NewsItem[];
  onSelectArticle: (id: string) => void;
}

const NewsList = ({ news, onSelectArticle }: NewsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article) => (
        <Card 
          key={article.id} 
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectArticle(article.id.toString())}
        >
          <div className="aspect-video w-full overflow-hidden bg-gray-100">
            {article.image ? (
              <img 
                src={article.image} 
                alt={article.headline} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e5e7eb/a1a1aa?text=No+Image";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span className="font-medium">{article.source}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(new Date(article.datetime * 1000), { addSuffix: true })}</span>
            </div>
            
            <h3 className="font-semibold text-lg line-clamp-2 mb-2" title={article.headline}>
              {article.headline}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-3">
              {article.summary}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NewsList;
