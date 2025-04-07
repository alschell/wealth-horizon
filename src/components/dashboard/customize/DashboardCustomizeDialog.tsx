
import React from "react";
import { GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { defaultSections } from "./dashboardSectionsConfig";

interface DashboardCustomizeDialogProps {
  isCustomizing: boolean;
  setIsCustomizing: (value: boolean) => void;
  dashboardSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  sectionsOrder: string[];
  handleDragEnd: (result: any) => void;
  handleCustomizeSave: () => void;
}

const DashboardCustomizeDialog: React.FC<DashboardCustomizeDialogProps> = ({
  isCustomizing,
  setIsCustomizing,
  dashboardSections,
  toggleSection,
  sectionsOrder,
  handleDragEnd,
  handleCustomizeSave,
}) => {
  return (
    <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>
            Select which sections to display on your dashboard and drag to reorder them.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            {/* Section for enabling/disabling sections */}
            <div>
              <h3 className="text-sm font-medium mb-3">Available Sections</h3>
              <div className="space-y-4">
                {defaultSections.map((section) => (
                  <div key={section.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`section-${section.id}`}
                      checked={dashboardSections[section.id as keyof typeof dashboardSections]}
                      onCheckedChange={() => toggleSection(section.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`section-${section.id}`}
                        className="text-sm font-medium leading-none"
                      >
                        {section.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section for reordering visible sections */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Order of Display</h3>
              <p className="text-xs text-muted-foreground mb-2">Drag to reorder sections</p>
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="dashboard-sections">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {sectionsOrder
                        .filter(id => dashboardSections[id as keyof typeof dashboardSections])
                        .map((sectionId, index) => {
                          const section = defaultSections.find(s => s.id === sectionId);
                          if (!section) return null;
                          
                          return (
                            <Draggable key={sectionId} draggableId={sectionId} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center p-2 border rounded bg-white"
                                >
                                  <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                  <span className="text-sm">{section.name}</span>
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
  );
};

export default DashboardCustomizeDialog;
