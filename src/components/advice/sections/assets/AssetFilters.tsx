
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "@/utils/icons";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface AssetFiltersProps {
  onFilterChange: (filters: any) => void;
}

const AssetFilters: React.FC<AssetFiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="flex-1">
        <Input 
          placeholder="Search by name or ticker..." 
          className="w-full"
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      
      <div className="flex gap-2">
        <Select defaultValue="all" onValueChange={(value) => onFilterChange({ assetClass: value })}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Asset Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Asset Classes</SelectItem>
            <SelectItem value="equity">Equities</SelectItem>
            <SelectItem value="fixed_income">Fixed Income</SelectItem>
            <SelectItem value="real_estate">Real Estate</SelectItem>
            <SelectItem value="alternative">Alternatives</SelectItem>
            <SelectItem value="cash">Cash & Equivalents</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => onFilterChange({ showAdvanced: true })}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Advanced Filters</span>
        </Button>
      </div>
    </div>
  );
};

export default AssetFilters;
