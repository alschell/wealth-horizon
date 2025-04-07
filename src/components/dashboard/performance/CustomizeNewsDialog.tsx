
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type NewsSource = {
  id: string;
  name: string;
  description?: string;
};

export type NewsCategory = {
  id: string;
  name: string;
  description?: string;
};

interface CustomizeNewsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSources: string[];
  selectedCategories: string[];
  allSources: NewsSource[];
  allCategories: NewsCategory[];
  onSourceToggle: (id: string) => void;
  onCategoryToggle: (id: string) => void;
  onSave: () => void;
}

const CustomizeNewsDialog = ({
  isOpen,
  onOpenChange,
  selectedSources,
  selectedCategories,
  allSources,
  allCategories,
  onSourceToggle,
  onCategoryToggle,
  onSave
}: CustomizeNewsDialogProps) => {
  // Sort sources and categories alphabetically by name
  const sortedSources = React.useMemo(() => 
    [...allSources].sort((a, b) => a.name.localeCompare(b.name)), 
    [allSources]
  );
  
  const sortedCategories = React.useMemo(() => 
    [...allCategories].sort((a, b) => a.name.localeCompare(b.name)), 
    [allCategories]
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize News Feed</DialogTitle>
          <DialogDescription>
            Select which news categories and sources you want to see in your news feed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">News Categories</h3>
              <div className="space-y-3">
                {sortedCategories.map((category) => (
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
              <h3 className="text-sm font-medium mb-3">News Sources</h3>
              <div className="space-y-3">
                {sortedSources.map((source) => (
                  <div key={source.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`source-${source.id}`}
                      checked={selectedSources.includes(source.id)}
                      onCheckedChange={() => onSourceToggle(source.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`source-${source.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {source.name}
                      </label>
                      {source.description && (
                        <p className="text-xs text-muted-foreground">
                          {source.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

export default CustomizeNewsDialog;
