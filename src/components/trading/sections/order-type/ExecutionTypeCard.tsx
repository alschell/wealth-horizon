
import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ExecutionTypeCardProps {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  isSelected: boolean;
  onClick: (value: string) => void;
}

const ExecutionTypeCard: React.FC<ExecutionTypeCardProps> = ({
  value,
  title,
  description,
  icon: Icon,
  iconColor,
  isSelected,
  onClick
}) => {
  return (
    <Card
      onClick={() => onClick(value)}
      className={`p-4 h-full cursor-pointer transition-all ${
        isSelected 
          ? 'ring-2 ring-black bg-white' 
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex flex-col items-center text-center h-full justify-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
          isSelected ? 'bg-black' : 'bg-gray-100'
        }`}>
          <Icon className={`h-5 w-5 ${isSelected ? 'text-white' : iconColor}`} />
        </div>
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-xs text-gray-600">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default ExecutionTypeCard;
