import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IndexData } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, BarChart2 } from "lucide-react";
import { AnimationItemProp } from "../types/animationTypes";

export interface IndicesTableProps extends AnimationItemProp {
  indices: IndexData[];
  selectedIndex: IndexData;
  isLoading: boolean;
  onOpenChart: (index: IndexData) => void;
}

const IndicesTable: React.FC<IndicesTableProps> = ({
  indices,
  selectedIndex,
  isLoading,
  onOpenChart,
  item
}) => {
  if (isLoading) {
    return <div className="p-4 text-center text-gray-500">Loading indices...</div>;
  }

  if (indices.length === 0) {
    return <div className="p-4 text-center text-gray-500">No indices found</div>;
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return <ChevronUp className="w-4 h-4 text-green-500" />;
    }
    if (change < 0) {
      return <ChevronDown className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-600";
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  return (
    <div className="overflow-auto max-h-[400px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Change</TableHead>
            <TableHead className="hidden md:table-cell">Region</TableHead>
            <TableHead className="hidden lg:table-cell">Exchange</TableHead>
            <TableHead className="hidden lg:table-cell">Volume</TableHead>
            <TableHead className="text-right">Chart</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {indices.map((index) => (
            <TableRow
              key={index.id}
              className={`${
                selectedIndex.id === index.id ? "bg-gray-100" : ""
              }`}
            >
              <TableCell className="font-medium">{index.symbol}</TableCell>
              <TableCell>
                {index.data?.c?.toFixed(2) || "N/A"}
              </TableCell>
              <TableCell className={getChangeColor(index.data?.dp || 0)}>
                <div className="flex items-center gap-1">
                  {getChangeIndicator(index.data?.dp || 0)}
                  {formatChange(index.data?.dp || 0)}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {index.region || "Global"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {index.exchange || "N/A"}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {index.volume ? `${(index.volume / 1000000).toFixed(1)}M` : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChart(index)}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span className="sr-only">View Chart</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IndicesTable;
