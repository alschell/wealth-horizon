
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AllocationValidationError: React.FC = () => {
  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select an instrument and specify a valid quantity before allocating.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AllocationValidationError;
