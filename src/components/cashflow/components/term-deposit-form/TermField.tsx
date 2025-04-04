
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "./FormSchema";

interface TermFieldProps {
  form: UseFormReturn<FormValues>;
}

const TermField: React.FC<TermFieldProps> = ({ form }) => {
  return (
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
  );
};

export default TermField;
