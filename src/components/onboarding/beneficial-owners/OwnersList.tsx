
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BeneficialOwnerInfo, OwnersListProps } from "./types";
import { motion } from "framer-motion";
import { EditButton, DeleteButton } from "@/components/ui/action-buttons";

const OwnersList: React.FC<OwnersListProps> = ({ 
  owners, 
  onEditOwner, 
  onRemoveOwner 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-black">Beneficial Owners</h3>
        
        <Button
          type="button"
          className="text-white"
          onClick={() => onEditOwner(-1)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Beneficial Owner
        </Button>
      </div>
      
      {owners.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">
          No beneficial owners added yet. Please add at least one beneficial owner.
        </p>
      ) : (
        <div className="space-y-3">
          {owners.map((owner: BeneficialOwnerInfo, index: number) => (
            <motion.div
              key={owner.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 border rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium text-black">
                  {owner.firstName} {owner.lastName}
                </h4>
                <p className="text-sm text-gray-600">
                  {owner.relationship} • {owner.ownershipPercentage}% ownership • {owner.nationality}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <EditButton onClick={() => onEditOwner(index)} />
                <DeleteButton onClick={() => onRemoveOwner(index)} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnersList;
