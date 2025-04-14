
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@/utils/icons";

const ActiveMandatesTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-black" />
        Active Advisory Mandates
      </h2>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>UBS Wealth Management</CardTitle>
            <CardDescription>Discretionary Mandate - Started Jan 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Performance (YTD)</span>
              <span className="font-medium text-green-600">+10.3%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Assets Under Management</span>
              <span className="font-medium">$2.4B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Review</span>
              <span className="font-medium">March 15, 2025</span>
            </div>
            <Button variant="outline" className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Credit Suisse Private Banking</CardTitle>
            <CardDescription>Advisory Mandate - Started June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Performance (YTD)</span>
              <span className="font-medium text-green-600">+6.1%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Assets Under Advice</span>
              <span className="font-medium">$1.8B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Advice</span>
              <span className="font-medium">April 2, 2025</span>
            </div>
            <Button variant="outline" className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActiveMandatesTab;
