
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, LineChart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndexData } from "../types";

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
            <TableCell className="font-medium">{index.name}</TableCell>
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
