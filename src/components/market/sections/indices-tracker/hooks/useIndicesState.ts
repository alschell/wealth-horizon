
import { useState } from 'react';
import { IndexData } from '../types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const useIndicesState = (providedIndices?: IndexData[]) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<IndexData | null>(null);
  const [subscribedIndices, setSubscribedIndices] = useLocalStorage<string[]>('subscribedIndices', []);

  return {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    selectedIndex,
    setSelectedIndex,
    subscribedIndices,
    setSubscribedIndices
  };
};
