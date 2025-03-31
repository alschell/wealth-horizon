
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface LeverageCardProps {
  value: number;
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  badge: string;
  isSelected: boolean;
  onClick: (value: number) => void;
}

const LeverageCard: React.FC<LeverageCardProps> = ({
  value,
  title,
  description,
  icon: Icon,
  iconColor,
  badge,
  isSelected,
  onClick
}) => {
  // Function to determine badge variant based on leverage value
  const getBadgeVariant = (value: number): "default" | "secondary" | "outline" | "destructive" => {
    if (value <= 1) return "secondary";
    if (value <= 3) return "outline";
    return "destructive";
  };
  
  // Handle card click
  const handleClick = () => {
    console.log("Card clicked with value:", value);
    onClick(value);
  };
  
  return (
    <div className="h-full">
      <Card
        className={`p-4 h-full cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-black bg-white' : 'bg-white hover:bg-gray-50'
        }`}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center text-center h-full justify-center">
          <div className="mb-3">
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <h3 className="font-medium mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {description}
          </p>
          <Badge 
            variant={isSelected ? "default" : getBadgeVariant(value)}
            className={isSelected ? "bg-black text-white" : ""}
          >
            {badge}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(LeverageCard);
