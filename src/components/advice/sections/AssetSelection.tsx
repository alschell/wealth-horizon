
import React, { useState, useEffect } from "react";
import { Asset } from "../types";
import { mockPortfoliosByInstitution } from "@/components/trading/data/institutions";
import AvailableAssets from "./assets/AvailableAssets";
import AssetsInScope from "./assets/AssetsInScope";
import TransferActions from "./assets/TransferActions";
import { Button } from "@/components/ui/button";
import { mapPortfolioToAsset } from "../utils/assetMappings";

interface AssetSelectionProps {
  assetsInScope: Asset[];
  assetsOutOfScope: Asset[];
  onAssetToggle: (asset: Asset, inScope: boolean) => void;
}

const AssetSelection: React.FC<AssetSelectionProps> = ({
  assetsInScope,
  assetsOutOfScope,
  onAssetToggle
}) => {
  // Set all institutions and legal entities as expanded by default
  const [expandedInstitutions, setExpandedInstitutions] = useState<string[]>([]);
  const [expandedLegalEntities, setExpandedLegalEntities] = useState<string[]>([]);
  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([]);
  const [selectedAssetsForRemoval, setSelectedAssetsForRemoval] = useState<Asset[]>([]);
  
  // Set all institutions and legal entities expanded by default on mount
  useEffect(() => {
    const institutionIds = mockPortfoliosByInstitution.map(inst => inst.id);
    const legalEntityIds = mockPortfoliosByInstitution.flatMap(inst => 
      inst.legalEntities.map(le => le.id)
    );
    
    setExpandedInstitutions(institutionIds);
    setExpandedLegalEntities(legalEntityIds);
  }, []);
  
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

  return (
    <div className="space-y-8 max-w-[2600px] mx-auto">
      <p className="text-gray-600 mb-8">
        Select the assets you want to include in your investment strategy. You can add or remove assets as needed.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-[48%]">
          <AvailableAssets
            institutions={mockPortfoliosByInstitution}
            expandedInstitutions={expandedInstitutions}
            expandedLegalEntities={expandedLegalEntities}
            selectedAssets={selectedAssets}
            assetsOutOfScope={assetsOutOfScope}
            toggleInstitution={toggleInstitution}
            toggleLegalEntity={toggleLegalEntity}
            toggleAssetSelection={toggleAssetSelection}
          />
        </div>
        
        <div className="md:w-[4%] flex justify-center items-center my-4 md:my-0">
          <TransferActions
            moveAssetsToScope={moveAssetsToScope}
            removeAssetsFromScope={removeAssetsFromScope}
            selectedAssetsCount={selectedAssets.length}
            selectedAssetsForRemovalCount={selectedAssetsForRemoval.length}
          />
        </div>
        
        <div className="md:w-[48%]">
          <AssetsInScope
            assetsInScope={assetsInScope}
            selectedAssetsForRemoval={selectedAssetsForRemoval}
            toggleAssetForRemoval={toggleAssetForRemoval}
            totalValue={totalValue}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetSelection;
