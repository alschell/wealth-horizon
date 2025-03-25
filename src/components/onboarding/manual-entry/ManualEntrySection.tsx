
import React from "react";
import { ManualEntrySectionProps } from "./types";
import AccountForm from "./AccountForm";
import AccountsList from "./AccountsList";
import { Separator } from "@/components/ui/separator";

const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  accounts,
  onAddAccount,
  onRemoveAccount
}) => {
  return (
    <div className="space-y-6">
      <AccountForm onAddAccount={onAddAccount} />
      <Separator className="my-6" />
      <p className="text-sm text-gray-500 mb-6">
        Fields marked with <span className="text-red-500">*</span> are required.
      </p>
      <AccountsList accounts={accounts} onRemoveAccount={onRemoveAccount} />
    </div>
  );
};

export default ManualEntrySection;
