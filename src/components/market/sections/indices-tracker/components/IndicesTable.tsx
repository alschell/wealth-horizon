
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas, formatPercentage } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimationItemProp } from "../types/animationTypes";
import { motion } from "framer-motion";

export interface IndexItem {
  symbol: string;
  name: string;
  country: string;
  region: string;
  exchange: string;
  value: number;
  change: number;
  volume: number;
  isUp?: boolean;
}

interface IndicesTableProps extends AnimationItemProp {
  indices: IndexItem[];
  isLoading: boolean;
  onOpenChart: (index: IndexItem) => void;
}

const IndicesTable: React.FC<IndicesTableProps> = ({ 
  indices, 
  isLoading, 
  onOpenChart,
  item 
}) => {
  if (isLoading) {
    return (
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="hidden md:table-cell">Country/Region</TableHead>
              <TableHead className="hidden lg:table-cell">Exchange</TableHead>
              <TableHead className="hidden lg:table-cell">Volume</TableHead>
              <TableHead className="text-right">Chart</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-28" /></TableCell>
                <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="hidden lg:table-cell"><Skeleton className="h-5 w-20" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-9 w-9 rounded-md ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!indices.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">No indices found</p>
          <p className="text-sm text-gray-400 mt-1">Try changing your filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={item} className="w-full overflow-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="hidden md:table-cell">Country/Region</TableHead>
            <TableHead className="hidden lg:table-cell">Exchange</TableHead>
            <TableHead className="hidden lg:table-cell">Volume</TableHead>
            <TableHead className="text-right">Chart</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {indices.map((index) => (
            <TableRow 
              key={index.symbol} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onOpenChart(index)}
            >
              <TableCell>
                <div className="font-medium">{index.name}</div>
                <div className="text-xs text-gray-500">{index.symbol}</div>
              </TableCell>
              <TableCell className="font-mono">
                {formatNumberWithCommas(index.value)}
              </TableCell>
              <TableCell>
                <div className={`flex items-center ${
                  index.change >= 0 ? "text-green-500" : "text-red-500"
                }`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{formatPercentage(index.change)}%</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {index.country}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {index.exchange}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {index.volume ? (
                  `${index.volume.toFixed(1)}M`
                ) : (
                  <Badge variant="outline" className="text-xs">N/A</Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenChart(index);
                  }}
                >
                  <LineChart className="h-4 w-4" />
                  <span className="sr-only">View chart</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default IndicesTable;
