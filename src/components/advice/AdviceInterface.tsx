
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import components
import AdviceHeader from "./components/AdviceHeader";
import OverviewTab from "./tabs/OverviewTab";
import ActiveMandatesTab from "./tabs/ActiveMandatesTab";
import PendingMandatesTab from "./tabs/PendingMandatesTab";
import BenchmarkingTab from "./tabs/BenchmarkingTab";

const AdviceInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleNewAdvice = () => {
    navigate("/advice/new");
  };

  return (
    <div className="p-6 space-y-6">
      <AdviceHeader onNewAdvice={handleNewAdvice} />

      <div>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="active">Active Mandates</TabsTrigger>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="benchmarking">Performance Benchmarking</TabsTrigger>
            </TabsList>
          </div>

          <div>
            <TabsContent value="overview" className="space-y-4">
              <OverviewTab />
            </TabsContent>
          </div>

          <div>
            <TabsContent value="active" className="space-y-4">
              <ActiveMandatesTab />
            </TabsContent>
          </div>

          <div>
            <TabsContent value="pending" className="space-y-4">
              <PendingMandatesTab />
            </TabsContent>
          </div>

          <div>
            <TabsContent value="benchmarking" className="space-y-4">
              <BenchmarkingTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdviceInterface;
