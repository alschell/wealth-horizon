
import React, { memo } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BankCardProps {
  bank: {
    id: string;
    name: string;
    rate: number;
  };
  isSelected: boolean;
  onSelect: () => void;
}

const BankCard = memo(({ 
  bank, 
  isSelected,
  onSelect
}: BankCardProps) => (
  <div 
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect();
      }
    }}
    className={cn(
      "p-4 cursor-pointer transition-all h-full rounded-lg border flex flex-col justify-between",
      isSelected 
        ? "ring-2 ring-black bg-gray-50 border-black" 
        : "hover:bg-gray-50 border-gray-200"
    )}
    aria-pressed={isSelected}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-lg">{bank.name}</h3>
        <p className="text-green-600 font-semibold mt-1">{bank.rate}% p.a.</p>
      </div>
      {isSelected && (
        <CheckCircle2 className="h-5 w-5 text-black" />
      )}
    </div>
  </div>
));

BankCard.displayName = "BankCard";

export default BankCard;
