
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { TrendingUp, TrendingDown, LineChart, BellRing, BellOff, Search } from "lucide-react";
import { WatchlistTableProps } from "../types";

/**
 * Table component for displaying watchlist items
 * Shows item details with actions for charts and alerts
 * 
 * @param props - Component properties
 * @returns Watchlist table component
 */
const WatchlistTable: React.FC<WatchlistTableProps> = ({
  watchlists,
  activeWatchlist,
  filteredItems,
  toggleSubscription
}) => {
  const activeWatchlistName = watchlists.find(list => list.id === activeWatchlist)?.name;

  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>
            {activeWatchlistName}
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {filteredItems.length} items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold">{item.symbol}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <div className={`flex items-center ${
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {item.change >= 0 ? "+" : ""}{item.change}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <LineChart className="h-4 w-4" />
                        <span className="sr-only">View chart</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`h-8 w-8 p-0 ${item.subscribed ? 'text-blue-500' : ''}`}
                        onClick={() => toggleSubscription(item.id)}
                      >
                        {item.subscribed ? (
                          <BellRing className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {item.subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-8 w-8 text-gray-300 mb-2" />
                    <p className="text-gray-500">No items found</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WatchlistTable;
