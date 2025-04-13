
import React from "react";
import { Comment } from "../types";
import { MessageCircle, User } from "lucide-react";

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No comments yet</h3>
        <p className="mt-1 text-gray-500">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">
        Comments ({comments.length})
      </h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <User size={20} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{comment.author}</h4>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
