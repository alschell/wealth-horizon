
import React from "react";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { IndexData } from "../types";
import { getCountryFlagCode } from "../data/mockData";

interface IndicesTableProps {
  indices: IndexData[];
  selectedIndex: IndexData | null;
  subscribedIndices: string[];
  handleSelectIndex: (index: IndexData) => void;
  toggleSubscription: (name: string) => void;
}

const IndicesTable: React.FC<IndicesTableProps> = ({
  indices,
  selectedIndex,
  subscribedIndices,
  handleSelectIndex,
  toggleSubscription
}) => {
  if (!indices.length) {
    return (
      <div className="flex justify-center items-center p-8 bg-white rounded-lg">
        <p className="text-gray-500">No indices found matching the current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Index
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Change
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volume
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <AnimatePresence>
              {indices.map((index) => (
                <motion.tr
                  key={index.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => handleSelectIndex(index)}
                  className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedIndex?.id === index.id ? "bg-indigo-50" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                    <span className="font-medium">{index.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <span className="w-6 h-4 mr-2 flex-shrink-0">
                      <img 
                        src={`https://flagcdn.com/w20/${getCountryFlagCode(index.region)}.png`} 
                        alt={`${index.region} flag`}
                        className="w-5 h-auto"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </span>
                    {index.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">
                    {typeof index.value === 'number' ? index.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : index.value}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-mono ${
                    parseFloat(String(index.change)) >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {typeof index.change === 'number' ? index.change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' }) : index.change}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-mono ${
                    parseFloat(String(index.percentChange)) >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    {typeof index.percentChange === 'number' ? `${index.percentChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'always' })}%` : index.percentChange}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">
                    {typeof index.volume === 'number' 
                      ? index.volume >= 1000000000 
                        ? `${(index.volume / 1000000000).toFixed(1)}B` 
                        : index.volume >= 1000000 
                          ? `${(index.volume / 1000000).toFixed(1)}M` 
                          : index.volume.toLocaleString()
                      : index.volume
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubscription(index.name);
                      }}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          subscribedIndices.includes(index.name)
                            ? "fill-yellow-400 text-yellow-400"
                            : ""
                        }`}
                      />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndicesTable;
