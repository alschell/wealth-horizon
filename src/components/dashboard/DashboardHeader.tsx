
import React, { useState } from "react";
import { Settings, LogOut, Bell, Search, Menu, X } from "lucide-react";
import Logo from "./Logo";
import PageTitle from "./PageTitle";
import NotificationsPopover from "./NotificationsPopover";
import HeaderAction from "./HeaderAction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="h-16 flex items-center justify-between border-b border-border bg-white sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
          <PageTitle />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative max-w-xs w-64 hidden md:block">
            <Search className={`absolute left-2 top-2.5 h-4 w-4 ${isSearchFocused ? 'text-blue-500' : 'text-muted-foreground'}`} />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500 transition-all" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchQuery && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1 h-7 w-7" 
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <NotificationsPopover />
          <HeaderAction 
            icon={Settings} 
            label="Settings" 
            to="/settings" 
          />
          <HeaderAction 
            icon={LogOut} 
            label="Log Out" 
            to="/" 
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
