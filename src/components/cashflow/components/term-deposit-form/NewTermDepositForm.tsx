
import React from "react";
import { Form } from "@/components/ui/form";
import { useTermDepositForm } from "./useTermDepositForm";
import AmountCurrencyFields from "./AmountCurrencyFields";
import TermField from "./TermField";
import BankSelectionMethod from "./BankSelectionMethod";
import BankSelectionField from "./BankSelectionField";
import DepositSummary from "./DepositSummary";
import FormActions from "./FormActions";

interface NewTermDepositFormProps {
  bestRate?: { bank: string; currency: string; term: string; rate: number } | null;
}

const NewTermDepositForm: React.FC<NewTermDepositFormProps> = ({ bestRate }) => {
  const {
    form,
    watchBankSelection,
    rate,
    estimatedInterest,
    onSubmit,
  } = useTermDepositForm({ bestRate });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <AmountCurrencyFields form={form} />
        <TermField form={form} />
        <BankSelectionMethod form={form} bestRate={bestRate} />
        
        {watchBankSelection === "custom" && (
          <BankSelectionField form={form} />
        )}
        
        <DepositSummary 
          watch={form.watch} 
          rate={rate} 
          estimatedInterest={estimatedInterest} 
        />
        
        <FormActions />
      </form>
    </Form>
  );
};

export default NewTermDepositForm;
