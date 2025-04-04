
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Search } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BankCard from "../BankCard";
import { FormValues } from "./FormSchema";

// Bank options for selected currency
export const bankOptions = [
  { id: "1", name: "JP Morgan Chase", rate: 4.10 },
  { id: "2", name: "Credit Suisse", rate: 3.75 },
  { id: "3", name: "HSBC Holdings", rate: 3.90 },
  { id: "4", name: "UBS Group", rate: 3.80 },
  { id: "5", name: "Goldman Sachs", rate: 4.05 },
];

interface BankSelectionFieldProps {
  form: UseFormReturn<FormValues>;
}

const BankSelectionField: React.FC<BankSelectionFieldProps> = ({ form }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter banks by search query
  const filteredBanks = bankOptions.filter(bank => 
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bankName: string) => {
    form.setValue("bank", bankName);
  };

  return (
    <FormField
      control={form.control}
      name="bank"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Select Bank</FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="relative mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search for a bank..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                {filteredBanks.map((bank) => (
                  <BankCard
                    key={bank.id}
                    bank={bank}
                    isSelected={field.value === bank.name}
                    onSelect={() => handleBankSelect(bank.name)}
                  />
                ))}
              </div>
              
              {filteredBanks.length === 0 && (
                <p className="text-gray-500 text-center py-4">No banks found matching your search</p>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BankSelectionField;
