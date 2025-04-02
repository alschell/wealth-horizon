
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from "lucide-react";

// Reuse the forecast data generator from the chart component
const generateForecastData = (timeRange: string, currency: string) => {
  // Sample implementation - simplified version of the chart data generator
  const dataPointCount = timeRange === "1m" ? 30 : 
                        timeRange === "3m" ? 90 : 
                        timeRange === "6m" ? 180 : 
                        365; // 1y
  
  const baseAmount = currency === "USD" ? 2500000 : 
                     currency === "EUR" ? 1500000 :
                     currency === "GBP" ? 650000 :
                     currency === "CHF" ? 900000 :
                     85000000; // JPY
                     
  const data = [];
  let currentAmount = baseAmount;
  const minRequired = baseAmount * 0.8;
  const maxTarget = baseAmount * 1.2;
  
  // Sample events for the forecast
  const events = [
    { date: 5, description: "Dividend Payment - Apple Inc.", amount: baseAmount * 0.03, type: "inflow" },
    { date: 8, description: "Property Tax Payment", amount: baseAmount * 0.05, type: "outflow" },
    { date: 15, description: "Rental Income", amount: baseAmount * 0.04, type: "inflow" },
    { date: 21, description: "Investment Contribution", amount: baseAmount * 0.08, type: "outflow" },
    { date: 28, description: "Term Deposit Maturity", amount: baseAmount * 0.15, type: "inflow" },
    { date: 35, description: "Insurance Premium", amount: baseAmount * 0.03, type: "outflow" },
    { date: 42, description: "Dividend Payment - Microsoft", amount: baseAmount * 0.025, type: "inflow" },
    { date: 55, description: "Private Equity Distribution", amount: baseAmount * 0.12, type: "inflow" },
    { date: 60, description: "Charitable Donation", amount: baseAmount * 0.07, type: "outflow" },
    { date: 75, description: "Business Income", amount: baseAmount * 0.09, type: "inflow" },
  ];
  
  // Generate data for each day in the forecast period
  for (let i = 0; i < Math.min(dataPointCount, 90); i++) { // Limit to 90 days for table view
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Find events for this day
    const dayEvents = events.filter(e => e.date === i);
    
    // Apply events to balance
    let dailyInflow = 0;
    let dailyOutflow = 0;
    
    dayEvents.forEach(event => {
      if (event.type === "inflow") {
        dailyInflow += event.amount;
        currentAmount += event.amount;
      } else {
        dailyOutflow += event.amount;
        currentAmount -= event.amount;
      }
    });
    
    const status = currentAmount < minRequired ? "shortage" : 
                  currentAmount > maxTarget ? "excess" : 
                  "normal";
    
    // Only add rows with events or status changes for better clarity
    if (dayEvents.length > 0 || status !== "normal" || i === 0 || i === dataPointCount - 1) {
      data.push({
        date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
        balance: currentAmount,
        dailyInflow,
        dailyOutflow,
        status,
        events: dayEvents,
      });
    }
  }
  
  return data;
};

interface LiquidityTableProps {
  timeRange: string;
  currency: string;
}

export const LiquidityTable: React.FC<LiquidityTableProps> = ({ timeRange, currency }) => {
  const forecastData = generateForecastData(timeRange, currency);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Events</TableHead>
          <TableHead className="text-right">Inflow</TableHead>
          <TableHead className="text-right">Outflow</TableHead>
          <TableHead className="text-right">Balance</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {forecastData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.date}</TableCell>
            <TableCell>
              {row.events.length > 0 ? (
                <div className="space-y-1">
                  {row.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-center gap-1">
                      {event.type === "inflow" ? (
                        <ArrowDownToLine className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowUpFromLine className="h-3 w-3 text-red-500" />
                      )}
                      <span className="text-xs">{event.description}</span>
                    </div>
                  ))}
                </div>
              ) : "-"}
            </TableCell>
            <TableCell className="text-right">
              {row.dailyInflow > 0 ? (
                <span className="text-green-600">
                  {formatCurrency(row.dailyInflow, currency)}
                </span>
              ) : "-"}
            </TableCell>
            <TableCell className="text-right">
              {row.dailyOutflow > 0 ? (
                <span className="text-red-600">
                  {formatCurrency(row.dailyOutflow, currency)}
                </span>
              ) : "-"}
            </TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(row.balance, currency)}
            </TableCell>
            <TableCell>
              {row.status === "shortage" && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Low Balance</span>
                </Badge>
              )}
              {row.status === "excess" && (
                <Badge variant="outline" className="bg-blue-50">
                  Excess Cash
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
