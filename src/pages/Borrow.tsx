
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Wallet, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BorrowForm from "@/components/borrow/BorrowForm";
import { Badge } from "@/components/ui/badge";

const Borrow = () => {
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
          icon={Wallet}
          title="Borrow from Facility"
          description="Access your available credit facilities to fund investments or meet liquidity needs"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <BorrowForm />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Available Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Main Credit Line</h3>
                        <p className="text-xs text-gray-500">JPMorgan Chase</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Limit:</span>
                        <span className="font-medium">$25,000,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Available:</span>
                        <span className="font-medium text-green-600">$18,500,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Interest Rate:</span>
                        <span className="font-medium">SOFR + 1.25%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Securities-Backed Loan</h3>
                        <p className="text-xs text-gray-500">UBS</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Limit:</span>
                        <span className="font-medium">$10,000,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Available:</span>
                        <span className="font-medium text-green-600">$7,250,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Interest Rate:</span>
                        <span className="font-medium">SOFR + 0.95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Borrow;
