
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TemplatesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Templates
          </CardTitle>
          <Button size="sm">Create Template</Button>
        </div>
        <CardDescription>
          Customize and save report templates for future use
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-muted/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Overview</CardTitle>
              <CardDescription>
                Performance summary with asset allocation details
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-muted/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Transaction History</CardTitle>
              <CardDescription>
                Detailed view of all transactions across accounts
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardFooter>
          </Card>
          
          <Card className="bg-muted/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Tax Reporting</CardTitle>
              <CardDescription>
                Year-end tax documentation and summary
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" className="w-full">Generate Report</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatesTab;
