
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import BackButtonHeader from "@/components/navigation/BackButtonHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, Calculator, GanttChart } from "lucide-react";

const WealthTransfer = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButtonHeader title="Back to Dashboard" />
        
        <PageHeaderCard
          icon={Users}
          title="Wealth Transfer Planning"
          description="Plan for generational wealth transfer with sophisticated tax optimization strategies"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="entities">Family Entities</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <GanttChart className="h-4 w-4 mr-2" />
                  Wealth Transfer Timeline
                </h3>
                <div className="h-64 flex items-center justify-center border border-dashed rounded p-4">
                  <p className="text-sm text-gray-500">Timeline visualization coming soon</p>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <h3 className="font-medium mb-4 flex items-center">
                  <Calculator className="h-4 w-4 mr-2" />
                  Tax Optimization
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current strategy</span>
                    <span className="text-sm font-medium">32% tax impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Optimized strategy</span>
                    <span className="text-sm font-medium text-green-600">19% tax impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Potential savings</span>
                    <span className="text-sm font-medium text-green-600">$24.3M</span>
                  </div>
                  
                  <Button className="w-full mt-4 bg-black hover:bg-gray-800 text-white">
                    View Optimization Plan
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Required Actions
              </h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Update family trust documents</h4>
                    <p className="text-xs text-gray-500">Required by December 31, 2025</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                
                <div className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Complete annual gifting</h4>
                    <p className="text-xs text-gray-500">4 of 12 beneficiaries completed</p>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="entities">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">Family Entities</h3>
              <p className="text-sm text-gray-500 mb-4">
                Manage your family entities, trusts, and legal structures.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Add New Entity
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="strategies">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">Wealth Transfer Strategies</h3>
              <p className="text-sm text-gray-500 mb-4">
                Explore and implement various wealth transfer strategies.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Explore Strategies
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">Estate Planning Documents</h3>
              <p className="text-sm text-gray-500 mb-4">
                Manage and organize all your legal documents related to estate planning.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Upload Documents
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WealthTransfer;
