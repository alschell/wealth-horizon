
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * AssetClassesCard component displays performance across different asset classes
 * @param {Object} props - Component props
 * @param {Array} props.assetClasses - Array of asset class data objects
 * @returns Asset Classes performance card component
 */
export interface AssetClassesCardProps {
  assetClasses: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const AssetClassesCard: React.FC<AssetClassesCardProps> = ({ assetClasses }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Asset Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assetClasses.map((asset, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{asset.name}</span>
              <span className={`text-sm font-medium ${asset.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {asset.value >= 0 ? '+' : ''}{asset.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
