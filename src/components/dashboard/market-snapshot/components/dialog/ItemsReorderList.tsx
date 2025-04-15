
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import { marketItems } from "../../utils";

interface ItemsReorderListProps {
  temporarySelection: string[];
  temporaryOrder: string[];
  onDragEnd: (result: any) => void;
}

const ItemsReorderList: React.FC<ItemsReorderListProps> = ({
  temporarySelection,
  temporaryOrder,
  onDragEnd
}) => {
  if (temporarySelection.length === 0) {
    return null;
  }

  return (
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
  );
};

export default ItemsReorderList;
