
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Asset } from "../../types";
import AssetSummary from "./AssetSummary";
import { Card } from "@/components/ui/card";

interface AssetsInScopeProps {
  assetsInScope: Asset[];
  selectedAssetsForRemoval: Asset[];
  toggleAssetForRemoval: (asset: Asset) => void;
  totalValue: number;
}

const AssetsInScope: React.FC<AssetsInScopeProps> = ({
  assetsInScope,
  selectedAssetsForRemoval,
  toggleAssetForRemoval,
  totalValue
}) => {
  return (
    <Card className="rounded-xl shadow-lg p-8 h-[700px] bg-white flex flex-col">
      <h3 className="text-xl font-semibold mb-6">Assets in Scope</h3>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        <ScrollArea className="flex-grow mb-6 pr-4">
          <div className="space-y-4">
            {assetsInScope.length > 0 ? (
              assetsInScope.map(asset => {
                const isSelected = selectedAssetsForRemoval.some(a => a.id === asset.id);
                
                return (
                  <div 
                    key={asset.id} 
                    className={`flex items-center justify-between p-6 border border-gray-200 rounded-lg cursor-pointer transition-all 
                             hover:shadow-md ${isSelected ? 'bg-gray-100 border-gray-300' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => toggleAssetForRemoval(asset)}
                  >
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900">{asset.name}</div>
                      <div className="text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">{asset.institution}</span>
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                          <span className="capitalize">{asset.type}</span>
                        </div>
                        <div className="mt-2 font-semibold text-gray-800">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: asset.currency
                          }).format(asset.value)}
                        </div>
                      </div>
                    </div>
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="h-5 w-5 rounded border-gray-300 text-gray-600 focus:ring-gray-500 ml-4"
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-6 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-lg font-medium mb-3">No assets added yet</p>
                <p className="text-sm text-center max-w-md">Select assets from the available assets panel and click the arrow to include them in your investment scope.</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Summary section is outside the ScrollArea, making it static */}
        {assetsInScope.length > 0 && (
          <div className="mt-auto">
            <AssetSummary assetsInScope={assetsInScope} totalValue={totalValue} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default AssetsInScope;
