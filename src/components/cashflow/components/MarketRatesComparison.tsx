
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BankRateCard from "./BankRateCard";

interface MarketRatesComparisonProps {
  bankRates: Array<{
    id: string;
    bank: string;
    currency: string;
    term: string;
    rate: number;
  }>;
  selectedCurrency: string;
  selectedTerm: string;
  onCurrencyChange: (value: string) => void;
  onTermChange: (value: string) => void;
}

const MarketRatesComparison = ({
  bankRates,
  selectedCurrency,
  selectedTerm,
  onCurrencyChange,
  onTermChange
}: MarketRatesComparisonProps) => {
  
  const filteredRates = bankRates.filter(
    rate => rate.currency === selectedCurrency && rate.term === selectedTerm
  ).sort((a, b) => b.rate - a.rate);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-4">
        <div className="space-y-0.5">
          <CardTitle>Market Rates Comparison</CardTitle>
          <CardDescription>Find the best rates across banks</CardDescription>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTerm} onValueChange={onTermChange}>
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
            <BankRateCard 
              key={rate.id} 
              rate={rate} 
              isTopRate={index === 0} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketRatesComparison;
