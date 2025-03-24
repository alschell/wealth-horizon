
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface DateFieldProps {
  id?: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  closeOnSelect?: boolean;
}

const DateField = ({
  id,
  label,
  value,
  onChange,
  required = false,
  placeholder = 'Select date',
  error,
  disabled = false,
  className,
  closeOnSelect = true
}: DateFieldProps) => {
  const [open, setOpen] = useState(false);
  
  const date = value ? new Date(value) : undefined;

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date.toISOString());
      if (closeOnSelect) {
        setOpen(false);
      }
    } else {
      onChange('');
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label htmlFor={id} className="text-black">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            size="lg"
            className={cn(
              'w-full justify-start text-left font-normal h-11 bg-white border',
              !date && 'text-gray-500',
              error && 'border-red-500',
              'focus:ring-2 focus:ring-ring focus:ring-offset-2',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date ? (
              <span className="text-black">{format(date, 'PPP')}</span>
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white pointer-events-auto" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={disabled}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DateField;
