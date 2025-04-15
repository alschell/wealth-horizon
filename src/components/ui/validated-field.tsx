
import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormError } from '@/components/ui/form-error';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url' | 'textarea' | 'checkbox' | 'radio';

interface ValidatedFieldProps {
  name: string;
  label?: string;
  type?: InputType;
  placeholder?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  [key: string]: any;
}

export const ValidatedField: React.FC<ValidatedFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  disabled,
  className,
  inputClassName,
  labelClassName,
  ...props
}) => {
  // Determine if we should render a textarea or input
  const isTextarea = type === 'textarea';
  const isCheckbox = type === 'checkbox';
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
      
      {isCheckbox ? (
        <div className="flex items-center">
          <Input
            id={name}
            name={name}
            type="checkbox"
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={cn(
              "h-4 w-4 rounded mr-2",
              error && 'border-red-500',
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            {...props}
          />
          {props.checkboxLabel && (
            <label htmlFor={name} className="text-sm">{props.checkboxLabel}</label>
          )}
        </div>
      ) : (
        <InputComponent
          id={name}
          name={name}
          type={isTextarea ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            error && 'border-red-500 focus-visible:ring-red-500', 
            inputClassName
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...props}
        />
      )}
      
      {error && <FormError message={error} id={`${name}-error`} />}
    </div>
  );
};

export default ValidatedField;
