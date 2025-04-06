
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookmarkPlus, Share2, ExternalLink } from "lucide-react";
import { NewsCard } from "../components/NewsCard";

const NewsSection = () => {
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Expanded news data with more items - would come from API in real app
  const newsItems = [
    {
      id: "1",
      title: "Fed signals potential rate cuts later this year as inflation cools",
      summary: "Federal Reserve officials indicated they're getting closer to cutting interest rates as inflation shows signs of returning to their 2% target.",
      source: "Financial Times",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=FT",
      category: "markets",
      datePublished: "2h ago",
      isBreaking: true,
      url: "#"
    },
    {
      id: "2",
      title: "Tech stocks rally on positive earnings outlook from major players",
      summary: "Technology shares led a market rally after several major companies reported better-than-expected quarterly results and raised their annual forecasts.",
      source: "Wall Street Journal",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=WSJ",
      category: "stocks",
      datePublished: "4h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "3",
      title: "Oil prices retreat as supply concerns ease following diplomatic progress",
      summary: "Crude oil futures declined after diplomatic efforts reduced geopolitical tensions in key oil-producing regions, easing supply disruption fears.",
      source: "Bloomberg",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Bloomberg",
      category: "commodities",
      datePublished: "6h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "4",
      title: "European Central Bank holds rates steady, signals patience on easing",
      summary: "The ECB maintained its key interest rates unchanged while suggesting it would take a cautious approach to future rate cuts despite slowing inflation.",
      source: "Reuters",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Reuters",
      category: "markets",
      datePublished: "8h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "5",
      title: "Major pharmaceutical merger creates industry giant in $80 billion deal",
      summary: "Two leading pharmaceutical companies announced a merger agreement that will create one of the world's largest healthcare corporations.",
      source: "CNBC",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=CNBC",
      category: "stocks",
      datePublished: "10h ago",
      isBreaking: true,
      url: "#"
    },
    {
      id: "6",
      title: "Gold reaches record high amid economic uncertainty and central bank buying",
      summary: "Gold prices touched an all-time high as investors sought safe-haven assets amid economic uncertainties and continued central bank purchases.",
      source: "Market Watch",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=MarketWatch",
      category: "commodities",
      datePublished: "12h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "7",
      title: "Global supply chain disruptions impact semiconductor availability",
      summary: "Ongoing disruptions in global supply chains are causing shortages of critical semiconductor components, affecting multiple industries.",
      source: "The Economist",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Economist",
      category: "markets",
      datePublished: "1d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "8",
      title: "Renewable energy investments reach new highs in first quarter",
      summary: "Global investments in renewable energy projects hit record levels in Q1 2025, driven by policy incentives and corporate sustainability targets.",
      source: "Financial Times",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=FT",
      category: "stocks",
      datePublished: "1d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "9",
      title: "Housing market shows signs of cooling after two years of rapid growth",
      summary: "Latest data indicates a slowdown in housing price growth in major markets, with analysts suggesting a normalization rather than a sharp correction.",
      source: "Wall Street Journal",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=WSJ",
      category: "markets",
      datePublished: "2d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "10",
      title: "Agriculture futures surge on adverse weather reports",
      summary: "Wheat, corn and soybean futures rose sharply following forecasts of adverse weather conditions in key growing regions, raising supply concerns.",
      source: "Bloomberg",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Bloomberg",
      category: "commodities",
      datePublished: "2d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "11",
      title: "Major tech company announces ambitious AI investment plan",
      summary: "A leading technology corporation has unveiled a $10 billion investment plan focused on artificial intelligence development over the next five years.",
      source: "CNBC",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=CNBC",
      category: "stocks",
      datePublished: "3d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "12",
      title: "Central banks worldwide accumulate gold at fastest pace in decades",
      summary: "Global central banks are purchasing gold at the fastest rate in 50 years, diversifying reserves away from traditional currencies.",
      source: "Reuters",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Reuters",
      category: "commodities",
      datePublished: "3d ago",
      isBreaking: false,
      url: "#"
    }
  ];
  
  const filteredNews = newsItems.filter(item => {
    if (category !== "all" && item.category !== category) return false;
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
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
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Financial News</h2>
          <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
            <TabsList>
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="markets">Markets</TabsTrigger>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="commodities">Commodities</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search news..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white" 
          />
        </div>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map(news => (
          <NewsCard key={news.id} news={news} />
        ))}
      </motion.div>
      
      <motion.div variants={item} className="flex justify-center">
        <Button>Load More News</Button>
      </motion.div>
    </motion.div>
  );
};

export default NewsSection;
