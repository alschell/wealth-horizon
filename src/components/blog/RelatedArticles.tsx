
import React from "react";
import { BlogPost } from "./types";

interface RelatedArticlesProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  goBack: () => void;
  viewBlogPost: (post: BlogPost) => void;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  currentPost,
  allPosts,
  goBack,
  viewBlogPost,
}) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.src = '/assets/dashboard-fallback.png';
  };

  // Filter related posts by category or randomly
  const relatedPosts = allPosts
    .filter(p => p.id !== currentPost.id && (p.category === currentPost.category || Math.random() > 0.5))
    .slice(0, 3);

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(relatedPost => (
          <div 
            key={relatedPost.id} 
            className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              goBack();
              setTimeout(() => viewBlogPost(relatedPost), 0);
            }}
          >
            <div className="h-40 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
              <img 
                src={relatedPost.image} 
                alt={relatedPost.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-4">
              <div className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-1 inline-block mb-2">{relatedPost.category}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{relatedPost.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
