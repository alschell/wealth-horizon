
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { CreditCard, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCreditFacilitiesFlat } from "@/components/trading/data/creditFacilities";

const CreditFacilities = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={CreditCard}
          title="Manage Credit Facilities"
          description="View, manage, and monitor your credit lines and lending facilities"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Active Credit Facilities</h2>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" /> Add New Facility
          </Button>
        </div>
        
        <div className="grid md:grid-cols-1 gap-4">
          {mockCreditFacilitiesFlat.map((facility) => (
            <Card key={facility.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{facility.name}</CardTitle>
                    <p className="text-sm text-gray-500">Type: {facility.type}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Limit</p>
                      <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.limit)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Used</p>
                      <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.used)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Available</p>
                      <p className="text-lg font-semibold text-green-600">{new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.available)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => navigate("/borrow")}>
                      Borrow
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditFacilities;
