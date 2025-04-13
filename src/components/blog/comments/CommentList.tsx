
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CommentForm } from "./CommentForm";
import { BlogComment } from "../types";
import { User, Reply, ThumbsUp } from "lucide-react";

interface CommentItemProps {
  comment: BlogComment;
  onAddReply: (commentId: number, content: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onAddReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
  };
  
  const handleReply = (content: string) => {
    onAddReply(comment.id, content);
    setShowReplyForm(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0">
          {comment.authorAvatar ? (
            <img 
              src={comment.authorAvatar} 
              alt={comment.author} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <User className="w-6 h-6 text-indigo-600 m-2" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-800">{comment.author}</span>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          
          <div className="flex gap-4 mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-gray-500 hover:text-indigo-600"
              onClick={() => setLiked(!liked)}
            >
              <ThumbsUp size={14} className={liked ? "text-indigo-600" : ""} />
              <span>{liked ? "Liked" : "Like"}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-gray-500 hover:text-indigo-600"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply size={14} />
              <span>Reply</span>
            </Button>
          </div>
          
          {showReplyForm && (
            <div className="mt-3">
              <CommentForm 
                onSubmit={handleReply}
                placeholder="Write a reply..."
                buttonText="Reply"
                isReply
              />
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 ml-5 border-l-2 border-gray-200 pl-4 space-y-4">
              {comment.replies.map(reply => (
                <div key={reply.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0">
                    {reply.authorAvatar ? (
                      <img 
                        src={reply.authorAvatar} 
                        alt={reply.author} 
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    ) : (
                      <User className="w-5 h-5 text-indigo-600 m-1.5" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{reply.author}</span>
                      <span className="text-xs text-gray-500">{reply.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{reply.content}</p>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 mt-1"
                    >
                      <ThumbsUp size={14} />
                      <span>Like</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CommentListProps {
  comments: BlogComment[];
  onAddReply: (commentId: number, content: string) => void;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, onAddReply }) => {
  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <React.Fragment key={comment.id}>
          <CommentItem 
            comment={comment} 
            onAddReply={onAddReply} 
          />
          {index < comments.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};
