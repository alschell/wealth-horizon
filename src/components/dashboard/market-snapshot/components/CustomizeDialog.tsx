
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import { categories, marketItems } from "../utils";

interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  temporarySelection: string[];
  temporaryOrder: string[];
  onToggle: (id: string) => void;
  onDragEnd: (result: any) => void;
  onSave: () => void;
}

const CustomizeDialog: React.FC<CustomizeDialogProps> = ({
  isOpen,
  onOpenChange,
  temporarySelection,
  temporaryOrder,
  onToggle,
  onDragEnd,
  onSave
}) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                            onCheckedChange={() => onToggle(item.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={`market-${item.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
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
                
                <DragDropContext onDragEnd={onDragEnd}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeDialog;
