
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle, Search, ArrowDownUp, ArrowUpDown } from "lucide-react";
import AddRecurringPaymentForm from "../components/AddRecurringPaymentForm";

// Sample data for recurring payments
const recurringPayments = [
  { 
    id: "rp1", 
    name: "Dividend: Apple Inc.", 
    amount: 2125.00, 
    currency: "USD", 
    frequency: "Quarterly", 
    nextDate: "2023-06-30", 
    type: "income",
    category: "Dividends"
  },
  { 
    id: "rp2", 
    name: "Dividend: Microsoft", 
    amount: 1845.50, 
    currency: "USD", 
    frequency: "Quarterly", 
    nextDate: "2023-06-15", 
    type: "income", 
    category: "Dividends"
  },
  { 
    id: "rp3", 
    name: "Rental Income - NYC Property", 
    amount: 8500.00, 
    currency: "USD", 
    frequency: "Monthly", 
    nextDate: "2023-07-01", 
    type: "income",
    category: "Real Estate"
  },
  { 
    id: "rp4", 
    name: "Private Equity Distribution", 
    amount: 25000.00, 
    currency: "USD", 
    frequency: "Semi-annual", 
    nextDate: "2023-08-15", 
    type: "income",
    category: "Private Equity"
  },
  { 
    id: "rp5", 
    name: "Property Tax - Primary Residence", 
    amount: 12500.00, 
    currency: "USD", 
    frequency: "Annual", 
    nextDate: "2023-09-30", 
    type: "expense",
    category: "Taxes"
  },
  { 
    id: "rp6", 
    name: "Insurance Premium - Art Collection", 
    amount: 4850.00, 
    currency: "USD", 
    frequency: "Annual", 
    nextDate: "2023-10-15", 
    type: "expense",
    category: "Insurance"
  },
  { 
    id: "rp7", 
    name: "Charitable Foundation Commitment", 
    amount: 50000.00, 
    currency: "USD", 
    frequency: "Annual", 
    nextDate: "2023-12-01", 
    type: "expense",
    category: "Philanthropy"
  }
];

const RecurringPayments = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPayments = recurringPayments.filter(payment => {
    const matchesType = filter === "all" || payment.type === filter;
    const matchesSearch = payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Recurring Payments</h2>
          <p className="text-sm text-muted-foreground">
            Manage your recurring income and expenses
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Recurring Payment</DialogTitle>
            </DialogHeader>
            <AddRecurringPaymentForm />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expense">Expenses</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-[250px]"
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Date</TableHead>
                <TableHead className="text-right">
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">
                    {payment.name}
                    <div className="text-xs text-muted-foreground">
                      {payment.type === "income" ? "Income" : "Expense"}
                    </div>
                  </TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell>{payment.frequency}</TableCell>
                  <TableCell>{new Date(payment.nextDate).toLocaleDateString()}</TableCell>
                  <TableCell className={`text-right ${payment.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {payment.type === "income" ? "+" : "-"}
                    {formatCurrency(payment.amount, payment.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecurringPayments;
