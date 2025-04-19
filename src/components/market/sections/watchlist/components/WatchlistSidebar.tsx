
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Plus } from "lucide-react";
import { WatchlistSidebarProps } from "../types";

/**
 * Sidebar component for watchlist management
 * Displays list of watchlists and allows creation of new watchlists
 * 
 * @param props - Component properties
 * @returns Watchlist sidebar component
 */
const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  watchlists,
  activeWatchlist,
  setActiveWatchlist,
  setIsCreateDialogOpen
}) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">My Watchlists</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {watchlists.map(list => (
            <Button 
              key={list.id}
              variant={activeWatchlist === list.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveWatchlist(list.id)}
            >
              <Star className="h-4 w-4 mr-2" />
              {list.name}
            </Button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Watchlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistSidebar;
