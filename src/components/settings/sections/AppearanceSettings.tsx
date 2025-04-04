
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const AppearanceSettings = () => {
  const [theme, setTheme] = useState("light");
  const [density, setDensity] = useState("comfortable");
  const [fontSize, setFontSize] = useState("medium");
  
  const handleSaveSettings = () => {
    toast({
      title: "Appearance settings saved",
      description: `Theme: ${theme}, Density: ${density}, Font size: ${fontSize}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-gray-500">
          Customize how the application looks and feels
        </p>
      </div>
      
      <div className="space-y-8">
        <div>
          <h4 className="font-medium mb-4">Theme</h4>
          <RadioGroup 
            defaultValue={theme} 
            onValueChange={setTheme}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label htmlFor="theme-light" className="cursor-pointer">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label htmlFor="theme-dark" className="cursor-pointer">Dark</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label htmlFor="theme-system" className="cursor-pointer">System</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Interface Density</h4>
          <RadioGroup 
            defaultValue={density} 
            onValueChange={setDensity}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="density-comfortable" />
              <Label htmlFor="density-comfortable" className="cursor-pointer">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="density-compact" />
              <Label htmlFor="density-compact" className="cursor-pointer">Compact</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Font Size</h4>
          <RadioGroup 
            defaultValue={fontSize} 
            onValueChange={setFontSize}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="small" id="font-small" />
              <Label htmlFor="font-small" className="cursor-pointer">Small</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="font-medium" />
              <Label htmlFor="font-medium" className="cursor-pointer">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="large" id="font-large" />
              <Label htmlFor="font-large" className="cursor-pointer">Large</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="font-medium mb-4">Animation</h4>
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="reduce-motion" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="reduce-motion" className="text-sm text-gray-900">
              Reduce motion - minimize animations
            </label>
          </div>
        </div>
      </div>
      
      <Button onClick={handleSaveSettings}>
        Save Appearance Settings
      </Button>
    </div>
  );
};

export default AppearanceSettings;
