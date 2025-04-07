
import React from "react";
import { CardTitle } from "@/components/ui/card";
import { Brain, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAIAssistant } from "./hooks/useAIAssistant";
import MessageList from "./messages/MessageList";
import ChatInputForm from "./messages/ChatInputForm";
import MinifiedAssistant from "./MinifiedAssistant";

interface AIAssistantProps {
  minified?: boolean;
  showHeader?: boolean;
}

const AIAssistant = ({ minified = false, showHeader = false }: AIAssistantProps) => {
  const navigate = useNavigate();
  const { 
    input, 
    setInput, 
    messages, 
    handleActionClick, 
    handleSubmit 
  } = useAIAssistant();

  if (minified) {
    return (
      <MinifiedAssistant
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      {showHeader && (
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <Brain className="h-5 w-5 text-gray-600" />
            </div>
            <CardTitle className="text-base">AI Financial Assistant</CardTitle>
          </div>
          <Button size="icon" variant="ghost" onClick={() => navigate("/dashboard")}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <MessageList 
        messages={messages} 
        handleActionClick={handleActionClick} 
      />
      
      <div className="p-3 border-t mt-auto">
        <ChatInputForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AIAssistant;
