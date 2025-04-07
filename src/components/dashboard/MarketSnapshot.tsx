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

const defaultMarketItems = [
  { id: "sp500", label: "S&P 500", value: "4,400.50", change: "+0.25%", emoji: "📈" },
  { id: "nasdaq", label: "Nasdaq", value: "13,630.75", change: "-0.10%", emoji: "📊" },
  { id: "dowjones", label: "Dow Jones", value: "34,500.20", change: "+0.15%", emoji: "📉" },
  { id: "bitcoin", label: "Bitcoin", value: "29,500.00", change: "+1.50%", emoji: "₿" },
  { id: "ethereum", label: "Ethereum", value: "1,850.40", change: "+0.75%", emoji: "Ξ" },
  { id: "gold", label: "Gold", value: "$1,850.20", change: "+0.35%", emoji: "🥇" },
  { id: "oil", label: "Crude Oil", value: "$79.15", change: "-0.60%", emoji: "🛢️" },
  { id: "dollar", label: "US Dollar", value: "1.0870", change: "+0.12%", emoji: "💵" },
  { id: "japan", label: "Nikkei 225", value: "32,450.80", change: "+1.20%", emoji: "🇯🇵" },
  { id: "germany", label: "DAX", value: "15,720.30", change: "+0.22%", emoji: "🇩🇪" },
  { id: "uk", label: "FTSE 100", value: "7,650.10", change: "-0.05%", emoji: "🇬🇧" },
  { id: "china", label: "Shanghai", value: "3,210.40", change: "-0.30%", emoji: "🇨🇳" },
];

const MarketSnapshot = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  const alphabeticallySortedItems = [...defaultMarketItems].sort((a, b) => 
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
    .map(id => defaultMarketItems.find(item => item.id === id))
    .filter(Boolean) as typeof defaultMarketItems;

  return (
    <Card className="shadow-sm h-[350px] flex flex-col">
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
      <CardContent className="flex-1 flex flex-col p-6 pt-0">
        <ScrollArea className="flex-grow">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredAndOrderedItems.map((item, index) => (
              <div key={index} className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
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
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-auto pt-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {alphabeticallySortedItems.map((item) => (
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
                            const item = defaultMarketItems.find(m => m.id === id);
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
