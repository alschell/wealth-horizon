
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTermDepositForm } from './hooks/useTermDepositForm';
import { TermDepositFormProps } from './types';

const NewTermDepositForm: React.FC<TermDepositFormProps> = ({ onSubmit }) => {
  const { formData, handleInputChange } = useTermDepositForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="number"
          value={formData.amount}
          onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
          placeholder="Amount"
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="text"
          value={formData.term}
          onChange={(e) => handleInputChange('term', e.target.value)}
          placeholder="Term"
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="number"
          value={formData.rate}
          onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
          placeholder="Interest Rate"
          step="0.01"
          className="w-full"
        />
      </div>
      <div>
        <Input
          type="text"
          value={formData.institution}
          onChange={(e) => handleInputChange('institution', e.target.value)}
          placeholder="Institution"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">Create Term Deposit</Button>
    </form>
  );
};

export default NewTermDepositForm;
