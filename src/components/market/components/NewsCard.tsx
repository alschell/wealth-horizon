
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Share2, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  image: string;
  category: string;
  datePublished: string;
  isBreaking: boolean;
  url: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
        {news.isBreaking && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 left-2"
          >
            Breaking
          </Badge>
        )}
        <Badge 
          variant="outline" 
          className="absolute top-2 right-2 bg-white/80"
        >
          {news.source}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg leading-tight hover:text-blue-800 cursor-pointer">
          {news.title}
        </h3>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm line-clamp-3">
          {news.summary}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-1 pb-3">
        <span className="text-xs text-gray-500">{news.datePublished}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <BookmarkPlus className="h-4 w-4" />
            <span className="sr-only">Save</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Read more</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
