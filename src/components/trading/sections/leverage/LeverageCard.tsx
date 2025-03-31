
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
  // Optimize the click handler with useCallback and event handling improvements
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Stop event propagation to prevent bubbling
    e.preventDefault();
    e.stopPropagation();
    
    // Use requestAnimationFrame to defer setting state
    requestAnimationFrame(() => {
      onClick(value);
    });
  }, [onClick, value]);

  // Optimize the keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
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
        <div className={cn("p-2 rounded-full bg-white", iconColor)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <Badge
          variant={value > 1 ? (value > 2 ? "destructive" : "outline") : "secondary"}
          className={value > 3 ? "bg-red-500 text-white" : ""}
        >
          {value}x
        </Badge>
      </div>

      <div className="mt-3">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        
        {isSelected && (
          <div className="mt-2 text-xs text-green-600">
            Selected
          </div>
        )}
      </div>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(LeverageCard);
