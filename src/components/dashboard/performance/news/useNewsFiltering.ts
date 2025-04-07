
import React from "react";

type NewsItem = {
  title: string;
  time: string;
  id?: string;
  source?: string;
  category?: string;
};

export const useNewsFiltering = (
  newsData: NewsItem[],
  selectedSources: string[],
  selectedCategories: string[]
) => {
  return React.useMemo(() => {
    return newsData.filter(news => {
      // If no source or category filter is applied, show all
      if (selectedSources.length === 0 && selectedCategories.length === 0) return true;
      
      // If no source is specified for the news item, don't filter by source
      const sourceMatch = !news.source || selectedSources.includes(news.source);
      
      // If no category is specified for the news item, don't filter by category
      const categoryMatch = !news.category || selectedCategories.includes(news.category);
      
      return sourceMatch && categoryMatch;
    });
  }, [newsData, selectedSources, selectedCategories]);
};
