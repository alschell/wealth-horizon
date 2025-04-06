
import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type RecentNewsListProps = {
  newsData: {
    title: string;
    time: string;
  }[];
};

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="space-y-3">
          {newsData.map((news, index) => (
            <div key={index} className="p-3 border border-gray-100 rounded-md hover:shadow-sm transition-shadow bg-white">
              <h3 className="text-sm font-medium">{news.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{news.time}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          View All News
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default RecentNewsList;
