
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/hooks/use-notifications";

const UserGuides = () => {
  const { showSuccess } = useNotifications();
  
  const handleDownload = (guideName: string) => {
    showSuccess(
      "Download started",
      `Your ${guideName} guide is being downloaded.`
    );
    
    // For demo purposes, simulate a download with a timeout
    setTimeout(() => {
      // This creates a text file for demo purposes
      const element = document.createElement("a");
      const file = new Blob([`This is a sample ${guideName} guide from WealthHorizon.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `WealthHorizon-${guideName.replace(/\s+/g, '-')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  return (
    <PageTemplate
      title="User Guides"
      description="Comprehensive guides to help you get the most out of WealthHorizon."
      icon={FileText}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Platform Overview",
                description: "Learn about the key features and capabilities of WealthHorizon.",
              },
              {
                title: "Account Setup",
                description: "Set up your account and customize your preferences.",
              },
              {
                title: "Navigation Guide",
                description: "Navigate through different sections of the platform efficiently.",
              }
            ].map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(guide.title)}
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Portfolio Management",
                description: "Advanced techniques for managing and optimizing your portfolio.",
              },
              {
                title: "Tax Optimization",
                description: "Strategies for minimizing tax impact on your investments.",
              },
              {
                title: "Reporting Tools",
                description: "Generate and customize reports for your financial data.",
              }
            ].map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(guide.title)}
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Technical Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "API Integration",
                description: "Connect your systems with WealthHorizon through our API.",
              },
              {
                title: "Data Security",
                description: "Learn about our security measures and best practices.",
              },
              {
                title: "Admin Controls",
                description: "Administrative tools and user management features.",
              }
            ].map((guide, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDownload(guide.title)}
                  >
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default UserGuides;
