
import { useCallback } from 'react';
import { IndexData } from '../types';

export const useIndexActions = () => {
  const handleSelectIndex = useCallback((index: IndexData) => {
    // Selected index handling logic
    console.log('Selected index:', index.name);
  }, []);

  const toggleSubscription = useCallback((
    indexName: string,
    subscribedIndices: string[],
    setSubscribedIndices: (indices: string[]) => void
  ) => {
    if (subscribedIndices.includes(indexName)) {
      setSubscribedIndices(subscribedIndices.filter(name => name !== indexName));
    } else {
      setSubscribedIndices([...subscribedIndices, indexName]);
    }
  }, []);

  return {
    handleSelectIndex,
    toggleSubscription
  };
};
