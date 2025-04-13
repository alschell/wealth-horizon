
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { mockPendingTrades } from "../data/mockTrades";

const PendingTradesList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEditTrade = (tradeId: string) => {
    navigate(`/trading/edit/${tradeId}`);
  };

  const handleCancelTrade = (tradeId: string) => {
    // In a real app, this would call an API to cancel the trade
    toast({
      title: "Trade Cancelled",
      description: `Trade #${tradeId} has been cancelled successfully.`,
    });
  };

  if (mockPendingTrades.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No pending trades found.</p>
        <Button 
          onClick={() => navigate("/trading/new")} 
          variant="outline" 
          className="mt-4"
        >
          Start a new trade
        </Button>
      </div>
    );
  }

  return (
    <div>
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
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPendingTrades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className="font-medium">{trade.id}</TableCell>
              <TableCell>{trade.instrumentSymbol}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${trade.orderType === 'buy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'}`}>
                  {trade.orderType.toUpperCase()}
                </span>
              </TableCell>
              <TableCell>{trade.quantity}</TableCell>
              <TableCell>${trade.price.toFixed(2)}</TableCell>
              <TableCell>${(trade.quantity * trade.price).toFixed(2)}</TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
                  {trade.status}
                </span>
              </TableCell>
              <TableCell>{new Date(trade.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleEditTrade(trade.id)}
                  title="Edit Trade"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCancelTrade(trade.id)}
                  title="Cancel Trade"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingTradesList;
