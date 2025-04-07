
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import { CustomizeDialogProps, QuickLinkItem } from "./types";

const CustomizeDialog = ({ 
  isOpen, 
  onOpenChange, 
  items, 
  selectedItems, 
  onItemToggle, 
  onSave 
}: CustomizeDialogProps) => {
  // Sort items alphabetically by title
  const sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
  
  // State for drag and drop reordering
  const [orderedSelectedItems, setOrderedSelectedItems] = React.useState<string[]>(selectedItems);
  
  React.useEffect(() => {
    setOrderedSelectedItems(selectedItems);
  }, [selectedItems]);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(orderedSelectedItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setOrderedSelectedItems(items);
  };
  
  const handleSave = () => {
    // Pass back the reordered items
    onSave(orderedSelectedItems);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Quick Access</DialogTitle>
          <DialogDescription>
            Select the items you want to show in your Quick Access grid and arrange their order.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Available Items</h3>
              <div className="space-y-4">
                {sortedItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => onItemToggle(item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.title}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {orderedSelectedItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Order of Display</h3>
                <p className="text-xs text-muted-foreground mb-2">Drag to reorder items</p>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="quick-access-items">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {orderedSelectedItems.map((itemId, index) => {
                          const item = items.find(i => i.id === itemId);
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
                                  <span className="text-sm">{item.title}</span>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
