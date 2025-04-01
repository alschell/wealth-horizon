
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Asset } from "../../types";
import AssetSummary from "./AssetSummary";

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
    <div className="border rounded-md p-4 h-full">
      <h3 className="text-lg font-medium mb-4">Assets in Scope</h3>
      
      <ScrollArea className="h-[360px] pr-4">
        <div className="space-y-2">
          {assetsInScope.length > 0 ? (
            assetsInScope.map(asset => {
              const isSelected = selectedAssetsForRemoval.some(a => a.id === asset.id);
              
              return (
                <div 
                  key={asset.id} 
                  className={`flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-blue-50/30 ${isSelected ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleAssetForRemoval(asset)}
                >
                  <div>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-gray-500">
                      <div>{asset.institution}</div>
                      <div>
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
                    className="h-4 w-4"
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-gray-500">
              No assets added yet
            </div>
          )}
        </div>
      </ScrollArea>
      
      {assetsInScope.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <AssetSummary assetsInScope={assetsInScope} totalValue={totalValue} />
        </div>
      )}
    </div>
  );
};

export default AssetsInScope;
