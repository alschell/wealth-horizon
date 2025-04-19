
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AssetClass {
  name: string;
  value: number;
  color: string;
}

interface AssetClassesCardProps {
  assetClasses: AssetClass[];
}

export const AssetClassesCard: React.FC<AssetClassesCardProps> = ({ assetClasses }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Asset Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assetClasses.map((asset) => (
            <div key={asset.name} className="flex justify-between items-center">
              <span className="font-medium text-sm">{asset.name}</span>
              <div className={`flex items-center ${
                asset.value >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {asset.value >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                <span className="text-xs font-semibold">
                  {asset.value >= 0 ? "+" : ""}{asset.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
