
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
import { 
  PlusCircle, 
  Coins, 
  Calendar, 
  ArrowUpDown, 
  BadgePercent,
  Clock,
  Calendar as CalendarIcon,
  Building 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NewTermDepositForm from "../components/NewTermDepositForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [depositView, setDepositView] = useState("active");
  
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
            Optimize your idle cash with competitive term deposits
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Term Deposit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Term Deposit</DialogTitle>
            </DialogHeader>
            <NewTermDepositForm bestRate={bestRate} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Your Term Deposits</CardTitle>
            
            <Tabs value={depositView} onValueChange={setDepositView} className="h-9">
              <TabsList className="h-9">
                <TabsTrigger value="active" className="h-8 px-3">Active</TabsTrigger>
                <TabsTrigger value="maturing" className="h-8 px-3">Maturing Soon</TabsTrigger>
                <TabsTrigger value="completed" className="h-8 px-3">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Bank</TableHead>
                <TableHead className="font-medium">Amount</TableHead>
                <TableHead className="font-medium">Rate</TableHead>
                <TableHead className="font-medium">Term</TableHead>
                <TableHead className="font-medium">Start Date</TableHead>
                <TableHead className="font-medium">Maturity Date</TableHead>
                <TableHead className="font-medium text-right">Interest Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeDeposits.map(deposit => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.bank}</TableCell>
                  <TableCell>{formatCurrency(deposit.amount, deposit.currency)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <BadgePercent className="h-4 w-4 mr-1 text-green-600" />
                      {deposit.rate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 opacity-70" />
                      {deposit.term}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 opacity-70" />
                      {new Date(deposit.startDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(deposit.maturityDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    {formatCurrency(deposit.interest, deposit.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
          <div className="space-y-0.5">
            <CardTitle>Market Rates Comparison</CardTitle>
            <CardDescription>Find the best rates across banks</CardDescription>
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
        <CardContent className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRates.map((rate, index) => (
              <Card key={rate.id} className={`overflow-hidden ${index === 0 ? 'border-green-200 bg-green-50' : ''}`}>
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-gray-500" />
                      <CardTitle className="text-base">{rate.bank}</CardTitle>
                    </div>
                    {index === 0 && (
                      <Badge className="bg-green-600">Best Rate</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Currency</p>
                      <p className="font-medium">{rate.currency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Term</p>
                      <p className="font-medium">{rate.term}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Rate</p>
                      <p className="font-bold text-green-600">{rate.rate}%</p>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mt-4">
                          <Coins className="mr-2 h-4 w-4" />
                          Create Deposit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Create New Term Deposit</DialogTitle>
                        </DialogHeader>
                        <NewTermDepositForm bestRate={rate} />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermDeposits;
