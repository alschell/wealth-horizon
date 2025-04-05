
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PastTradesList from "@/components/trading/dashboard/PastTradesList";
import PendingTradesList from "@/components/trading/dashboard/PendingTradesList";

const Trading = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<TrendingUp className="h-6 w-6" />}
          title="Trading"
          description="Manage your trading activities"
        />

        <div className="flex justify-between items-center">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              <TabsTrigger value="pending">Pending Trades</TabsTrigger>
              <TabsTrigger value="history">Trade History</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Pending Trades</CardTitle>
                </CardHeader>
                <CardContent>
                  <PendingTradesList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Trade History</CardTitle>
                </CardHeader>
                <CardContent>
                  <PastTradesList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Button 
            className="flex items-center gap-2" 
            onClick={() => navigate("/trading/new")}
          >
            <Plus className="h-4 w-4" />
            New Trade
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trading;
