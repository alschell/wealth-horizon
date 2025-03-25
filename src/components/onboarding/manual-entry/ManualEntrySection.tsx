
import React from "react";
import { ManualEntrySectionProps } from "./types";
import AccountForm from "./AccountForm";
import AccountsList from "./AccountsList";

const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  accounts,
  onAddAccount,
  onRemoveAccount
}) => {
  return (
    <div className="space-y-6">
      <AccountForm onAddAccount={onAddAccount} />
      <AccountsList accounts={accounts} onRemoveAccount={onRemoveAccount} />
    </div>
  );
};

export default ManualEntrySection;
