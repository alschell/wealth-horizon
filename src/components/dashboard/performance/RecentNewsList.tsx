
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NewsItem = {
  title: string;
  time: string;
  id?: string;
  source?: string;
  category?: string;
  summary?: string;
  url?: string;
};

type RecentNewsListProps = {
  newsData: NewsItem[];
};

const RecentNewsList = ({ newsData }: RecentNewsListProps) => {
  const navigate = useNavigate();
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const [selectedNews, setSelectedNews] = React.useState<NewsItem | null>(null);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = React.useState(false);
  
  const {
    selectedSources,
    selectedCategories,
    toggleSource,
    toggleCategory,
    saveCustomization
  } = useNewsFilters(defaultSources, defaultCategories);

  // Filter news based on selected sources and categories
  const filteredNews = useNewsFiltering(newsData, selectedSources, selectedCategories);

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsNewsDialogOpen(true);
    
    // If the news has an external URL, you could also open it in a new tab
    if (newsItem.url) {
      window.open(newsItem.url, '_blank');
    }
  };

  const handleViewAllClick = () => {
    navigate("/market-data", { state: { activeTab: "news" } });
  };

  const handleSaveCustomization = () => {
    saveCustomization();
    setIsCustomizing(false);
  };

  return (
    <Card className="shadow-sm h-[350px]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
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
      </CardHeader>
      
      <CardContent className="p-6 pt-0 h-[calc(350px-80px)] flex flex-col">
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-3">
            {filteredNews.length > 0 ? (
              filteredNews.map((news, index) => (
                <NewsItem
                  key={index}
                  title={news.title}
                  time={news.time}
                  source={news.source}
                  category={news.category}
                  onClick={() => handleNewsClick(news)}
                />
              ))
            ) : (
              <EmptyNewsList onCustomize={() => setIsCustomizing(true)} />
            )}
          </div>
        </ScrollArea>
        
        <div className="pt-4 mt-auto">
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
        
        {/* News Detail Dialog */}
        <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedNews?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{selectedNews?.source}</span>
                <span>{selectedNews?.time}</span>
              </div>
              <p className="text-gray-700">{selectedNews?.summary || "No summary available."}</p>
              {selectedNews?.url && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.open(selectedNews.url, '_blank')}
                >
                  Read Full Article
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RecentNewsList;
