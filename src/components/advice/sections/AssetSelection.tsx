
import React, { useState } from "react";
import { Asset } from "../types";
import { mockPortfoliosByInstitution } from "@/components/trading/data/institutions";
import AvailableAssets from "./assets/AvailableAssets";
import AssetsInScope from "./assets/AssetsInScope";
import TransferActions from "./assets/TransferActions";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side - Available assets */}
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
      
      {/* Middle - Action buttons */}
      <TransferActions
        moveAssetsToScope={moveAssetsToScope}
        removeAssetsFromScope={removeAssetsFromScope}
        selectedAssetsCount={selectedAssets.length}
        selectedAssetsForRemovalCount={selectedAssetsForRemoval.length}
      />
      
      {/* Right side - In scope assets */}
      <div className="md:col-start-2 md:row-start-1">
        <AssetsInScope
          assetsInScope={assetsInScope}
          selectedAssetsForRemoval={selectedAssetsForRemoval}
          toggleAssetForRemoval={toggleAssetForRemoval}
          totalValue={totalValue}
        />
      </div>
    </div>
  );
};

export default AssetSelection;
