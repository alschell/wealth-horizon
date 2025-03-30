
import React from "react";

interface NoResultsMessageProps {
  searchTerm: string;
}

const NoResultsMessage: React.FC<NoResultsMessageProps> = ({ searchTerm }) => {
  return (
    <div className="text-center p-4 border rounded-md">
      No instruments found matching "<span className="font-medium">{searchTerm}</span>". 
      Try a different search term.
    </div>
  );
};

export default NoResultsMessage;
