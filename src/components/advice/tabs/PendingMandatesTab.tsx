
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const PendingMandatesTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-black" />
        Pending Advisory Mandates
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>JP Morgan Private Bank</CardTitle>
          <CardDescription>Discretionary Mandate - Submitted March 28, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-gray-600">Under Review</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Proposed Assets</span>
            <span className="font-medium">$3.2B</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Expected Approval</span>
            <span className="font-medium">April 15, 2025</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1">View Details</Button>
            <Button variant="outline" className="flex-1 text-gray-700 hover:bg-gray-100">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingMandatesTab;
