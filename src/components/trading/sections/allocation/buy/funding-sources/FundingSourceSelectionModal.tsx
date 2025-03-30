
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { 
  CashAccountsList, 
  CreditFacilitiesList 
} from "./components";

interface FundingSourceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selections: Record<string, number>) => void;
  totalAmount: number;
  currentAllocations: Record<string, number>;
  instrumentPrice: number;
  currency: string;
}

const FundingSourceSelectionModal: React.FC<FundingSourceSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  totalAmount,
  currentAllocations,
  instrumentPrice,
  currency
}) => {
  const [activeTab, setActiveTab] = useState<"cash" | "credit">("cash");
  const [tempAllocations, setTempAllocations] = useState<Record<string, number>>({});
  const [totalShares, setTotalShares] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize temporary allocations when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempAllocations(currentAllocations);
      
      // Calculate total shares from current allocations
      const total = Object.values(currentAllocations).reduce((sum, qty) => sum + qty, 0);
      setTotalShares(total);
      setIsSubmitting(false);
      setSearchQuery("");
    }
  }, [isOpen, currentAllocations]);

  const handleTempAllocationChange = (sourceId: string, quantity: number) => {
    const newAllocations = { ...tempAllocations, [sourceId]: quantity };
    setTempAllocations(newAllocations);
    
    // Update total shares
    const newTotal = Object.values(newAllocations).reduce((sum, qty) => sum + qty, 0);
    setTotalShares(newTotal);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Add a small delay to show loading state
    setTimeout(() => {
      onConfirm(tempAllocations);
      onClose();
      setIsSubmitting(false);
    }, 300);
  };

  // Get required shares needed to fully fund the order
  const requiredShares = totalAmount / instrumentPrice;
  const remainingShares = requiredShares - totalShares;
  
  // Calculate allocation percentage
  const allocationPercentage = Math.min(100, (totalShares / requiredShares) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen => !setIsOpen && onClose()}>
      <DialogContent className="max-w-5xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Select Funding Sources</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total number of shares to be allocated: {Math.ceil(requiredShares)}</span>
              <span>Shares allocated: {totalShares.toFixed(2)}</span>
            </div>
            
            <Progress value={allocationPercentage} className="h-2" />
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 h-10"
              placeholder={`Search ${activeTab === "cash" ? "cash accounts" : "credit facilities"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="cash" value={activeTab} onValueChange={(v) => {
            setActiveTab(v as "cash" | "credit");
            setSearchQuery("");
          }}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="cash">Cash Accounts</TabsTrigger>
              <TabsTrigger value="credit">Credit Facilities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="cash" className="mt-4">
              <CashAccountsList
                tempAllocations={tempAllocations}
                handleTempAllocationChange={handleTempAllocationChange}
                instrumentPrice={instrumentPrice}
                remainingShares={remainingShares}
                searchQuery={searchQuery}
              />
            </TabsContent>
            
            <TabsContent value="credit" className="mt-4">
              <CreditFacilitiesList
                tempAllocations={tempAllocations}
                handleTempAllocationChange={handleTempAllocationChange}
                instrumentPrice={instrumentPrice}
                remainingShares={remainingShares}
                searchQuery={searchQuery}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundingSourceSelectionModal;
