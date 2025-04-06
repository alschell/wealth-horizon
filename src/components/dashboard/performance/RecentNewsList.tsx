
import React from "react";
import { Newspaper, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
      <div className="space-y-2">
        {newsData.map((news, index) => (
          <div key={index} className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
            <p className="text-sm font-medium">{news.title}</p>
            <p className="text-xs text-gray-500 mt-1">{news.time}</p>
          </div>
        ))}
        <Link to="/market-data">
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
            View All News
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentNewsList;
