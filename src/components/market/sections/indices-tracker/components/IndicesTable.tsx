
import React from "react";
import { Star, TrendingUp, TrendingDown, Search } from "lucide-react";
import { IndexData } from "../types";
import { Button } from "@/components/ui/button";
import { getCountryFlagCode } from "../data/mockData";

interface IndicesTableProps {
  indices: IndexData[];
  selectedIndex: IndexData | null;
  subscribedIndices: string[];
  handleSelectIndex: (index: IndexData) => void;
  toggleSubscription: (indexName: string) => void;
}

const formatValue = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const formatChange = (change: number, percentChange: number) => {
  return `${change >= 0 ? "+" : ""}${formatValue(change)} (${change >= 0 ? "+" : ""}${formatValue(percentChange)}%)`;
};

const IndicesTable: React.FC<IndicesTableProps> = ({
  indices,
  selectedIndex,
  subscribedIndices,
  handleSelectIndex,
  toggleSubscription
}) => {
  // If no indices are available, show loading state
  if (!indices.length) {
    return (
      <div className="py-8 text-center">
        <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">No indices match your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Index
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Country
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {indices.map((index) => (
            <tr
              key={index.id}
              onClick={() => handleSelectIndex(index)}
              className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedIndex?.id === index.id ? "bg-blue-50" : ""
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{index.name}</div>
                    <div className="text-xs text-gray-500">{index.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                {formatValue(index.value)}
              </td>
              <td 
                className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
                  index.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <div className="flex items-center justify-end">
                  {index.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <span>{formatChange(index.change, index.percentChange)}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {index.volume 
                  ? index.volume >= 1000000000
                    ? `${(index.volume / 1000000000).toFixed(1)}B`
                    : index.volume >= 1000000 
                      ? `${(index.volume / 1000000).toFixed(1)}M` 
                      : index.volume.toLocaleString()
                  : 'N/A'
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <div className="flex items-center justify-center space-x-2">
                  {getCountryFlagCode(index.region) !== "globe" ? (
                    <img 
                      src={`https://flagcdn.com/16x12/${getCountryFlagCode(index.region)}.png`} 
                      alt={index.region} 
                      className="h-3" 
                    />
                  ) : null}
                  <span>{index.region}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSubscription(index.name);
                  }}
                >
                  <Star
                    className={`h-4 w-4 ${
                      subscribedIndices.includes(index.name)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndicesTable;
