
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { OwnersListProps } from "./types";
import { containerVariants, itemVariants } from "../common/AnimationVariants";

const OwnersList: React.FC<OwnersListProps> = ({ 
  owners, 
  onEditOwner, 
  onRemoveOwner 
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {owners.map((owner, index) => (
        <motion.div
          key={owner.id}
          custom={index}
          variants={itemVariants}
          className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{owner.firstName} {owner.lastName}</h3>
              <p className="text-gray-600">{owner.relationship}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Ownership:</span>
                  <span className="font-medium">{owner.ownershipPercentage}%</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Nationality:</span>
                  <span className="font-medium">{owner.nationality}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Birth Date:</span>
                  <span className="font-medium">{owner.dateOfBirth}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">Documents:</span>
                  <span className="font-medium">
                    {owner.documents && owner.documents.length > 0 
                      ? `${owner.documents.length} file(s)` 
                      : "None"}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditOwner(index)}
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveOwner(index)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OwnersList;
