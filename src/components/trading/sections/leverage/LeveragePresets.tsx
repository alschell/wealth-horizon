
import React, { useMemo, useCallback, memo } from "react";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import LeverageCard from "./LeverageCard";

interface LeverageOption {
  value: number;
  title: string;
  icon: any;
  iconColor: string;
  description: string;
  badge: string;
}

interface LeveragePresetsProps {
  leverage: number;
  setLeverage: (value: number) => void;
}

const LeveragePresets: React.FC<LeveragePresetsProps> = ({
  leverage,
  setLeverage
}) => {
  // Define preset leverage options with useMemo to prevent recreating on each render
  const leverageOptions = useMemo(() => [
    { 
      value: 1, 
      title: "No Leverage (1x)", 
      icon: Shield, 
      iconColor: "text-gray-600", 
      description: "Standard trading with your available capital.", 
      badge: "Conservative" 
    },
    { 
      value: 2, 
      title: "Moderate (2x)", 
      icon: TrendingUp, 
      iconColor: "text-gray-600", 
      description: "Double your buying power with moderate risk.", 
      badge: "Standard" 
    },
    { 
      value: 5, 
      title: "Advanced (5x)", 
      icon: AlertTriangle, 
      iconColor: "text-gray-600", 
      description: "Quintuple your position size with higher risk.", 
      badge: "High Risk" 
    }
  ], []);

  // Optimized card click handler with performance improvements
  const handleCardClick = useCallback((value: number) => {
    // Only update if the value has changed
    if (leverage !== value) {
      // Use requestAnimationFrame for smoother UI updates
      requestAnimationFrame(() => {
        setLeverage(value);
      });
    }
  }, [setLeverage, leverage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {leverageOptions.map((option) => (
        <LeverageCard
          key={option.value}
          value={option.value}
          title={option.title}
          description={option.description}
          icon={option.icon}
          iconColor={option.iconColor}
          badge={option.badge}
          isSelected={leverage === option.value}
          onClick={handleCardClick}
        />
      ))}
    </div>
  );
};

export default memo(LeveragePresets);
