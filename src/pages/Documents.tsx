
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DocumentManagementSystem from "@/components/documents/DocumentManagementSystem";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Documents = () => {
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
          icon={FileText}
          title="Manage Documents"
          description="Securely store, manage, and share important financial documents"
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <DocumentManagementSystem />
      </div>
    </DashboardLayout>
  );
};

export default Documents;
