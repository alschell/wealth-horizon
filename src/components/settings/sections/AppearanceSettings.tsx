
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation, LANGUAGES } from "@/context/TranslationContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AppearanceSettings = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  const [darkMode, setDarkMode] = React.useState(false);
  const [compactMode, setCompactMode] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
          <CardDescription>
            Choose your preferred language for the interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {LANGUAGES.map((language) => (
              <Button
                key={language.code}
                variant={currentLanguage === language.code ? "default" : "outline"}
                className="justify-start"
                onClick={() => setLanguage(language.code)}
              >
                <span className="mr-2">{language.nativeName}</span>
                {currentLanguage === language.code && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>
            Customize the appearance of the interface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
              <span>Dark Mode</span>
              <span className="font-normal text-xs text-muted-foreground">
                Enable dark color scheme
              </span>
            </Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode" className="flex flex-col space-y-1">
              <span>Compact Mode</span>
              <span className="font-normal text-xs text-muted-foreground">
                Reduce spacing between elements
              </span>
            </Label>
            <Switch
              id="compact-mode"
              checked={compactMode}
              onCheckedChange={setCompactMode}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="flex flex-col space-y-1">
              <span>High Contrast</span>
              <span className="font-normal text-xs text-muted-foreground">
                Improve visibility with higher contrast
              </span>
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Layout Preferences</CardTitle>
          <CardDescription>
            Choose your preferred layout style
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="standard">
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard Layout</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="compact" id="compact" />
              <Label htmlFor="compact">Compact Layout</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expanded" id="expanded" />
              <Label htmlFor="expanded">Expanded Layout</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
