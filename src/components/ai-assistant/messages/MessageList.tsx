
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { MessageType } from "../types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: MessageType[];
  handleActionClick: (message: MessageType) => void;
}

const MessageList = ({ messages, handleActionClick }: MessageListProps) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map(message => (
          <MessageItem 
            key={message.id} 
            message={message} 
            handleActionClick={handleActionClick} 
          />
        ))}
        <div ref={messageEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
