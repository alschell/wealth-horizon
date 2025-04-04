
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankOptions } from "./BankSelectionField";
import { formSchema, FormValues } from "./FormSchema";

interface UseTermDepositFormProps {
  bestRate?: { bank: string; currency: string; term: string; rate: number } | null;
}

export const useTermDepositForm = ({ bestRate }: UseTermDepositFormProps) => {
  const form = useForm<FormValues>({
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

  // Calculate estimated interest
  const selectedBank = useMemo(() => {
    return watchBankSelection === "best" 
      ? bestRate
      : bankOptions.find(bank => bank.name === form.getValues("bank"));
  }, [watchBankSelection, bestRate, form]);
      
  const rate = selectedBank?.rate || 3.5; // Default if not found
  
  // Simple interest calculation
  const termInMonths = watchTerm === "3 months" ? 3 : 
                      watchTerm === "6 months" ? 6 : 12;
  const estimatedInterest = (watchAmount * (rate / 100) * termInMonths) / 12;

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // In a real app, we'd save this to a backend
    console.log("Estimated Interest:", estimatedInterest);
  };

  return {
    form,
    watchBankSelection,
    watchCurrency,
    watchTerm,
    watchAmount,
    selectedBank,
    rate,
    estimatedInterest,
    onSubmit
  };
};
