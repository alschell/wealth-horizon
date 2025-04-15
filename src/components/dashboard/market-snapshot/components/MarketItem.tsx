
import React from "react";
import { Link } from "react-router-dom";
import { getCountryFlagCode } from "../utils";
import { MarketItem as MarketItemType } from "../types";

interface MarketItemProps {
  item: MarketItemType;
}

const MarketItem: React.FC<MarketItemProps> = ({ item }) => {
  return (
    <Link 
      to="/market-data" 
      className="p-3 rounded-md bg-white hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex items-center mb-1">
        <span className="w-6 h-6 mr-2 flex items-center justify-center">
          {/* Use flag for indices and currencies */}
          {(item.category === "Indices" || item.category === "Currencies") ? (
            <img 
              src={`https://flagcdn.com/w20/${getCountryFlagCode(item.category, item.label)}.png`} 
              alt={`${item.label} flag`}
              className="w-5 h-auto"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            // Use emoji or symbol for other categories
            <span className="text-lg">
              {item.category === "Cryptocurrencies" ? "₿" : 
               item.category === "Commodities" && item.label === "Gold" ? "🥇" : "🛢️"}
            </span>
          )}
        </span>
        <p className="text-sm font-medium">{item.label}</p>
      </div>
      <div className="flex flex-col ml-8">
        <p className="text-sm font-mono font-bold">{item.value}</p>
        <p className={`text-xs font-medium ${
          item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
        }`}>
          {item.change}
        </p>
      </div>
    </Link>
  );
};

export default MarketItem;
