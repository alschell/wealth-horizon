
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, LineChart, Star, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndexData } from "../types";
import { getCountryFlagCode } from "../data/mockData";

interface IndicesTableProps {
  indices: IndexData[];
  selectedIndex: IndexData | null;
  subscribedIndices: string[];
  handleSelectIndex: (index: IndexData) => void;
  toggleSubscription: (indexName: string) => void;
}

const IndicesTable: React.FC<IndicesTableProps> = ({
  indices,
  selectedIndex,
  subscribedIndices,
  handleSelectIndex,
  toggleSubscription
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Index</TableHead>
          <TableHead>Last Price</TableHead>
          <TableHead>Change</TableHead>
          <TableHead className="hidden md:table-cell">Volume</TableHead>
          <TableHead className="hidden md:table-cell">Region</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {indices.map((index) => (
          <TableRow 
            key={index.id} 
            className={`hover:bg-gray-50 cursor-pointer ${selectedIndex?.id === index.id ? 'bg-gray-50' : ''}`}
            onClick={() => handleSelectIndex(index)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6">
                  {/* Flag using the region to determine the country code */}
                  <img 
                    src={`https://flagcdn.com/w20/${getCountryFlagCode(index.region)}.png`} 
                    alt={`${index.region} flag`}
                    className="w-5 h-auto"
                    onError={(e) => {
                      // Fallback to globe icon if flag doesn't load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const globe = document.createElement('span');
                        globe.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
                        parent.appendChild(globe);
                      }
                    }}
                  />
                </span>
                {index.name}
              </div>
            </TableCell>
            <TableCell>{index.value}</TableCell>
            <TableCell>
              <div className={`flex items-center ${
                index.change >= 0 ? "text-green-500" : "text-red-500"
              }`}>
                {index.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>
                  {index.change >= 0 ? "+" : ""}{index.change}%
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{index.volume}</TableCell>
            <TableCell className="hidden md:table-cell">{index.region}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectIndex(index);
                  }}
                >
                  <LineChart className="h-4 w-4" />
                  <span className="sr-only">View chart</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-8 w-8 p-0 ${subscribedIndices.includes(index.name) ? 'text-amber-500' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubscription(index.name);
                  }}
                >
                  <Star className="h-4 w-4" fill={subscribedIndices.includes(index.name) ? "currentColor" : "none"} />
                  <span className="sr-only">
                    {subscribedIndices.includes(index.name) ? 'Unsubscribe' : 'Subscribe'}
                  </span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IndicesTable;
