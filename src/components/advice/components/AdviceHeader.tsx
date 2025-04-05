
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdviceHeaderProps {
  onNewAdvice: () => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ onNewAdvice }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Lightbulb className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Advice</h1>
      </div>
      <Button onClick={onNewAdvice} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        New Advisory Mandate
      </Button>
    </div>
  );
};

export default AdviceHeader;
