
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";

interface OwnersListProps {
  owners: BeneficialOwnerInfo[];
  onRemoveOwner: (index: number) => void;
}

const OwnersList: React.FC<OwnersListProps> = ({ owners, onRemoveOwner }) => {
  if (owners.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Current Beneficial Owners</h3>
      
      {owners.map((owner, index) => (
        <div 
          key={index} 
          className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-gray-500" />
            <div>
              <p className="font-medium">{owner.firstName} {owner.lastName}</p>
              <p className="text-sm text-gray-500">
                {owner.relationship} · {owner.ownershipPercentage}% ownership · {owner.nationality}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveOwner(index)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default OwnersList;
