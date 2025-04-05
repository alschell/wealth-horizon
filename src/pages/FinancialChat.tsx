
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIAssistant from "@/components/ai-assistant/AIAssistant";
import CommandPanel from "@/components/ai-assistant/CommandPanel";

const FinancialChat = () => {
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
          icon={MessageSquare}
          title="Financial Chat"
          description="Execute financial commands, ask questions, and get real-time insights"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid grid-cols-2 w-64 mb-4">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <AIAssistant />
          </TabsContent>
          
          <TabsContent value="commands" className="space-y-4">
            <CommandPanel />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FinancialChat;
