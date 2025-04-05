
import React, { useState, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
            <CardHeader className="p-4 pb-3 border-b">
              <CardTitle className="text-md">AI Financial Assistant</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden flex flex-col">
              <div className="h-full overflow-y-auto">
                <AIAssistant showHeader={false} />
              </div>
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
