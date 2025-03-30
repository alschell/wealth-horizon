
import React from "react";

const AllocationLoading: React.FC = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Loading Allocation Options...</h3>
      <div className="h-60 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    </div>
  );
};

export default AllocationLoading;
