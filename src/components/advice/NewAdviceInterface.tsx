
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";

const NewAdviceInterface: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToAdvice = () => {
    navigate("/advice");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={handleBackToAdvice}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Advisory
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Create New Advisory Mandate</h1>
        </div>

        <Tabs defaultValue="bank" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bank">Select Bank</TabsTrigger>
            <TabsTrigger value="mandate">Mandate Type</TabsTrigger>
            <TabsTrigger value="assets">Assets in Scope</TabsTrigger>
            <TabsTrigger value="review">Review & Submit</TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Advisory Institution</CardTitle>
                <CardDescription>
                  Choose the bank or institution that will provide advisory services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Bank selection interface will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mandate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Mandate Type</CardTitle>
                <CardDescription>
                  Choose between discretionary, advisory, or execution-only mandates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Mandate type selection will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select Assets in Scope</CardTitle>
                <CardDescription>
                  Choose which assets will be covered by this advisory mandate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Asset selection interface will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review Mandate Details</CardTitle>
                <CardDescription>
                  Review and confirm your advisory mandate details before submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Review interface will be displayed here</p>
                <Button className="mt-4">Submit Advisory Mandate</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NewAdviceInterface;
