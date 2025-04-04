
import React from "react";
import { Puzzle } from "lucide-react";

const IntegrationsHeader = () => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        <Puzzle className="h-8 w-8" />
        Third-Party Integrations
      </h1>
      <p className="text-muted-foreground">
        Connect your family office with external service providers and tools to enhance your wealth management capabilities.
      </p>
    </div>
  );
};

export default IntegrationsHeader;
