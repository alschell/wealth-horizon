
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  autoComplete?: string; // Add autoComplete property
}

const FormFields: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  required = false,
  error,
  type = 'text',
  placeholder,
  className,
  inputClassName,
  labelClassName,
  autoComplete,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-baseline justify-between">
        <Label 
          htmlFor={id} 
          className={cn(
            "text-sm font-medium", 
            error ? "text-red-500" : "text-gray-700",
            labelClassName
          )}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      </div>
      
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={cn(
          error ? "border-red-500 focus-visible:ring-red-500" : "",
          inputClassName
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
      />
      
      {error && (
        <p 
          id={`${id}-error`} 
          className="text-sm font-medium text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormFields;
