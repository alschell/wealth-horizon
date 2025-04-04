
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { mockCompletedTrades } from "../data/mockTrades";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PastTradesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Apply filters to the trades
  const filteredTrades = mockCompletedTrades.filter((trade) => {
    const matchesSearch = 
      trade.instrumentSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trade.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || trade.status === statusFilter;
    const matchesType = typeFilter === "all" || trade.orderType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewDetails = (tradeId: string) => {
    // In a real app, this would navigate to a details page or open a modal
    console.log(`View details for trade ${tradeId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Search by ID or Symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
              <SelectItem value="sell_short">Sell Short</SelectItem>
              <SelectItem value="exchange">Exchange</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredTrades.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">No trade history found matching your filters.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trade ID</TableHead>
              <TableHead>Instrument</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Executed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrades.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell className="font-medium">{trade.id}</TableCell>
                <TableCell>{trade.instrumentSymbol}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    trade.orderType === 'buy' 
                      ? 'bg-green-100 text-green-800' 
                      : trade.orderType === 'sell' 
                      ? 'bg-red-100 text-red-800'
                      : trade.orderType === 'sell_short'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {trade.orderType.toUpperCase().replace('_', ' ')}
                  </span>
                </TableCell>
                <TableCell>{trade.quantity}</TableCell>
                <TableCell>${trade.price.toFixed(2)}</TableCell>
                <TableCell>${(trade.quantity * trade.price).toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    trade.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : trade.status === 'failed' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {trade.status.toUpperCase()}
                  </span>
                </TableCell>
                <TableCell>{new Date(trade.executedAt || trade.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleViewDetails(trade.id)}
                    title="View Details"
                  >
                    <FileText size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PastTradesList;
