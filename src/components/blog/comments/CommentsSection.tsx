
import React, { useState } from "react";
import { Comment } from "../types";
import { CommentList } from "./CommentList";
import { CommentForm } from "./CommentForm";

interface CommentsSectionProps {
  postId: number;
  initialComments?: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ 
  postId,
  initialComments = [] 
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const handleAddComment = (newComment: Comment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className="space-y-8 mt-8">
      <CommentForm postId={postId} onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
};
