
import React, { useState } from "react";
import { ChevronRight, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Asset } from "../types";
import AssetSummary from "./assets/AssetSummary";
import { mockPortfoliosByInstitution } from "@/components/trading/data/institutions";
import { Asset as AssetType, AssetType as AssetTypeEnum } from "../types";

interface AssetSelectionProps {
  assetsInScope: Asset[];
  assetsOutOfScope: Asset[];
  onAssetToggle: (asset: Asset, inScope: boolean) => void;
  onNext: () => void;
}

const AssetSelection: React.FC<AssetSelectionProps> = ({
  assetsInScope,
  assetsOutOfScope,
  onAssetToggle,
  onNext
}) => {
  const [expandedInstitutions, setExpandedInstitutions] = useState<string[]>([]);
  const [expandedLegalEntities, setExpandedLegalEntities] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedAssetsForRemoval, setSelectedAssetsForRemoval] = useState<Asset[]>([]);
  
  const totalValue = assetsInScope.reduce((total, asset) => total + asset.value, 0);

  const toggleInstitution = (institutionId: string) => {
    setExpandedInstitutions(prev => 
      prev.includes(institutionId)
        ? prev.filter(id => id !== institutionId)
        : [...prev, institutionId]
    );
  };

  const toggleLegalEntity = (legalEntityId: string) => {
    setExpandedLegalEntities(prev => 
      prev.includes(legalEntityId)
        ? prev.filter(id => id !== legalEntityId)
        : [...prev, legalEntityId]
    );
  };

  const toggleAssetSelection = (asset: Asset) => {
    setSelectedAssets(prev => 
      prev.some(a => a.id === asset.id)
        ? prev.filter(a => a.id !== asset.id)
        : [...prev, asset]
    );
  };

  const toggleAssetForRemoval = (asset: Asset) => {
    setSelectedAssetsForRemoval(prev => 
      prev.some(a => a.id === asset.id)
        ? prev.filter(a => a.id !== asset.id)
        : [...prev, asset]
    );
  };

  const moveAssetsToScope = () => {
    selectedAssets.forEach(asset => {
      onAssetToggle(asset, true);
    });
    setSelectedAssets([]);
  };

  const removeAssetsFromScope = () => {
    selectedAssetsForRemoval.forEach(asset => {
      onAssetToggle(asset, false);
    });
    setSelectedAssetsForRemoval([]);
  };

  // Helper function to check if an asset is available (not in scope)
  const isAssetAvailable = (assetId: string) => {
    return assetsOutOfScope.some(asset => asset.id === assetId);
  };

  // Map portfolios to asset structure
  const mapPortfolioToAsset = (portfolio: any): AssetType => {
    return {
      id: portfolio.id,
      name: portfolio.name,
      type: "fund" as AssetTypeEnum, // Changed from "portfolio" to "fund" which is a valid AssetTypeEnum
      value: portfolio.value || 0,
      currency: portfolio.currency || "USD",
      institution: portfolio.institution || "",
      custodian: portfolio.custodian || "",
      lastUpdated: new Date().toISOString()
    };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Available assets */}
      <div className="border rounded-md p-4">
        <h3 className="text-lg font-medium mb-4">Available Assets</h3>
        
        <ScrollArea className="h-[480px] pr-4">
          <div className="space-y-4">
            {mockPortfoliosByInstitution.map(institution => (
              <div key={institution.id} className="border border-gray-200 rounded-md">
                <div 
                  className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                  onClick={() => toggleInstitution(institution.id)}
                >
                  <span className="font-medium">{institution.name}</span>
                  {expandedInstitutions.includes(institution.id) ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </div>
                
                {expandedInstitutions.includes(institution.id) && (
                  <div className="pl-6">
                    {institution.legalEntities.map(legalEntity => (
                      <div key={legalEntity.id} className="border-t border-gray-200">
                        <div 
                          className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                          onClick={() => toggleLegalEntity(legalEntity.id)}
                        >
                          <span className="font-medium">{legalEntity.name}</span>
                          {expandedLegalEntities.includes(legalEntity.id) ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </div>
                        
                        {expandedLegalEntities.includes(legalEntity.id) && (
                          <div className="pl-6">
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
                                    className={`flex items-center justify-between p-3 border-t border-gray-200 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                                    onClick={() => toggleAssetSelection(asset)}
                                  >
                                    <div>
                                      <div className="font-medium">{portfolio.name}</div>
                                      <div className="text-sm text-gray-500">
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
          </div>
        </ScrollArea>
      </div>
      
      {/* Middle - Action buttons */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <div className="space-y-4">
          <Button 
            onClick={moveAssetsToScope}
            disabled={selectedAssets.length === 0}
            variant="outline"
            className="w-12 h-12 p-0 rounded-full"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            onClick={removeAssetsFromScope}
            disabled={selectedAssetsForRemoval.length === 0}
            variant="outline"
            className="w-12 h-12 p-0 rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile action buttons */}
      <div className="flex md:hidden justify-center space-x-4 my-4">
        <Button 
          onClick={moveAssetsToScope}
          disabled={selectedAssets.length === 0}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
        <Button 
          onClick={removeAssetsFromScope}
          disabled={selectedAssetsForRemoval.length === 0}
          variant="outline"
          className="w-12 h-12 p-0 rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Right side - In scope assets */}
      <div className="border rounded-md p-4 md:col-start-2 md:row-start-1">
        <h3 className="text-lg font-medium mb-4">Assets in Scope</h3>
        
        <ScrollArea className="h-[360px] pr-4">
          <div className="space-y-2">
            {assetsInScope.length > 0 ? (
              assetsInScope.map(asset => {
                const isSelected = selectedAssetsForRemoval.some(a => a.id === asset.id);
                
                return (
                  <div 
                    key={asset.id} 
                    className={`flex items-center justify-between p-3 border border-gray-200 rounded-md ${isSelected ? 'bg-blue-50' : ''}`}
                    onClick={() => toggleAssetForRemoval(asset)}
                  >
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:gap-2">
                        <span>{asset.institution}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: asset.currency
                          }).format(asset.value)}
                        </span>
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
              <div className="text-center py-8 text-gray-500">
                No assets added yet
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="mt-6 pt-4 border-t">
          <AssetSummary assetsInScope={assetsInScope} totalValue={totalValue} />
        </div>
      </div>
    </div>
  );
};

export default AssetSelection;
