
import React from "react";
import { ChevronRight, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CustomizeNewsDialog, { NewsSource, NewsCategory } from "./CustomizeNewsDialog";
import SectionHeader from "../SectionHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Default sources and categories - sorts alphabetically
const defaultSources: NewsSource[] = [
  { id: "bloomberg", name: "Bloomberg", description: "Financial and business news" },
  { id: "cnbc", name: "CNBC", description: "Financial and business news" },
  { id: "ft", name: "Financial Times", description: "Global financial news" },
  { id: "reuters", name: "Reuters", description: "Global news and markets" },
  { id: "wsj", name: "Wall Street Journal", description: "Business and markets" }
];

const defaultCategories: NewsCategory[] = [
  { id: "companies", name: "Companies", description: "Corporate news and earnings" },
  { id: "economy", name: "Economy", description: "Economic news and indicators" },
  { id: "finance", name: "Finance", description: "Financial industry news" },
  { id: "markets", name: "Markets", description: "Stock, bond, and commodity markets" },
  { id: "technology", name: "Technology", description: "Tech industry news" }
];

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  const navigate = useNavigate();
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const [selectedSources, setSelectedSources] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("newsSelectedSources");
      return saved ? JSON.parse(saved) : defaultSources.map(s => s.id);
    } catch (e) {
      return defaultSources.map(s => s.id);
    }
  });
  
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("newsSelectedCategories");
      return saved ? JSON.parse(saved) : defaultCategories.map(c => c.id);
    } catch (e) {
      return defaultCategories.map(c => c.id);
    }
  });

  // Filter news based on selected sources and categories
  const filteredNews = React.useMemo(() => {
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

  const toggleSource = (id: string) => {
    setSelectedSources(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const saveCustomization = () => {
    localStorage.setItem("newsSelectedSources", JSON.stringify(selectedSources));
    localStorage.setItem("newsSelectedCategories", JSON.stringify(selectedCategories));
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
              <div 
                key={index} 
                className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleNewsClick(news, index)}
              >
                <h3 className="text-sm font-medium">{news.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{news.time}</p>
                {news.source && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded mr-2">{news.source}</span>}
                {news.category && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{news.category}</span>}
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">No news matching your filters</p>
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setIsCustomizing(true)}
              >
                Customize filters
              </Button>
            </div>
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
        onSave={saveCustomization}
      />
    </div>
  );
};

export default RecentNewsList;
