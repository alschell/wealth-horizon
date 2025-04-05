
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import BackButtonHeader from "@/components/navigation/BackButtonHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, BarChart3, AlertTriangle, Globe } from "lucide-react";

const EsgAnalysis = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButtonHeader title="Back to Dashboard" />
        
        <PageHeaderCard
          icon={Leaf}
          title="ESG Analysis"
          description="Analyze your portfolio's environmental, social, and governance impact"
          iconColor="text-emerald-600"
          iconBgColor="bg-emerald-100"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
            <div className="flex items-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="ml-2 font-medium">Environmental</h3>
            </div>
            <div className="text-center my-4">
              <span className="text-4xl font-bold text-green-600">76</span>
              <span className="text-sm text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-sm text-gray-500 mt-auto">
              Top 20% in environmental practices compared to similar portfolios
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
            <div className="flex items-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-2 font-medium">Social</h3>
            </div>
            <div className="text-center my-4">
              <span className="text-4xl font-bold text-blue-600">68</span>
              <span className="text-sm text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-sm text-gray-500 mt-auto">
              Above average social impact, with opportunity for improvement
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
            <div className="flex items-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="ml-2 font-medium">Governance</h3>
            </div>
            <div className="text-center my-4">
              <span className="text-4xl font-bold text-purple-600">82</span>
              <span className="text-sm text-gray-500 ml-1">/100</span>
            </div>
            <p className="text-sm text-gray-500 mt-auto">
              Excellent governance practices, top 10% among peers
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
            <TabsTrigger value="holdings">ESG by Holdings</TabsTrigger>
            <TabsTrigger value="risks">ESG Risks</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">Portfolio ESG Rating</h3>
              <div className="h-64 flex items-center justify-center border border-dashed rounded p-4">
                <p className="text-sm text-gray-500">ESG rating visualization coming soon</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                ESG Improvement Opportunities
              </h3>
              <div className="space-y-3">
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium">High carbon exposure in energy sector</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Your portfolio has 12% exposure to high-carbon energy companies. Consider green energy alternatives.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">View Alternatives</Button>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium">Enhance board diversity</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    8% of holdings have below-average board diversity metrics. Filter for companies with better governance.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">View Alternatives</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="holdings">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">ESG Analysis by Holdings</h3>
              <p className="text-sm text-gray-500 mb-4">
                View detailed ESG metrics for each investment in your portfolio.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Generate Report
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risks">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">ESG Risk Assessment</h3>
              <p className="text-sm text-gray-500 mb-4">
                Analyze potential ESG-related risks in your portfolio.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Generate Risk Report
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reporting">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">ESG Reporting</h3>
              <p className="text-sm text-gray-500 mb-4">
                Generate comprehensive ESG reports for stakeholders and regulatory compliance.
              </p>
              
              <div className="flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white">
                  Create New Report
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default EsgAnalysis;
