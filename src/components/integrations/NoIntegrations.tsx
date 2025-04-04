
import React from "react";
import { Link2 } from "lucide-react";

const NoIntegrations = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-lg bg-muted/20">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Link2 className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No active integrations</h3>
      <p className="text-muted-foreground text-center max-w-md mt-2">
        You haven't connected any third-party services yet. Navigate to the Available Integrations tab to set up your first integration.
      </p>
    </div>
  );
};

export default NoIntegrations;
