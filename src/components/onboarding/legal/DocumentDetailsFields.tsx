
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DocumentDetailsFieldsProps {
  issueDate: string;
  expiryDate: string;
  onDateChange: (field: 'issueDate' | 'expiryDate', date?: Date) => void;
  error: Record<string, boolean>;
}

const DocumentDetailsFields: React.FC<DocumentDetailsFieldsProps> = ({
  issueDate,
  expiryDate,
  onDateChange,
  error
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Issue Date <span className="text-red-500">*</span></label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !issueDate && "text-gray-500",
                error.issueDate && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {issueDate ? format(new Date(issueDate), 'PP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={issueDate ? new Date(issueDate) : undefined}
              onSelect={(date) => onDateChange('issueDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Expiry Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !expiryDate && "text-gray-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDate ? format(new Date(expiryDate), 'PP') : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={expiryDate ? new Date(expiryDate) : undefined}
              onSelect={(date) => onDateChange('expiryDate', date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DocumentDetailsFields;
