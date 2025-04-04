
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormValues } from "./FormSchema";

interface BankSelectionMethodProps {
  form: UseFormReturn<FormValues>;
  bestRate?: { bank: string; rate: number } | null;
}

const BankSelectionMethod: React.FC<BankSelectionMethodProps> = ({ 
  form, 
  bestRate 
}) => {
  return (
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
  );
};

export default BankSelectionMethod;
