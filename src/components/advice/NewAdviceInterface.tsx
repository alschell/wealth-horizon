
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Building, FileText, Briefcase, CheckSquare, Lightbulb } from "lucide-react";

const NewAdviceInterface: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToAdvice = () => {
    navigate("/advice");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={handleBackToAdvice}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Advisory
          </Button>
          <Lightbulb className="h-8 w-8 text-black" />
          <h1 className="text-3xl font-bold tracking-tight">Create New Advisory Mandate</h1>
        </div>

        <Tabs defaultValue="bank" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bank" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              Select Bank
            </TabsTrigger>
            <TabsTrigger value="mandate" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Mandate Type
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Assets in Scope
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" />
              Review & Submit
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bank" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-black" />
                  <CardTitle>Select Advisory Institution</CardTitle>
                </div>
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
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-black" />
                  <CardTitle>Select Mandate Type</CardTitle>
                </div>
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
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-black" />
                  <CardTitle>Select Assets in Scope</CardTitle>
                </div>
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
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-black" />
                  <CardTitle>Review Mandate Details</CardTitle>
                </div>
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
