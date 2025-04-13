
/**
 * FormField component
 * 
 * A reusable, accessible form field component that handles:
 * - Labels with required indicators
 * - Input validation with error display
 * - Proper ARIA attributes for accessibility
 * 
 * @component
 */

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  /** Unique identifier for the form field */
  id: string;
  /** Name attribute for the form field (defaults to id if not provided) */
  name?: string;
  /** Label text to display */
  label: string;
  /** Current input value */
  value: string;
  /** Change handler function */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Input type (text, email, password, etc.) */
  type?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display (if any) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Maximum input length */
  maxLength?: number;
  /** Minimum input length */
  minLength?: number;
  /** HTML autocomplete attribute */
  autoComplete?: string;
  /** ID of element that describes this field (for ARIA) */
  "aria-describedby"?: string;
}

/**
 * A fully accessible form field component with error handling
 * 
 * @example
 * ```tsx
 * <FormField
 *   id="email"
 *   label="Email Address"
 *   value={email}
 *   onChange={handleEmailChange}
 *   type="email"
 *   error={errors.email}
 *   required={true}
 *   placeholder="Enter your email"
 *   autoComplete="email"
 * />
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = true,
  disabled = false,
  maxLength,
  minLength,
  autoComplete,
  ...restProps
}) => {
  // Generate a unique ID for the error message
  const errorId = `${id}-error`;
  
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center">
        {label}
        {required && <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>}
      </Label>
      <Input
        id={id}
        name={name || id} // Use name if provided, otherwise fall back to id
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(error ? "border-red-500" : "")}
        aria-required={required}
        aria-invalid={!!error}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        // Only set aria-describedby when there's actually an error
        {...(error ? { "aria-describedby": errorId } : {})}
        {...restProps}
      />
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
