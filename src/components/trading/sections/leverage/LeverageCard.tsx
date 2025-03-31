
import React, { useCallback, memo } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  // Optimize the click handler with useCallback
  const handleClick = useCallback(() => {
    if (!isSelected) {
      // Use setTimeout to defer setting state
      setTimeout(() => {
        onClick(value);
      }, 0);
    }
  }, [onClick, value, isSelected]);

  // Optimize the keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "border p-4 rounded-lg cursor-pointer transition-all relative h-full",
        isSelected
          ? "ring-2 ring-black bg-gray-50"
          : "hover:bg-gray-50"
      )}
      aria-pressed={isSelected}
    >
      <div className="flex justify-between items-start">
        <div className="w-full"></div>
        <Badge
          variant={value > 1 ? (value > 2 ? "destructive" : "outline") : "secondary"}
          className={value > 3 ? "bg-red-500 text-white" : ""}
        >
          {value}x
        </Badge>
      </div>

      <div className="flex flex-col items-center text-center mt-3">
        <Icon className={cn("h-5 w-5 mb-2", iconColor)} />
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        
        {isSelected && (
          <div className="mt-2 text-xs text-green-600">
            {/* Selected text removed */}
          </div>
        )}
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(LeverageCard);
