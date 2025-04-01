
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
    return !assetsOutOfScope.some(asset => asset.id === assetId);
  };

  // Generate random value for each portfolio (for demonstration)
  const getRandomValue = (min = 100000, max = 5000000) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const currencies = ["USD", "EUR", "GBP", "CHF"];
  const getRandomCurrency = () => {
    return currencies[Math.floor(Math.random() * currencies.length)];
  };

  return (
    <div className="border rounded-xl shadow-lg p-6 h-[600px] bg-white">
      <h3 className="text-xl font-semibold mb-6">Available Assets</h3>
      
      <ScrollArea className="h-[540px] pr-4">
        <div className="space-y-5">
          {institutions.map(institution => (
            <div key={institution.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div 
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleInstitution(institution.id)}
              >
                <span className="font-semibold text-gray-800 text-lg">{institution.name}</span>
                {expandedInstitutions.includes(institution.id) ? 
                  <ChevronDown className="h-5 w-5 text-gray-500" /> : 
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                }
              </div>
              
              {expandedInstitutions.includes(institution.id) && (
                <div className="pl-2">
                  {institution.legalEntities.map(legalEntity => (
                    <div key={legalEntity.id} className="border-t border-gray-100">
                      <div 
                        className="flex items-center justify-between p-3 bg-gray-50/50 cursor-pointer hover:bg-gray-100/60 transition-colors"
                        onClick={() => toggleLegalEntity(legalEntity.id)}
                      >
                        <span className="font-medium text-gray-700 text-base">{legalEntity.name}</span>
                        {expandedLegalEntities.includes(legalEntity.id) ? 
                          <ChevronDown className="h-4 w-4 text-gray-500" /> : 
                          <ChevronRight className="h-4 w-4 text-gray-500" />
                        }
                      </div>
                      
                      {expandedLegalEntities.includes(legalEntity.id) && (
                        <div className="p-2">
                          {legalEntity.portfolios.map(portfolio => {
                            // Generate random value and currency for display
                            const value = getRandomValue();
                            const currency = getRandomCurrency();
                            
                            // Add missing properties to portfolio for displaying
                            const portfolioWithValues = {
                              ...portfolio,
                              value,
                              currency,
                              institution: institution.name,
                              custodian: legalEntity.name
                            };
                            
                            const asset = mapPortfolioToAsset(portfolioWithValues);
                            const isSelected = selectedAssets.some(a => a.id === asset.id);
                            const isInScope = assetsOutOfScope.some(a => a.id === asset.id);
                            
                            // Skip if already in scope
                            if (isInScope) return null;
                            
                            return (
                              <div 
                                key={portfolio.id} 
                                className={`flex items-center justify-between p-5 mb-2 border border-gray-200 rounded-lg cursor-pointer transition-all hover:shadow-md duration-150 ${isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'}`}
                                onClick={() => toggleAssetSelection(asset)}
                              >
                                <div className="flex-grow">
                                  <div className="font-medium text-gray-900">{portfolio.name}</div>
                                  <div className="text-sm text-gray-500 mt-2 flex items-center">
                                    <span className="text-gray-700">{institution.name}</span>
                                    <span className="mx-2 w-1 h-1 bg-gray-400 rounded-full inline-block"></span>
                                    <span>{legalEntity.name}</span>
                                  </div>
                                  <div className="mt-2 font-semibold text-gray-800">
                                    {new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: currency
                                    }).format(value)}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <input 
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {}}
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                  />
                                </div>
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
            <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <p className="text-lg font-medium mb-2">No available assets found</p>
              <p className="text-sm">Please check back later or contact support for assistance.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AvailableAssets;
