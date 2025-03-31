
import React from "react";
import ExecutionTypeCard from "./ExecutionTypeCard";
import { TrendingUp, Timer, StopCircle, BarChart2, ArrowRightLeft, Clock } from "lucide-react";

interface OrderExecutionTypesProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
}

const OrderExecutionTypes: React.FC<OrderExecutionTypesProps> = ({
  orderExecutionType,
  setOrderExecutionType
}) => {
  // Define execution type options with more sophisticated choices
  const executionTypeOptions = [
    { 
      value: 'market', 
      title: 'Market',
      description: 'Execute at the current market price.',
      icon: TrendingUp,
      iconColor: 'text-green-600',
    },
    { 
      value: 'limit', 
      title: 'Limit',
      description: 'Execute at a specified price or better.',
      icon: Timer,
      iconColor: 'text-blue-600',
    },
    { 
      value: 'stop', 
      title: 'Stop',
      description: 'Triggers when price reaches stop level.',
      icon: StopCircle,
      iconColor: 'text-amber-600',
    },
    { 
      value: 'stop_limit', 
      title: 'Stop Limit',
      description: 'Combines stop and limit orders.',
      icon: BarChart2,
      iconColor: 'text-purple-600',
    },
    { 
      value: 'trailing_stop', 
      title: 'Trailing Stop',
      description: 'Stop price adjusts as market price changes.',
      icon: ArrowRightLeft,
      iconColor: 'text-indigo-600',
    },
    { 
      value: 'iceberg', 
      title: 'Iceberg',
      description: 'Shows only part of the total quantity to the market.',
      icon: Clock,
      iconColor: 'text-cyan-600',
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Execution</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
