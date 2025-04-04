
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import NewTermDepositForm from "../components/NewTermDepositForm";
import TermDepositsCard from "../components/TermDepositsCard";
import MarketRatesComparison from "../components/MarketRatesComparison";
import { activeDeposits, bankRates } from "../data/termDepositsData";

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
      
      <TermDepositsCard 
        activeDeposits={activeDeposits} 
        depositView={depositView} 
        onDepositViewChange={setDepositView} 
      />
      
      <MarketRatesComparison 
        bankRates={bankRates}
        selectedCurrency={selectedCurrency}
        selectedTerm={selectedTerm}
        onCurrencyChange={setSelectedCurrency}
        onTermChange={setSelectedTerm}
      />
    </div>
  );
};

export default TermDeposits;
