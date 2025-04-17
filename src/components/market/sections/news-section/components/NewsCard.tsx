
import React from "react";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NewsCardProps {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  category: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  title,
  summary,
  imageUrl,
  source,
  date,
  url,
  category
}) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {imageUrl && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Replace broken images with a placeholder
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=News";
            }}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/75 text-white hover:bg-black/90">
              {category || source}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-3">{summary}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{source}</span>
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs p-1 h-auto" 
          onClick={() => window.open(url, '_blank')}
        >
          Read <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
