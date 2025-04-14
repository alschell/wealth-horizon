
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdviceHeaderProps {
  onNewAdvice: () => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ onNewAdvice }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        {/* Removed the lightbulb icon and Financial Advice text as requested */}
      </div>
      <Button onClick={onNewAdvice} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        New Advisory Mandate
      </Button>
    </div>
  );
};

export default AdviceHeader;
