import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Scroll, FileText } from "lucide-react";

const LegacyPlanningInterface = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="estate-planning">Estate Planning</TabsTrigger>
          <TabsTrigger value="succession">Succession Planning</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Scroll className="h-5 w-5 mr-2 text-amber-600" /> Estate Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Manage your estate planning documents, trusts, and related entities to ensure your assets are distributed according to your wishes.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Will and Testament
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Living Trust
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Power of Attorney
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2 text-amber-600" /> Succession Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Prepare for business or family wealth continuity with comprehensive succession planning tools and resources.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Family Business Transition
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Next Generation Planning
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                    Wealth Transfer Strategy
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-amber-600" /> Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Living Trust - Smith Family</p>
                    <p className="text-sm text-gray-500">Last updated: April 2, 2025</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Business Succession Plan</p>
                    <p className="text-sm text-gray-500">Last updated: March 15, 2025</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">Power of Attorney - Healthcare</p>
                    <p className="text-sm text-gray-500">Last updated: February 28, 2025</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">View</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="estate-planning">
          <Card>
            <CardHeader>
              <CardTitle>Estate Planning Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive estate planning tools and resources to help you manage your legacy.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Will and Testament Management</h3>
                  <p className="text-sm text-gray-500">Create and manage your will and testament documents.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Trust Administration</h3>
                  <p className="text-sm text-gray-500">Manage your trusts and trust beneficiaries.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Beneficiary Planning</h3>
                  <p className="text-sm text-gray-500">Organize and plan your estate distribution.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="succession">
          <Card>
            <CardHeader>
              <CardTitle>Succession Planning Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Tools and resources to create effective succession plans for businesses and family wealth.
              </p>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Business Transition Planning</h3>
                  <p className="text-sm text-gray-500">Plan for the smooth transition of business ownership and management.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Next Generation Training</h3>
                  <p className="text-sm text-gray-500">Resources for preparing the next generation to take over.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Family Governance</h3>
                  <p className="text-sm text-gray-500">Establish effective family governance structures for wealth management.</p>
                  <button className="mt-2 text-sm text-blue-600 hover:underline">Access Tools</button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Legacy Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage all your legacy planning related documents in one place.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <h3 className="font-medium">Will and Testament</h3>
                    <p className="text-xs text-gray-500">Last updated: April 5, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">View</button>
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Download</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <h3 className="font-medium">Family Trust</h3>
                    <p className="text-xs text-gray-500">Last updated: March 22, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">View</button>
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Download</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <h3 className="font-medium">Power of Attorney - Financial</h3>
                    <p className="text-xs text-gray-500">Last updated: February 18, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">View</button>
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Download</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <h3 className="font-medium">Power of Attorney - Healthcare</h3>
                    <p className="text-xs text-gray-500">Last updated: February 18, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">View</button>
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Download</button>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <h3 className="font-medium">Succession Plan - Family Business</h3>
                    <p className="text-xs text-gray-500">Last updated: January 10, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">View</button>
                    <button className="px-2 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Download</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegacyPlanningInterface;
