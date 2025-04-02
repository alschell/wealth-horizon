
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

// Define our form schema
const formSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be greater than 0.",
  }),
  currency: z.string({
    required_error: "Please select a currency.",
  }),
  term: z.string({
    required_error: "Please select a term.",
  }),
  bank: z.string({
    required_error: "Please select a bank.",
  }),
  bankSelection: z.enum(["best", "custom"], {
    required_error: "Please select bank selection method.",
  }),
});

interface NewTermDepositFormProps {
  bestRate?: { bank: string; currency: string; term: string; rate: number } | null;
}

const NewTermDepositForm: React.FC<NewTermDepositFormProps> = ({ bestRate }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100000,
      currency: bestRate?.currency || "USD",
      term: bestRate?.term || "3 months",
      bank: bestRate?.bank || "",
      bankSelection: "best",
    },
  });
  
  const watchBankSelection = form.watch("bankSelection");
  const watchCurrency = form.watch("currency");
  const watchTerm = form.watch("term");
  const watchAmount = form.watch("amount");
  
  // Bank options for selected currency
  const bankOptions = [
    { id: "1", name: "JP Morgan Chase", rate: 4.10 },
    { id: "2", name: "Credit Suisse", rate: 3.75 },
    { id: "3", name: "HSBC Holdings", rate: 3.90 },
    { id: "4", name: "UBS Group", rate: 3.80 },
    { id: "5", name: "Goldman Sachs", rate: 4.05 },
  ];
  
  // Calculate estimated interest
  const selectedBank = 
    watchBankSelection === "best" 
      ? bestRate
      : bankOptions.find(bank => bank.name === form.getValues("bank"));
      
  const rate = selectedBank?.rate || 3.5; // Default if not found
  
  // Simple interest calculation
  const termInMonths = watchTerm === "3 months" ? 3 : 
                      watchTerm === "6 months" ? 6 : 12;
  const estimatedInterest = (watchAmount * (rate / 100) * termInMonths) / 12;
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, we'd save this to a backend
    console.log("Estimated Interest:", estimatedInterest);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="CHF">CHF</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Term</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="3 months">3 months</SelectItem>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="12 months">12 months</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bankSelection"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Bank Selection</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="best" id="best" />
                    <Label htmlFor="best">Best available rate ({bestRate?.bank || "N/A"} - {bestRate?.rate || "N/A"}%)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Choose specific bank</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchBankSelection === "custom" && (
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Bank</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bankOptions.map(bank => (
                      <SelectItem key={bank.id} value={bank.name}>
                        {bank.name} - {bank.rate}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estimated Interest:</span>
            <span className="font-bold">{formatCurrency(estimatedInterest, watchCurrency)}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium">Interest Rate:</span>
            <span>{rate}%</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-medium">Total at Maturity:</span>
            <span className="font-bold">{formatCurrency(watchAmount + estimatedInterest, watchCurrency)}</span>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" className="mr-2">Cancel</Button>
          <Button type="submit">Create Deposit</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTermDepositForm;
