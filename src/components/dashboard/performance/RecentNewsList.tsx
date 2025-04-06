
import React from "react";
import { Newspaper, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

type NewsItemType = {
  title: string;
  time: string;
  url?: string;
};

type RecentNewsListProps = {
  newsData: NewsItemType[];
};

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  const navigate = useNavigate();
  // Only show the first 4 news items
  const visibleNews = newsData.slice(0, 4);
  
  const handleNewsClick = (url?: string) => {
    // Navigate to the news tab in the market data page
    navigate('/market-data', { state: { activeTab: 'news', articleUrl: url } });
  };

  return (
    <div className="relative h-full">
      <div className="space-y-3 max-h-[300px] overflow-y-auto pb-16">
        {visibleNews.map((news, index) => (
          <div 
            key={index} 
            className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
            onClick={() => handleNewsClick(news.url)}
          >
            <div>
              <p className="text-sm font-medium">{news.title}</p>
              <p className="text-xs text-gray-500 mt-1">{news.time}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-white pt-2 border-t pb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={() => navigate('/market-data', { state: { activeTab: 'news' } })}
        >
          View All News
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecentNewsList;
