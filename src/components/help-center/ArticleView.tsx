
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Article } from "@/types/help-center";
import { helpArticles } from "@/data/help-articles";
import { useNotifications } from "@/hooks/use-notifications";
import { TranslatedText } from "@/components/ui/translated-text";

interface ArticleViewProps {
  article: Article;
  goBack: () => void;
  articleFeedback: Record<string, boolean | null>;
  setArticleFeedback: (feedback: Record<string, boolean | null>) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  goBack,
  articleFeedback,
  setArticleFeedback,
}) => {
  const { showSuccess } = useNotifications();

  // Handle article feedback
  const handleArticleFeedback = (articleId: string, isHelpful: boolean) => {
    setArticleFeedback({
      ...articleFeedback,
      [articleId]: isHelpful,
    });

    showSuccess(
      isHelpful ? 
        "Thank you for your feedback!" : 
        "We'll try to improve this article",
      isHelpful 
        ? "We're glad this article was helpful." 
        : "Thank you for letting us know. We'll work on making this article more helpful."
    );
  };

  // Get related articles
  const relatedArticles = helpArticles
    .filter(a => 
      a.id !== article.id && 
      (a.category === article.category || 
      a.tags.some(tag => article.tags.includes(tag)))
    )
    .slice(0, 2);

  return (
    <section>
      <Button variant="outline" className="mb-6" onClick={goBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> <TranslatedText>Back to Help Center</TranslatedText>
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl"><TranslatedText>{article.title}</TranslatedText></CardTitle>
          <CardDescription>
            <TranslatedText>Category: </TranslatedText>
            <TranslatedText>{article.category}</TranslatedText>
            <span className="mr-3"></span>
            <TranslatedText>Tags: </TranslatedText>
            <TranslatedText>{article.tags.join(", ")}</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap">
          <div className="text-sm text-gray-500">
            <TranslatedText>Was this article helpful?</TranslatedText>
            <Button 
              variant="outline" 
              size="sm" 
              className={`ml-2 ${articleFeedback[article.id] === true ? 'bg-green-50 border-green-200' : ''}`} 
              onClick={() => handleArticleFeedback(article.id, true)}
              disabled={articleFeedback[article.id] !== undefined}
            >
              <TranslatedText>Yes</TranslatedText>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className={`ml-2 ${articleFeedback[article.id] === false ? 'bg-red-50 border-red-200' : ''}`} 
              onClick={() => handleArticleFeedback(article.id, false)}
              disabled={articleFeedback[article.id] !== undefined}
            >
              <TranslatedText>No</TranslatedText>
            </Button>
          </div>
          <Button variant="outline" onClick={goBack}>
            <TranslatedText>Back to Help Center</TranslatedText>
          </Button>
        </CardFooter>
      </Card>
      
      {relatedArticles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4"><TranslatedText>Related Articles</TranslatedText></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map(a => (
              <Card 
                key={a.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => goBack()}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg"><TranslatedText>{a.title}</TranslatedText></CardTitle>
                  <CardDescription><TranslatedText>{a.shortDescription}</TranslatedText></CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

