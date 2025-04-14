
import React from "react";
import { Button } from "@/components/ui/button";

const ActionButtons = () => {
  return (
    <div className="flex justify-end mt-2">
      <Button variant="outline" size="sm" className="mr-2">
        Dismiss
      </Button>
      <Button size="sm">
        Take Action
      </Button>
    </div>
  );
};

export default ActionButtons;
