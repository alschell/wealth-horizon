
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sliders, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionHeader from "../SectionHeader";
import { Link } from "react-router-dom";
import { useMarketSnapshot } from "./hooks/useMarketSnapshot";
import MarketItemsGrid from "./components/MarketItemsGrid";
import CustomizeDialog from "./components/CustomizeDialog";

const MarketSnapshot = () => {
  const {
    isCustomizing,
    setIsCustomizing,
    filteredAndOrderedItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    temporarySelection,
    temporaryOrder,
    toggleItem,
    handleDragEnd
  } = useMarketSnapshot();

  return (
    <Card className="shadow-sm h-[350px]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <SectionHeader title="Market Snapshot" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleCustomizeOpen}
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 h-[calc(350px-80px)] flex flex-col">
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="grid grid-cols-2 gap-3">
            {filteredAndOrderedItems.map(item => (
              <div 
                key={item.id}
                className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">{item.value}</span>
                    <span className={`text-xs flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {item.change >= 0 ? '+' : ''}{item.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="pt-4 mt-auto">
          <Link to="/market-data">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Market Data
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <CustomizeDialog 
          isOpen={isCustomizing}
          onOpenChange={setIsCustomizing}
          temporarySelection={temporarySelection}
          temporaryOrder={temporaryOrder}
          onToggle={toggleItem}
          onDragEnd={handleDragEnd}
          onSave={handleCustomizeSave}
        />
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
