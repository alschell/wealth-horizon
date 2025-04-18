
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, BookOpen, MessageCircle } from "lucide-react";
import { Article } from "@/types/help-center";
import { TranslatedText } from "@/components/ui/translated-text";

interface TopicsSectionProps {
  articlesByCategory: Record<string, Article[]>;
  viewArticle: (article: Article) => void;
  setSearchQuery: (query: string) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({
  articlesByCategory,
  viewArticle,
  setSearchQuery
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        <TranslatedText>Popular Topics</TranslatedText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <FileText size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              <TranslatedText>Getting Started</TranslatedText>
            </h3>
          </div>
          <ul className="space-y-3 mb-4">
            {articlesByCategory["Getting Started"]?.slice(0, 3).map(article => (
              <li key={article.id} className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                <button 
                  className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                  onClick={() => viewArticle(article)}
                >
                  <TranslatedText>{article.title}</TranslatedText>
                </button>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setSearchQuery("Getting Started")}
          >
            <TranslatedText>View All Articles</TranslatedText>
          </Button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <BookOpen size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              <TranslatedText>Platform Features</TranslatedText>
            </h3>
          </div>
          <ul className="space-y-3 mb-4">
            {articlesByCategory["Platform Features"]?.slice(0, 3).map(article => (
              <li key={article.id} className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                <button 
                  className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                  onClick={() => viewArticle(article)}
                >
                  <TranslatedText>{article.title}</TranslatedText>
                </button>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setSearchQuery("Platform Features")}
          >
            <TranslatedText>View All Articles</TranslatedText>
          </Button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <MessageCircle size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              <TranslatedText>Account & Billing</TranslatedText>
            </h3>
          </div>
          <ul className="space-y-3 mb-4">
            {articlesByCategory["Account & Billing"]?.slice(0, 3).map(article => (
              <li key={article.id} className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                <button 
                  className="text-gray-600 text-left hover:text-indigo-600 transition-colors"
                  onClick={() => viewArticle(article)}
                >
                  <TranslatedText>{article.title}</TranslatedText>
                </button>
              </li>
            ))}
          </ul>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setSearchQuery("Account & Billing")}
          >
            <TranslatedText>View All Articles</TranslatedText>
          </Button>
        </div>
      </div>
    </section>
  );
};
