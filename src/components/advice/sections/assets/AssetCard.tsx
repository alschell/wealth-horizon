
import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { Asset } from "../../types";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, Building, Briefcase } from "lucide-react";

interface AssetCardProps {
  asset: Asset;
  inScope: boolean;
  onToggle: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, inScope, onToggle }) => {
  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "equity":
        return "📈";
      case "bond":
        return "📜";
      case "fund":
        return "🏦";
      case "etf":
        return "📊";
      case "alternative":
        return "🔄";
      case "cash":
        return "💵";
      default:
        return "📋";
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full mr-3 text-lg">
            {getAssetTypeIcon(asset.type)}
          </div>
          <div>
            <h3 className="font-medium">{asset.name}</h3>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <span className="capitalize mr-2">{asset.type}</span>
              <span className="text-gray-400 mx-1">•</span>
              <span>{formatCurrency(asset.value, asset.currency)}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={onToggle}
          variant={inScope ? "outline" : "default"}
          size="sm"
          className={inScope ? "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-700" : "bg-black text-white hover:bg-gray-800"}
        >
          {inScope ? (
            <>
              <MinusCircle className="h-4 w-4 mr-2" />
              Remove
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add to Scope
            </>
          )}
        </Button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Institution: </span>
          <span className="ml-1 font-medium">{asset.institution}</span>
        </div>
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Custodian: </span>
          <span className="ml-1 font-medium">{asset.custodian}</span>
        </div>
        {asset.quantity && (
          <div className="col-span-2">
            <span className="text-gray-600">Quantity: </span>
            <span className="font-medium">{asset.quantity.toLocaleString()}</span>
          </div>
        )}
        <div className="col-span-2">
          <span className="text-gray-600">Last Updated: </span>
          <span className="font-medium">{new Date(asset.lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
