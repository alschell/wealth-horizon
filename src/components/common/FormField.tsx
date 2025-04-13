
import React from 'react';
import { 
  FormControl, 
  FormDescription, 
  FormField as ShadcnFormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
}

/**
 * Reusable form field component for use with react-hook-form
 */
export function FormField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  options = [],
  required = false,
  disabled = false,
  className,
  inputProps = {},
}: FormFieldProps<T>) {
  return (
    <ShadcnFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          
          <FormControl>
            {renderFormControl({ field, type, options, placeholder, disabled, inputProps })}
          </FormControl>
          
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Helper function to render the appropriate form control
function renderFormControl<T extends FieldValues>({
  field,
  type,
  options,
  placeholder,
  disabled,
  inputProps,
}: {
  field: ControllerRenderProps<T, any>;
  type: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
}) {
  switch (type) {
    case 'textarea':
      return (
        <Textarea
          {...field}
          placeholder={placeholder}
          disabled={disabled}
          {...inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      );
      
    case 'select':
      return (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
      
    case 'checkbox':
      return (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={disabled}
        />
      );
      
    default:
      return (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...inputProps as React.InputHTMLAttributes<HTMLInputElement>}
        />
      );
  }
}
