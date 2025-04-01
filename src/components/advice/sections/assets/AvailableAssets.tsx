
import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Institution } from "@/components/trading/types";
import { Asset } from "../../types";
import { mapPortfolioToAsset } from "../../utils/assetMappings";

interface AvailableAssetsProps {
  institutions: Institution[];
  expandedInstitutions: string[];
  expandedLegalEntities: string[];
  selectedAssets: Asset[];
  assetsOutOfScope: Asset[];
  toggleInstitution: (institutionId: string) => void;
  toggleLegalEntity: (legalEntityId: string) => void;
  toggleAssetSelection: (asset: Asset) => void;
}

const AvailableAssets: React.FC<AvailableAssetsProps> = ({
  institutions,
  expandedInstitutions,
  expandedLegalEntities,
  selectedAssets,
  assetsOutOfScope,
  toggleInstitution,
  toggleLegalEntity,
  toggleAssetSelection
}) => {
  // Helper function to check if an asset is available (not in scope)
  const isAssetAvailable = (assetId: string) => {
    return assetsOutOfScope.some(asset => asset.id === assetId);
  };

  return (
    <div className="border rounded-md p-4 h-full">
      <h3 className="text-lg font-medium mb-4">Available Assets</h3>
      
      <ScrollArea className="h-[360px] pr-4">
        <div className="space-y-2">
          {institutions.map(institution => (
            <div key={institution.id} className="border border-gray-200 rounded-md">
              <div 
                className="flex items-center justify-between p-2.5 bg-gray-50 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleInstitution(institution.id)}
              >
                <span className="font-medium">{institution.name}</span>
                {expandedInstitutions.includes(institution.id) ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              
              {expandedInstitutions.includes(institution.id) && (
                <div className="pl-3">
                  {institution.legalEntities.map(legalEntity => (
                    <div key={legalEntity.id} className="border-t border-gray-200">
                      <div 
                        className="flex items-center justify-between p-2.5 bg-gray-50 cursor-pointer hover:bg-gray-100"
                        onClick={() => toggleLegalEntity(legalEntity.id)}
                      >
                        <span className="font-medium">{legalEntity.name}</span>
                        {expandedLegalEntities.includes(legalEntity.id) ? 
                          <ChevronDown className="h-4 w-4" /> : 
                          <ChevronRight className="h-4 w-4" />
                        }
                      </div>
                      
                      {expandedLegalEntities.includes(legalEntity.id) && (
                        <div className="pl-3">
                          {legalEntity.portfolios
                            .filter(portfolio => isAssetAvailable(portfolio.id))
                            .map(portfolio => {
                              // Add missing properties to portfolio for displaying
                              const portfolioWithValues = {
                                ...portfolio,
                                value: 250000, // Default value for display
                                currency: "USD", // Default currency for display
                                institution: institution.name,
                                custodian: legalEntity.name
                              };
                              
                              const asset = mapPortfolioToAsset(portfolioWithValues);
                              const isSelected = selectedAssets.some(a => a.id === asset.id);
                              
                              return (
                                <div 
                                  key={portfolio.id} 
                                  className={`flex items-center justify-between p-2.5 border-t border-gray-100 cursor-pointer hover:bg-blue-50/30 ${isSelected ? 'bg-blue-50' : ''}`}
                                  onClick={() => toggleAssetSelection(asset)}
                                >
                                  <div>
                                    <div className="font-medium text-sm">{portfolio.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: "USD"
                                      }).format(250000)}
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
                            })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {institutions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No available assets found
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AvailableAssets;
