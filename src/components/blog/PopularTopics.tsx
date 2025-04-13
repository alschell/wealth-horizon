
import React from "react";

interface PopularTopicsProps {
  topics: string[];
  handleCategorySelect: (topic: string) => void;
}

export const PopularTopics: React.FC<PopularTopicsProps> = ({
  topics,
  handleCategorySelect,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleCategorySelect(topic)}
          >
            <span className="text-gray-800">{topic}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
