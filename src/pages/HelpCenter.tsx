
import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { HelpCircle } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";
import { Article } from "@/types/help-center";
import { helpArticles } from "@/data/help-articles";
import { ArticleView } from "@/components/help-center/ArticleView";
import { SearchSection } from "@/components/help-center/SearchSection";
import { TopicsSection } from "@/components/help-center/TopicsSection";
import { FAQSection } from "@/components/help-center/FAQSection";
import { SupportSection } from "@/components/help-center/SupportSection";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleFeedback, setArticleFeedback] = useState<Record<string, boolean | null>>({});
  
  // Filter articles based on search query
  const filteredArticles = searchQuery 
    ? helpArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : helpArticles;
  
  // Group articles by category
  const articlesByCategory = filteredArticles.reduce<Record<string, Article[]>>((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Show article content
  const viewArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };
  
  // Go back to article listing
  const goBack = () => {
    setSelectedArticle(null);
  };

  return (
    <PageTemplate
      title={<TranslatedText>Help Center</TranslatedText>}
      description={<TranslatedText>Find answers to common questions and get support using WealthHorizon.</TranslatedText>}
      icon={HelpCircle}
    >
      <div className="space-y-12">
        {!selectedArticle ? (
          <>
            <SearchSection 
              searchQuery={searchQuery} 
              handleSearchChange={handleSearchChange}
              filteredArticles={filteredArticles}
              viewArticle={viewArticle}
            />
            
            {!searchQuery && (
              <>
                <TopicsSection 
                  articlesByCategory={articlesByCategory}
                  viewArticle={viewArticle}
                  setSearchQuery={setSearchQuery}
                />
                
                <FAQSection 
                  articles={helpArticles}
                  viewArticle={viewArticle}
                />
              </>
            )}
            
            <SupportSection />
          </>
        ) : (
          <ArticleView
            article={selectedArticle}
            goBack={goBack}
            articleFeedback={articleFeedback}
            setArticleFeedback={setArticleFeedback}
          />
        )}
      </div>
    </PageTemplate>
  );
};

export default HelpCenter;
