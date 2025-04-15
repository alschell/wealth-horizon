
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  error?: string | null;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  placeholder,
  error,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  autoComplete,
  description
}) => {
  const inputId = `field-${id}`;
  const errorId = `error-${id}`;
  const descriptionId = `desc-${id}`;
  
  const ariaDescribedBy = [
    error ? errorId : null,
    description ? descriptionId : null
  ].filter(Boolean).join(' ') || undefined;
  
  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputId} 
        className="flex items-center block text-gray-700"
      >
        {label}
        {required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
      </label>
      
      {description && (
        <p 
          id={descriptionId} 
          className="text-xs text-gray-500"
        >
          {description}
        </p>
      )}
      
      {type === 'textarea' ? (
        <Textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as any}
          disabled={disabled}
          className={error ? 'border-red-300 focus:border-red-500' : ''}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          rows={4}
        />
      ) : (
        <Input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={error ? 'border-red-300 focus:border-red-500' : ''}
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
          aria-required={required}
          autoComplete={autoComplete}
        />
      )}
      
      {error && (
        <p 
          id={errorId} 
          className="text-sm font-medium text-red-500"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
};
