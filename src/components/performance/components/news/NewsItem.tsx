
import React from "react";

type NewsItemProps = {
  news: {
    title: string;
    time: string;
  };
};

const NewsItem = ({ news }: NewsItemProps) => {
  return (
    <div className="p-3 rounded-md border border-gray-100">
      <p className="text-sm font-medium">{news.title}</p>
      <p className="text-xs text-gray-500 mt-1">{news.time}</p>
    </div>
  );
};

export default NewsItem;
