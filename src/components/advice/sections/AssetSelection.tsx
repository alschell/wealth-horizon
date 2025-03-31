
import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Asset } from "../types";
import AssetCard from "./assets/AssetCard";
import AssetFilters from "./assets/AssetFilters";
import AssetSummary from "./assets/AssetSummary";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"out" | "in">("out");
  const [filters, setFilters] = useState({
    assetTypes: [] as string[],
    institutions: [] as string[],
    minValue: 0,
    maxValue: 100000000
  });

  // Filter assets based on search and filters
  const filteredOutOfScopeAssets = assetsOutOfScope.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.custodian.toLowerCase().includes(searchQuery.toLowerCase());
                         
    const matchesTypeFilter = filters.assetTypes.length === 0 || filters.assetTypes.includes(asset.type);
    const matchesInstitutionFilter = filters.institutions.length === 0 || filters.institutions.includes(asset.institution);
    const matchesValueFilter = asset.value >= filters.minValue && asset.value <= filters.maxValue;
    
    return matchesSearch && matchesTypeFilter && matchesInstitutionFilter && matchesValueFilter;
  });
  
  const filteredInScopeAssets = assetsInScope.filter(asset => {
    return asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
           asset.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
           asset.custodian.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Get unique values for filters
  const allAssets = [...assetsInScope, ...assetsOutOfScope];
  const assetTypes = Array.from(new Set(allAssets.map(asset => asset.type)));
  const institutions = Array.from(new Set(allAssets.map(asset => asset.institution)));
  const totalValue = assetsInScope.reduce((total, asset) => total + asset.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "out" ? "default" : "outline"}
            onClick={() => setActiveTab("out")}
            className={activeTab === "out" ? "bg-black text-white" : ""}
          >
            Available Assets
          </Button>
          <Button
            variant={activeTab === "in" ? "default" : "outline"}
            onClick={() => setActiveTab("in")}
            className={activeTab === "in" ? "bg-black text-white" : ""}
          >
            In Scope for Advice ({assetsInScope.length})
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <AssetFilters
          assetTypes={assetTypes}
          institutions={institutions}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <AssetSummary assetsInScope={assetsInScope} totalValue={totalValue} />
      </div>

      <ScrollArea className="h-[400px]">
        {activeTab === "out" ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredOutOfScopeAssets.length > 0 ? (
              filteredOutOfScopeAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  inScope={false}
                  onToggle={() => onAssetToggle(asset, true)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No available assets match your search criteria
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredInScopeAssets.length > 0 ? (
              filteredInScopeAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  inScope={true}
                  onToggle={() => onAssetToggle(asset, false)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No assets in scope for advice yet
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default AssetSelection;
