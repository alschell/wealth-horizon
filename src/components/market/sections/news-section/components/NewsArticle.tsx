
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Copy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";
import type { NewsItem } from "@/utils/market-data/types";

interface NewsArticleProps {
  articleId: string;
  onBack: () => void;
  news: NewsItem[];
}

const NewsArticle = ({ articleId, onBack, news }: NewsArticleProps) => {
  // Find the selected article
  const article = news.find(item => item.id.toString() === articleId);
  
  if (!article) {
    return (
      <div className="py-10 text-center">
        <h3 className="text-lg font-medium">Article not found</h3>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>
      </div>
    );
  }
  
  const handleCopy = () => {
    navigator.clipboard.writeText(article.summary);
    showCopySuccessToast("Article summary");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Button>
      </div>
      
      <Card className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium">{article.source}</span>
              <span className="mx-2">•</span>
              <span>{formatDistanceToNow(new Date(article.datetime * 1000), { addSuffix: true })}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Source
                </a>
              </Button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">{article.headline}</h1>
          
          {article.image && (
            <div className="my-6">
              <img 
                src={article.image} 
                alt={article.headline} 
                className="w-full max-h-[500px] object-contain rounded-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e5e7eb/a1a1aa?text=No+Image";
                }}
              />
            </div>
          )}
          
          <div className="prose max-w-full">
            <p className="whitespace-pre-line">{article.summary}</p>
            
            {article.related && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Related to</h3>
                <p>{article.related}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NewsArticle;
