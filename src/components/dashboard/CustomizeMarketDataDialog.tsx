
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";

export type MarketCategory = {
  id: string;
  name: string;
  description?: string;
};

export type MarketItem = {
  id: string;
  name: string;
  category: string;
  value: string;
  change: string;
  isPositive: boolean;
  flag: string;
};

interface CustomizeMarketDataDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  allCategories: MarketCategory[];
  marketItems: MarketItem[];
  orderedItems: string[];
  onCategoryToggle: (id: string) => void;
  onOrderChange: (newOrder: string[]) => void;
  onSave: () => void;
}

const CustomizeMarketDataDialog = ({
  isOpen,
  onOpenChange,
  selectedCategories,
  allCategories,
  marketItems,
  orderedItems,
  onCategoryToggle,
  onOrderChange,
  onSave
}: CustomizeMarketDataDialogProps) => {
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(orderedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onOrderChange(items);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Market Data</DialogTitle>
          <DialogDescription>
            Select which market categories to display and drag to reorder.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Market Categories</h3>
              <div className="space-y-3">
                {allCategories.map((category) => (
                  <div key={category.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => onCategoryToggle(category.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.name}
                      </label>
                      {category.description && (
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      )}
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
                      {orderedItems.map((itemId, index) => {
                        const item = marketItems.find(m => m.id === itemId);
                        if (!item) return null;
                        
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center p-2 border rounded bg-white"
                              >
                                <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">{item.name}</span>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeMarketDataDialog;
