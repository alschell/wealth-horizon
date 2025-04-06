
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { useCurrency } from "@/hooks/use-currency";

const PersonalizedSettings = () => {
  const { currencies, activeCurrency, setActiveCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    showNetWorth: true,
    showRecentActivity: true,
    showMarketSnapshot: true,
    showPerformance: true,
    enableNotifications: true,
    compactView: false,
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your dashboard preferences have been updated",
    });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Dashboard Preferences</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Displayed Widgets</h3>
            <div className="space-y-3">
              {Object.entries({
                showNetWorth: "Net Worth",
                showRecentActivity: "Recent Activity",
                showMarketSnapshot: "Market Snapshot",
                showPerformance: "Performance Overview",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm">{label}</span>
                  <Switch
                    checked={settings[key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Display Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Compact View</span>
                <Switch
                  checked={settings.compactView}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, compactView: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable Notifications</span>
                <Switch
                  checked={settings.enableNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableNotifications: checked })
                  }
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Display Currency</h3>
            <div className="grid grid-cols-3 gap-2">
              {currencies.slice(0, 6).map((currency) => (
                <Button
                  key={currency.code}
                  variant={activeCurrency.code === currency.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCurrency(currency)}
                  className="w-full"
                >
                  {currency.code}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PersonalizedSettings;
