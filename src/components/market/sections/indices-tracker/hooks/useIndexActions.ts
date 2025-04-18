
import { useNavigate } from "react-router-dom";
import { IndexData } from "../types";

export const useIndexActions = () => {
  const navigate = useNavigate();

  const handleSelectIndex = (index: IndexData) => {
    navigate(`/market-data?index=${encodeURIComponent(index.name)}`);
  };

  const toggleSubscription = (
    indexName: string, 
    subscribedIndices: string[], 
    setSubscribedIndices: (indices: string[]) => void
  ) => {
    if (subscribedIndices.includes(indexName)) {
      setSubscribedIndices(subscribedIndices.filter(name => name !== indexName));
    } else {
      setSubscribedIndices([...subscribedIndices, indexName]);
    }
  };

  return {
    handleSelectIndex,
    toggleSubscription
  };
};
