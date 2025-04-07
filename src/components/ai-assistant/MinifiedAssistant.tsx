
import React from "react";
import { CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import ChatInputForm from "./messages/ChatInputForm";

interface MinifiedAssistantProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const MinifiedAssistant = ({ input, setInput, handleSubmit }: MinifiedAssistantProps) => {
  return (
    <CardContent className="p-4">
      <div className="mb-4">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium">Opportunity</span>
          </div>
          <p className="text-sm">Tesla position up 15% this week. Consider taking profits.</p>
        </div>
      </div>
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </CardContent>
  );
};

export default MinifiedAssistant;
