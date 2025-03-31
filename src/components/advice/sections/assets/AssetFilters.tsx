
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "../../utils/formatters";

interface AssetFiltersProps {
  assetTypes: string[];
  institutions: string[];
  filters: {
    assetTypes: string[];
    institutions: string[];
    minValue: number;
    maxValue: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    assetTypes: string[];
    institutions: string[];
    minValue: number;
    maxValue: number;
  }>>;
  onClose: () => void;
}

const AssetFilters: React.FC<AssetFiltersProps> = ({
  assetTypes,
  institutions,
  filters,
  setFilters,
  onClose
}) => {
  const handleAssetTypeChange = (type: string) => {
    setFilters((prev) => {
      if (prev.assetTypes.includes(type)) {
        return {
          ...prev,
          assetTypes: prev.assetTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          assetTypes: [...prev.assetTypes, type]
        };
      }
    });
  };

  const handleInstitutionChange = (institution: string) => {
    setFilters((prev) => {
      if (prev.institutions.includes(institution)) {
        return {
          ...prev,
          institutions: prev.institutions.filter(i => i !== institution)
        };
      } else {
        return {
          ...prev,
          institutions: [...prev.institutions, institution]
        };
      }
    });
  };

  const handleValueChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minValue: value[0],
      maxValue: value[1]
    }));
  };

  const handleReset = () => {
    setFilters({
      assetTypes: [],
      institutions: [],
      minValue: 0,
      maxValue: 100000000
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filter Assets</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium mb-3">Asset Types</h4>
          <div className="space-y-2">
            {assetTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={filters.assetTypes.includes(type)}
                  onCheckedChange={() => handleAssetTypeChange(type)}
                />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Institutions</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {institutions.map((institution) => (
              <div key={institution} className="flex items-center space-x-2">
                <Checkbox
                  id={`institution-${institution}`}
                  checked={filters.institutions.includes(institution)}
                  onCheckedChange={() => handleInstitutionChange(institution)}
                />
                <label
                  htmlFor={`institution-${institution}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {institution}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Value Range</h4>
          <div className="px-2">
            <Slider
              defaultValue={[filters.minValue, filters.maxValue]}
              max={100000000}
              step={100000}
              onValueChange={handleValueChange}
              className="my-6"
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatCurrency(filters.minValue, "USD")}</span>
              <span>{formatCurrency(filters.maxValue, "USD")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" size="sm" onClick={handleReset} className="mr-2">
          Reset
        </Button>
        <Button onClick={onClose} size="sm" className="bg-black hover:bg-gray-800 text-white">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
};

export default AssetFilters;
