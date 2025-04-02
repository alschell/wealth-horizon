
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PlusCircle, Coins, Calendar, ArrowUpDown } from "lucide-react";
import NewTermDepositForm from "../components/NewTermDepositForm";

// Sample data for active term deposits
const activeDeposits = [
  {
    id: "td1",
    bank: "JP Morgan Chase",
    amount: 500000,
    currency: "USD",
    rate: 4.25,
    startDate: "2023-03-15",
    maturityDate: "2023-09-15",
    term: "6 months",
    interest: 10625
  },
  {
    id: "td2",
    bank: "Credit Suisse",
    amount: 300000,
    currency: "CHF",
    rate: 3.75,
    startDate: "2023-04-01",
    maturityDate: "2024-04-01",
    term: "12 months",
    interest: 11250
  },
  {
    id: "td3",
    bank: "HSBC Holdings",
    amount: 450000,
    currency: "EUR",
    rate: 3.9,
    startDate: "2023-05-10",
    maturityDate: "2023-08-10",
    term: "3 months",
    interest: 4387.5
  }
];

// Sample data for bank rates
const bankRates = [
  { id: "br1", bank: "JP Morgan Chase", currency: "USD", term: "3 months", rate: 4.10 },
  { id: "br2", bank: "JP Morgan Chase", currency: "USD", term: "6 months", rate: 4.25 },
  { id: "br3", bank: "JP Morgan Chase", currency: "USD", term: "12 months", rate: 4.40 },
  { id: "br4", bank: "Credit Suisse", currency: "CHF", term: "3 months", rate: 3.60 },
  { id: "br5", bank: "Credit Suisse", currency: "CHF", term: "6 months", rate: 3.75 },
  { id: "br6", bank: "Credit Suisse", currency: "CHF", term: "12 months", rate: 3.90 },
  { id: "br7", bank: "HSBC Holdings", currency: "EUR", term: "3 months", rate: 3.90 },
  { id: "br8", bank: "HSBC Holdings", currency: "EUR", term: "6 months", rate: 4.05 },
  { id: "br9", bank: "HSBC Holdings", currency: "EUR", term: "12 months", rate: 4.20 }
];

const TermDeposits = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedTerm, setSelectedTerm] = useState("3 months");
  
  const filteredRates = bankRates.filter(
    rate => rate.currency === selectedCurrency && rate.term === selectedTerm
  ).sort((a, b) => b.rate - a.rate);
  
  const bestRate = filteredRates.length > 0 ? filteredRates[0] : null;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Term Deposits</h2>
          <p className="text-sm text-muted-foreground">
            Optimize your idle cash with term deposits
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Term Deposit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Term Deposit</DialogTitle>
            </DialogHeader>
            <NewTermDepositForm bestRate={bestRate} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Active Term Deposits</CardTitle>
            <CardDescription>Your current term deposits</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Maturity Date</TableHead>
                  <TableHead className="text-right">Interest Earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeDeposits.map(deposit => (
                  <TableRow key={deposit.id}>
                    <TableCell>{deposit.bank}</TableCell>
                    <TableCell>{formatCurrency(deposit.amount, deposit.currency)}</TableCell>
                    <TableCell>{deposit.rate}%</TableCell>
                    <TableCell>{deposit.term}</TableCell>
                    <TableCell>{new Date(deposit.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(deposit.maturityDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right text-green-600">
                      {formatCurrency(deposit.interest, deposit.currency)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Best Available Rates</CardTitle>
              <CardDescription>Compare rates across banks</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3 months">3 months</SelectItem>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="12 months">12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank</TableHead>
                  <TableHead>Currency</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead className="text-right">Interest Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map(rate => (
                  <TableRow key={rate.id}>
                    <TableCell>{rate.bank}</TableCell>
                    <TableCell>{rate.currency}</TableCell>
                    <TableCell>{rate.term}</TableCell>
                    <TableCell className="text-right font-medium">
                      {rate.rate}%
                      {rate === bestRate && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">
                          Best Rate
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermDeposits;
