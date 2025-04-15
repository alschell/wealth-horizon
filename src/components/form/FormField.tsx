
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'textarea';

interface FormFieldProps {
  name: string;
  label?: string;
  type?: InputType;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  [key: string]: any;
}

/**
 * A standardized form field component that handles different input types
 * and displays validation errors
 */
export function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  error,
  required,
  disabled,
  className,
  inputClassName,
  labelClassName,
  errorClassName,
  ...props
}: FormFieldProps) {
  // Determine if we should render a textarea or input
  const isTextarea = type === 'textarea';
  const InputComponent = isTextarea ? Textarea : Input;
  
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label 
          htmlFor={name} 
          className={cn(
            required && 'after:content-["*"] after:ml-0.5 after:text-red-500',
            labelClassName
          )}
        >
          {label}
        </Label>
      )}
      
      <InputComponent
        id={name}
        name={name}
        type={isTextarea ? undefined : type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(error && 'border-red-500 focus-visible:ring-red-500', inputClassName)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        {...props}
      />
      
      {error && (
        <p 
          id={`${name}-error`} 
          className={cn('text-sm font-medium text-red-500', errorClassName)}
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
