
import { useState } from 'react';
import { TermDepositData } from '../types';

export const useTermDepositForm = () => {
  const [formData, setFormData] = useState<TermDepositData>({
    amount: 0,
    term: '',
    rate: 0,
    institution: ''
  });

  const handleInputChange = (field: keyof TermDepositData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    formData,
    handleInputChange
  };
};
