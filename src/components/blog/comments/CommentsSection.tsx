
import React, { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { BlogComment } from "../types";

// Sample comments data
const sampleComments: BlogComment[] = [
  {
    id: 1,
    author: "Alex Thompson",
    authorAvatar: "/assets/dashboard-preview.png",
    date: "April 10, 2025",
    content: "This is a really insightful analysis. I've been seeing similar trends in our family office portfolio, especially regarding the shift toward private credit in the current rate environment.",
    replies: [
      {
        id: 11,
        author: "Sarah Chen",
        authorAvatar: "/assets/dashboard-fallback.png",
        date: "April 10, 2025",
        content: "Thank you for your comment, Alex. I'm glad the article resonated with your experience. Would be interested to hear more about your specific approach to private credit if you're open to sharing."
      }
    ]
  },
  {
    id: 2,
    author: "Michael Davis",
    authorAvatar: "/assets/dashboard-fallback.png",
    date: "April 8, 2025",
    content: "Great perspective on the changing regulatory landscape. We've been implementing many of these compliance strategies over the past year and it's definitely making a difference in our operations."
  },
  {
    id: 3,
    author: "Jennifer Wu",
    authorAvatar: "/assets/dashboard-preview.png",
    date: "April 7, 2025",
    content: "I'd be interested in seeing more content about how family offices are incorporating AI tools into their investment decision processes. Our team has been exploring several platforms but we're still early in the journey."
  }
];

interface CommentsSectionProps {
  postId: number;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<BlogComment[]>(sampleComments);
  
  // Add a new comment
  const addComment = (content: string) => {
    const newComment: BlogComment = {
      id: comments.length + 1,
      author: "Guest User",
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content
    };
    
    setComments([...comments, newComment]);
  };
  
  // Add a reply to a comment
  const addReply = (commentId: number, content: string) => {
    const newReply: BlogComment = {
      id: Date.now(),
      author: "Guest User",
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      content
    };
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Discussion ({comments.length})</h2>
      
      <CommentForm onSubmit={addComment} />
      
      <CommentList 
        comments={comments} 
        onAddReply={addReply}
      />
    </section>
  );
};
