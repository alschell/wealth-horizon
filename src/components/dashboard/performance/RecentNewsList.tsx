
import React from "react";
import { Newspaper, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewsItemType = {
  title: string;
  time: string;
};

type RecentNewsListProps = {
  newsData: NewsItemType[];
};

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium flex items-center">
          <Newspaper className="h-4 w-4 mr-1 text-gray-500" /> Recent News
        </h3>
        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
          View all
        </Button>
      </div>
      <div className="space-y-2">
        {newsData.map((news, index) => (
          <div key={index} className="p-3 rounded-md border border-gray-100 hover:shadow-sm transition-shadow bg-white">
            <p className="text-sm font-medium">{news.title}</p>
            <p className="text-xs text-gray-500 mt-1">{news.time}</p>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          View All News
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecentNewsList;
