
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface AccountListProps {
  accounts: FinancialAccountInfo[];
  onRemoveAccount: (index: number) => void;
  onEditAccount: (index: number) => void;
}

const AccountList = ({ accounts, onRemoveAccount, onEditAccount }: AccountListProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDeleteIndex, setAccountToDeleteIndex] = useState<number | null>(null);

  // Handle click on delete button
  const handleDeleteClick = (index: number) => {
    setAccountToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  // Confirm and execute delete
  const confirmDelete = () => {
    if (accountToDeleteIndex !== null) {
      onRemoveAccount(accountToDeleteIndex);
    }
    setIsDeleteDialogOpen(false);
    setAccountToDeleteIndex(null);
  };

  if (accounts.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-gray-50">
        <p className="text-gray-500">No financial accounts added yet.</p>
        <p className="text-sm text-gray-400 mt-1">Please add at least one account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Financial Accounts</h3>
      
      <div className="space-y-3">
        {accounts.map((account, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{account.accountName}</h4>
                <p className="text-sm text-gray-600">
                  {account.institution} • {account.accountType} • {account.currency}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditAccount(index)}
                  className="h-8"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(index)}
                  className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Account Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this financial account? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccountList;
