
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Article } from "@/types/help-center";

interface FAQSectionProps {
  articles: Article[];
  viewArticle: (article: Article) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ articles, viewArticle }) => {
  return (
    <>
      <Separator className="my-8" />
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 4).map(article => (
            <div 
              key={article.id} 
              className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => viewArticle(article)}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{article.title}</h3>
              <p className="text-gray-600">{article.shortDescription}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
