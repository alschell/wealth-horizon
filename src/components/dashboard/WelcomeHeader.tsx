
import React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const WelcomeHeader = () => {
  return (
    <div className="flex justify-end">
      <Button>
        <Clock className="mr-2 h-4 w-4" /> Activity Log
      </Button>
    </div>
  );
};

export default WelcomeHeader;
