
import React from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Layout from "@/components/Layout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ComplianceMonitoring = () => {
  return (
    <DashboardLayout>
      <Layout>
        <div className="space-y-6">
          <PageHeaderCard
            icon={Shield}
            title="Monitor Compliance"
            description="Track regulatory activities"
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Filings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No upcoming filings due in the next 30 days.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No new regulatory changes affecting your portfolios.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <p>All compliance requirements are up to date.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">All regulatory deadlines are being monitored and will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </DashboardLayout>
  );
};

export default ComplianceMonitoring;
