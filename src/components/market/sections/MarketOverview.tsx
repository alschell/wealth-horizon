
import React from "react";
import { motion } from "framer-motion";
import { MarketSummarySection } from "./market-overview/MarketSummarySection";
import { MarketChart } from "./market-overview/MarketChart";
import { CommoditiesSection } from "./market-overview/CommoditiesSection";
import { SectorPerformanceCard } from "./market-overview/SectorPerformanceCard";
import { CommoditiesCard } from "./market-overview/CommoditiesCard";

const MarketOverview = () => {
  // Mock data - in a real app, this would come from an API
  const marketData = [
    { name: "S&P 500", value: "4,587.20", change: 0.85, color: "#555555" },
    { name: "NASDAQ", value: "14,346.30", change: 1.2, color: "#555555" },
    { name: "Dow Jones", value: "36,124.56", change: 0.32, color: "#555555" },
    { name: "FTSE 100", value: "7,582.10", change: -0.32, color: "#777777" },
    { name: "DAX", value: "15,947.80", change: -0.15, color: "#777777" },
    { name: "Nikkei 225", value: "37,156.45", change: 1.45, color: "#555555" },
  ];

  const chartData = [
    { name: "Jan", sp500: 4200, nasdaq: 13200, dowjones: 34800 },
    { name: "Feb", sp500: 4250, nasdaq: 13500, dowjones: 35000 },
    { name: "Mar", sp500: 4100, nasdaq: 13000, dowjones: 34500 },
    { name: "Apr", sp500: 4300, nasdaq: 13800, dowjones: 35200 },
    { name: "May", sp500: 4400, nasdaq: 14000, dowjones: 35500 },
    { name: "Jun", sp500: 4450, nasdaq: 14100, dowjones: 35800 },
    { name: "Jul", sp500: 4500, nasdaq: 14200, dowjones: 36000 },
    { name: "Aug", sp500: 4550, nasdaq: 14300, dowjones: 36100 },
    { name: "Sep", sp500: 4587, nasdaq: 14346, dowjones: 36124 },
  ];

  const chartConfig = {
    sp500: { label: "S&P 500", color: "#333333" },
    nasdaq: { label: "NASDAQ", color: "#666666" },
    dowjones: { label: "Dow Jones", color: "#999999" },
    value: { label: "Value", color: "#666666" }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <MarketSummarySection marketData={marketData} />
      </motion.div>

      <motion.div variants={item}>
        <MarketChart chartData={chartData} chartConfig={chartConfig} />
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectorPerformanceCard />
        <CommoditiesCard />
      </motion.div>
    </motion.div>
  );
};

export default MarketOverview;
