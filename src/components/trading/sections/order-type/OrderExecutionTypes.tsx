
import React from "react";
import ExecutionTypeCard from "./ExecutionTypeCard";
import { TrendingUp, Timer, StopCircle, BarChart2, ArrowRightLeft, Clock, Layers, Percent } from "lucide-react";

interface OrderExecutionTypesProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
}

const OrderExecutionTypes: React.FC<OrderExecutionTypesProps> = ({
  orderExecutionType,
  setOrderExecutionType
}) => {
  // Enhanced execution type options tailored for sophisticated traders
  const executionTypeOptions = [
    { 
      value: 'market', 
      title: 'Market',
      description: 'Execute at the current market price.',
      icon: TrendingUp,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'limit', 
      title: 'Limit',
      description: 'Execute at a specified price or better.',
      icon: Timer,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'stop', 
      title: 'Stop',
      description: 'Triggers when price reaches stop level.',
      icon: StopCircle,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'stop_limit', 
      title: 'Stop Limit',
      description: 'Combines stop and limit orders.',
      icon: BarChart2,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'trailing_stop', 
      title: 'Trailing Stop',
      description: 'Stop price adjusts as market price changes.',
      icon: ArrowRightLeft,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'iceberg', 
      title: 'Iceberg',
      description: 'Shows only part of the total quantity to the market.',
      icon: Layers,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'pegged', 
      title: 'Pegged',
      description: 'Order price pegged to a reference price.',
      icon: Percent,
      iconColor: 'text-gray-600',
    },
    { 
      value: 'twap', 
      title: 'TWAP',
      description: 'Time-Weighted Average Price execution.',
      icon: Clock,
      iconColor: 'text-gray-600',
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Execution</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {executionTypeOptions.map((option) => {
          const isSelected = orderExecutionType === option.value;
          
          return (
            <div key={option.value} className="h-full">
              <ExecutionTypeCard 
                value={option.value}
                title={option.title}
                description={option.description}
                icon={option.icon}
                iconColor={option.iconColor}
                isSelected={isSelected}
                onClick={setOrderExecutionType}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderExecutionTypes;
