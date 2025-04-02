
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashflowSummary from "../components/CashflowSummary";
import CashflowChart from "../components/CashflowChart";
import CurrencyPositions from "../components/CurrencyPositions";
import { ArrowUpRight, ArrowDownRight, DollarSign, CalendarDays } from "lucide-react";

const CashflowOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Cash Flow Overview</CardTitle>
            <CardDescription>Your cash inflows and outflows over time</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <CashflowChart />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Inflows</CardTitle>
            <CardDescription>Total incoming cash</CardDescription>
          </div>
          <ArrowUpRight className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <CashflowSummary type="inflows" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Outflows</CardTitle>
            <CardDescription>Total outgoing cash</CardDescription>
          </div>
          <ArrowDownRight className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          <CashflowSummary type="outflows" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Next Payment</CardTitle>
            <CardDescription>Upcoming scheduled payment</CardDescription>
          </div>
          <CalendarDays className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-2xl font-bold">$8,750.00</p>
            <p className="text-xs text-muted-foreground">Investment Contribution</p>
            <p className="text-sm">Due in 5 days (June 15)</p>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Currency Positions</CardTitle>
          <CardDescription>Current balances by currency</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyPositions />
        </CardContent>
      </Card>
    </div>
  );
};

export default CashflowOverview;
