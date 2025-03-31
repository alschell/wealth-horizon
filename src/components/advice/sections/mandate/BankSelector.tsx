
import React, { useState, memo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Bank, MandateType } from "../../types";
import { mockBanks } from "../../data/banks";

interface BankSelectorProps {
  selectedBank: Bank | null;
  mandateType: MandateType;
  onBankSelection: (bank: Bank | null) => void;
}

const BankCard = memo(({ 
  bank, 
  isSelected,
  onSelect
}: { 
  bank: Bank;
  isSelected: boolean;
  onSelect: () => void;
}) => (
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
    className={`p-4 cursor-pointer transition-all h-full rounded-lg border ${
      isSelected ? 'ring-2 ring-black bg-gray-50' : 'hover:bg-gray-50'
    }`}
    aria-pressed={isSelected}
  >
    <div className="w-full">
      <div className="font-medium text-sm">{bank.name}</div>
      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{bank.description}</p>
      {bank.fee && <p className="text-xs text-gray-700 mt-1">Fee: {bank.fee}</p>}
    </div>
  </div>
));

BankCard.displayName = "BankCard";

const BankSelector: React.FC<BankSelectorProps> = ({
  selectedBank,
  mandateType,
  onBankSelection
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sort banks alphabetically
  const sortedBanks = [...mockBanks].sort((a, b) => a.name.localeCompare(b.name));
  
  // Filter banks by search query
  const filteredBanks = sortedBanks.filter((bank) => {
    return bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           bank.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           bank.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
           bank.expertise.some(expertise => expertise.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleBankSelect = (bank: Bank) => {
    onBankSelection(bank.id === selectedBank?.id ? null : bank);
  };

  return (
    <div className="space-y-4">
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for a bank by name, services or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredBanks.map((bank) => (
          <BankCard
            key={bank.id}
            bank={bank}
            isSelected={selectedBank?.id === bank.id}
            onSelect={() => handleBankSelect(bank)}
          />
        ))}
      </div>
      
      {filteredBanks.length === 0 && (
        <p className="text-gray-500 text-center py-4">No banks found matching your search</p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {mandateType === "discretionary" 
            ? "The selected bank will manage your assets according to your investment profile and objectives." 
            : "The selected bank will provide investment recommendations for your consideration and execution."}
        </p>
      </div>
    </div>
  );
};

export default BankSelector;
