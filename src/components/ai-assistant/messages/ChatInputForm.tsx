
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "@/utils/icons";

interface ChatInputFormProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ChatInputForm = ({ input, setInput, handleSubmit }: ChatInputFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          window.innerWidth < 640 
            ? "Ask your AI assistant..." 
            : "Ask anything about your portfolio or the market..."
        }
        className="flex-1"
      />
      <Button type="submit" size="icon">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInputForm;
