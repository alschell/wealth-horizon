
import React from "react";
import { Label } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BaseFormFieldProps = {
  id: string;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  hideLabel?: boolean;
};

type InputFieldProps = BaseFormFieldProps & {
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel';
  inputProps?: Omit<InputProps, 'id' | 'aria-invalid' | 'aria-describedby'>;
};

type TextareaFieldProps = BaseFormFieldProps & {
  type: 'textarea';
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

/**
 * Standardized form field with consistent layout and error handling
 */
export function FormField(props: FormFieldProps) {
  const { 
    id,
    label,
    error,
    required = false,
    className,
    labelClassName,
    errorClassName,
    hideLabel = false
  } = props;

  const hasError = !!error;
  const fieldId = `field-${id}`;
  const errorId = hasError ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {!hideLabel && label && (
        <Label 
          htmlFor={fieldId} 
          className={cn(
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            hasError && "text-destructive",
            labelClassName
          )}
        >
          {label}
        </Label>
      )}
      
      {'type' in props && props.type === 'textarea' ? (
        <Textarea
          id={fieldId}
          aria-invalid={hasError}
          aria-describedby={errorId}
          className={cn(hasError && "border-destructive")}
          {...props.textareaProps}
        />
      ) : (
        <Input
          id={fieldId}
          type={'type' in props ? props.type : 'text'}
          aria-invalid={hasError}
          aria-describedby={errorId}
          error={hasError}
          {...('inputProps' in props ? props.inputProps : {})}
        />
      )}
      
      {hasError && (
        <p 
          id={errorId} 
          className={cn("text-sm font-medium text-destructive", errorClassName)}
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
