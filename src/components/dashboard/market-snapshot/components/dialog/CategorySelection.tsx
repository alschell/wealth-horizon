
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { marketItems, categories } from "../../utils";

interface CategorySelectionProps {
  temporarySelection: string[];
  onToggle: (id: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  temporarySelection,
  onToggle
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">Select Market Items</h3>
      {categories.map(category => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
          <div className="space-y-3 pl-2">
            {marketItems
              .filter(item => item.category === category)
              .sort((a, b) => a.name.localeCompare(b.name))
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
                      {item.name}
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySelection;
