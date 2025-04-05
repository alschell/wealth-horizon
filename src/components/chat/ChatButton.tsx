
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AIAssistant from "@/components/ai-assistant/AIAssistant";

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-20 right-5 z-50 w-96 shadow-xl">
          <Card className="h-[500px] flex flex-col">
            <CardHeader className="px-4 py-3 border-b flex flex-row justify-between items-center">
              <CardTitle className="text-base">AI Financial Assistant</CardTitle>
              <Button size="icon" variant="ghost" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <AIAssistant />
            </CardContent>
          </Card>
        </div>
      )}
      
      <Button
        onClick={toggleChat}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatButton;
