
import React, { useState } from "react";
import { Asset } from "../types";
import { mockPortfoliosByInstitution } from "@/components/trading/data/institutions";
import AvailableAssets from "./assets/AvailableAssets";
import AssetsInScope from "./assets/AssetsInScope";
import TransferActions from "./assets/TransferActions";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-5/12">
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
        
        <div className="md:w-2/12 flex justify-center">
          <TransferActions
            moveAssetsToScope={moveAssetsToScope}
            removeAssetsFromScope={removeAssetsFromScope}
            selectedAssetsCount={selectedAssets.length}
            selectedAssetsForRemovalCount={selectedAssetsForRemoval.length}
          />
        </div>
        
        <div className="md:w-5/12">
          <AssetsInScope
            assetsInScope={assetsInScope}
            selectedAssetsForRemoval={selectedAssetsForRemoval}
            toggleAssetForRemoval={toggleAssetForRemoval}
            totalValue={totalValue}
          />
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          onClick={onNext}
          disabled={assetsInScope.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AssetSelection;
