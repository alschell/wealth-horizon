
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/types/help-center";

interface SearchSectionProps {
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredArticles: Article[];
  viewArticle: (article: Article) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ 
  searchQuery, 
  handleSearchChange, 
  filteredArticles, 
  viewArticle 
}) => {
  return (
    <section className="relative">
      <div className="bg-indigo-50 rounded-xl p-8">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How can we help you today?</h2>
          <p className="text-gray-600 mb-6 w-full">
            Search our knowledge base for quick answers or browse through our help articles.
          </p>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for help articles..." 
              className="pl-10 w-full" 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {searchQuery && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search Results</h2>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredArticles.map(article => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => viewArticle(article)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 text-sm text-gray-500">
                    Category: {article.category} • {article.tags.join(', ')}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-700 mb-2">No results found</p>
              <p className="text-gray-500">Try adjusting your search or browse our categories below</p>
            </div>
          )}
        </section>
      )}
    </section>
  );
};
