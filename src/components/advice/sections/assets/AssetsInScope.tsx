
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
    <div className="border rounded-lg shadow-sm p-4 h-full bg-white">
      <h3 className="text-lg font-medium mb-4">Assets in Scope</h3>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {assetsInScope.length > 0 ? (
            assetsInScope.map(asset => {
              const isSelected = selectedAssetsForRemoval.some(a => a.id === asset.id);
              
              return (
                <div 
                  key={asset.id} 
                  className={`flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer transition-colors 
                             hover:bg-blue-50/50 ${isSelected ? 'bg-blue-50' : 'bg-white'}`}
                  onClick={() => toggleAssetForRemoval(asset)}
                >
                  <div className="flex-grow">
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{asset.institution}</span>
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                        <span>{asset.type}</span>
                      </div>
                      <div className="mt-1 font-medium text-gray-700">
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
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-50 rounded-md border border-dashed border-gray-300">
              <p className="mb-2">No assets added yet</p>
              <p className="text-sm">Select assets from the left panel and click "Add" to include them in your scope.</p>
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
