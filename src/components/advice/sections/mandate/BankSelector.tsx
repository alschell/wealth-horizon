
import React, { useState } from "react";
import { Search, Check, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bank, MandateType } from "../../types";
import { mockBanks } from "../../data/banks";

interface BankSelectorProps {
  selectedBank: Bank | null;
  mandateType: MandateType;
  onBankSelection: (bank: Bank | null) => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({
  selectedBank,
  mandateType,
  onBankSelection
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = mockBanks.filter((bank) => {
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
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search for a bank by name, services or expertise..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 gap-4">
          {filteredBanks.length > 0 ? (
            filteredBanks.map((bank) => (
              <div
                key={bank.id}
                onClick={() => handleBankSelect(bank)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedBank?.id === bank.id
                    ? "border-black bg-gray-100"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start">
                  <div className="shrink-0 mr-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Building className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-lg">{bank.name}</p>
                      {selectedBank?.id === bank.id && (
                        <Check className="h-5 w-5 text-black" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{bank.description}</p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <p className="text-xs text-gray-500">Services:</p>
                        {bank.services.map((service, index) => (
                          <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <p className="text-xs text-gray-500">Expertise:</p>
                        {bank.expertise.map((item, index) => (
                          <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                      {bank.fee && (
                        <p className="text-xs text-gray-500">
                          Fee Range: <span className="text-gray-700">{bank.fee}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No banks found matching your search criteria
            </div>
          )}
        </div>
      </ScrollArea>

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
