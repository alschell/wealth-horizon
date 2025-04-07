
import React from "react";

type NewsItemProps = {
  title: string;
  time: string;
  source?: string;
  category?: string;
  onClick: () => void;
};

const NewsItem = ({ title, time, source, category, onClick }: NewsItemProps) => {
  return (
    <div 
      className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
      {source && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded mr-2">{source}</span>}
      {category && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{category}</span>}
    </div>
  );
};

export default NewsItem;
