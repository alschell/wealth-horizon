
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { IndexData } from '../types';

interface IndexCardProps {
  index: IndexData;
}

const IndexCard: React.FC<IndexCardProps> = ({ index }) => {
  const isPositive = index.change >= 0;
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{index.name}</h3>
            <p className="text-2xl font-semibold mt-1">{index.value.toLocaleString()}</p>
          </div>
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
            <span className="ml-1">
              {index.change.toFixed(2)} ({index.percentChange.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndexCard;
