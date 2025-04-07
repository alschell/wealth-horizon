
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sliders, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

// Categorized market items
const marketItems = [
  // Indices
  { id: "sp500", label: "S&P 500", value: "4,400.50", change: "+0.25%", emoji: "📈", category: "Indices" },
  { id: "nasdaq", label: "Nasdaq", value: "13,630.75", change: "-0.10%", emoji: "📊", category: "Indices" },
  { id: "dowjones", label: "Dow Jones", value: "34,500.20", change: "+0.15%", emoji: "📉", category: "Indices" },
  { id: "japan", label: "Nikkei 225", value: "32,450.80", change: "+1.20%", emoji: "🇯🇵", category: "Indices" },
  { id: "germany", label: "DAX", value: "15,720.30", change: "+0.22%", emoji: "🇩🇪", category: "Indices" },
  { id: "uk", label: "FTSE 100", value: "7,650.10", change: "-0.05%", emoji: "🇬🇧", category: "Indices" },
  { id: "china", label: "Shanghai", value: "3,210.40", change: "-0.30%", emoji: "🇨🇳", category: "Indices" },
  
  // Cryptocurrencies
  { id: "bitcoin", label: "Bitcoin", value: "29,500.00", change: "+1.50%", emoji: "₿", category: "Cryptocurrencies" },
  { id: "ethereum", label: "Ethereum", value: "1,850.40", change: "+0.75%", emoji: "Ξ", category: "Cryptocurrencies" },
  
  // Commodities
  { id: "gold", label: "Gold", value: "$1,850.20", change: "+0.35%", emoji: "🥇", category: "Commodities" },
  { id: "oil", label: "Crude Oil", value: "$79.15", change: "-0.60%", emoji: "🛢️", category: "Commodities" },
  
  // Currencies
  { id: "dollar", label: "US Dollar", value: "1.0870", change: "+0.12%", emoji: "💵", category: "Currencies" },
];

// Get unique categories
const categories = [...new Set(marketItems.map(item => item.category))];

const MarketSnapshot = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  const alphabeticallySortedItems = [...marketItems].sort((a, b) => 
    a.label.localeCompare(b.label)
  );
  
  const [visibleItems, setVisibleItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("marketSnapshotVisibleItems");
      return saved ? JSON.parse(saved) : alphabeticallySortedItems.map(item => item.id);
    } catch (e) {
      return alphabeticallySortedItems.map(item => item.id);
    }
  });
  
  const [itemOrder, setItemOrder] = useState<string[]>(() => {
    try {
      const savedOrder = localStorage.getItem("marketSnapshotItemOrder");
      return savedOrder ? JSON.parse(savedOrder) : alphabeticallySortedItems.map(item => item.id);
    } catch (e) {
      return alphabeticallySortedItems.map(item => item.id);
    }
  });
  
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  const [temporaryOrder, setTemporaryOrder] = useState<string[]>([]);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setTemporaryOrder([...itemOrder]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    setItemOrder(temporaryOrder);
    localStorage.setItem("marketSnapshotVisibleItems", JSON.stringify(temporarySelection));
    localStorage.setItem("marketSnapshotItemOrder", JSON.stringify(temporaryOrder));
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
      setTemporaryOrder(temporaryOrder.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
      setTemporaryOrder([...temporaryOrder, id]);
    }
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(temporaryOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTemporaryOrder(items);
  };

  const filteredAndOrderedItems = itemOrder
    .filter(id => visibleItems.includes(id))
    .map(id => marketItems.find(item => item.id === id))
    .filter(Boolean) as typeof marketItems;

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndOrderedItems.map((item, index) => (
              <Link 
                key={index} 
                to="/market-data" 
                className="p-3 rounded-md bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center mb-1">
                  <span className="text-lg mr-2 w-6 text-center">{item.emoji}</span>
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
      </CardContent>

      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Market Snapshot</DialogTitle>
            <DialogDescription>
              Select which market data to display and drag to reorder.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Select Market Items</h3>
                {categories.map(category => (
                  <div key={category} className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-3 pl-2">
                      {marketItems
                        .filter(item => item.category === category)
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((item) => (
                          <div key={item.id} className="flex items-start space-x-3">
                            <Checkbox 
                              id={`market-${item.id}`}
                              checked={temporarySelection.includes(item.id)}
                              onCheckedChange={() => toggleItem(item.id)}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`market-${item.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                <span className="mr-2">{item.emoji}</span>
                                {item.label}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {temporarySelection.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Order of Display</h3>
                  <p className="text-xs text-muted-foreground mb-2">Drag to reorder items</p>
                  
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="market-items">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {temporaryOrder
                            .filter(id => temporarySelection.includes(id))
                            .map((id, index) => {
                              const item = marketItems.find(m => m.id === id);
                              if (!item) return null;
                              
                              return (
                                <Draggable key={id} draggableId={id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="flex items-center p-2 border rounded bg-white"
                                    >
                                      <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                      <span className="mr-2">{item.emoji}</span>
                                      <span className="text-sm">{item.label}</span>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizing(false)}>Cancel</Button>
            <Button onClick={handleCustomizeSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MarketSnapshot;
