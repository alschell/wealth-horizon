
import React from "react";
import { ChevronRight, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CustomizeNewsDialog from "./CustomizeNewsDialog";
import SectionHeader from "../SectionHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewsItem from "./news/NewsItem";
import EmptyNewsList from "./news/EmptyNewsList";
import { useNewsFilters } from "./news/useNewsFilters";
import { useNewsFiltering } from "./news/useNewsFiltering";
import { defaultSources, defaultCategories } from "./news/NewsConstants";

type NewsItem = {
  title: string;
  time: string;
  id?: string;
  source?: string;
  category?: string;
};

type RecentNewsListProps = {
  newsData: NewsItem[];
};

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  const navigate = useNavigate();
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  
  const {
    selectedSources,
    selectedCategories,
    toggleSource,
    toggleCategory,
    saveCustomization
  } = useNewsFilters(defaultSources, defaultCategories);

  // Filter news based on selected sources and categories
  const filteredNews = useNewsFiltering(newsData, selectedSources, selectedCategories);

  const handleNewsClick = (newsItem: any, index: number) => {
    // Navigate to market data with news tab active and the specific article id
    navigate("/market-data", { 
      state: { 
        activeTab: "news",
        articleId: newsItem.id || `news-${index}` 
      } 
    });
  };

  const handleViewAllClick = () => {
    navigate("/market-data", { state: { activeTab: "news" } });
  };

  const handleSaveCustomization = () => {
    saveCustomization();
    setIsCustomizing(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <SectionHeader title="Recent News" />
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setIsCustomizing(true)}
        >
          <Sliders className="h-4 w-4" />
          <span className="sr-only">Customize</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-grow h-[225px]">
        <div className="space-y-3">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <NewsItem
                key={index}
                title={news.title}
                time={news.time}
                source={news.source}
                category={news.category}
                onClick={() => handleNewsClick(news, index)}
              />
            ))
          ) : (
            <EmptyNewsList onCustomize={() => setIsCustomizing(true)} />
          )}
        </div>
      </ScrollArea>
      
      <div className="mt-auto pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={handleViewAllClick}
        >
          View All News
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <CustomizeNewsDialog
        isOpen={isCustomizing}
        onOpenChange={setIsCustomizing}
        selectedSources={selectedSources}
        selectedCategories={selectedCategories}
        allSources={defaultSources}
        allCategories={defaultCategories}
        onSourceToggle={toggleSource}
        onCategoryToggle={toggleCategory}
        onSave={handleSaveCustomization}
      />
    </div>
  );
};

export default RecentNewsList;
