
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  isReply?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  placeholder = "Share your thoughts...",
  buttonText = "Post Comment",
  isReply = false
}) => {
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-indigo-600" />
        </div>
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className={`min-h-${isReply ? '16' : '24'}`}
          rows={isReply ? 2 : 3}
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!content.trim()}
          size={isReply ? "sm" : "default"}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};
