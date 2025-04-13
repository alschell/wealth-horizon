
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

export const ApiReferenceSection: React.FC = () => {
  const apiSections = [
    { title: "Portfolio Management", endpoints: 12, category: "Core" },
    { title: "Transaction API", endpoints: 8, category: "Core" },
    { title: "Reporting & Analytics", endpoints: 15, category: "Core" },
    { title: "User Management", endpoints: 7, category: "Administrative" },
    { title: "Data Integration", endpoints: 10, category: "Integration" },
    { title: "Authentication", endpoints: 5, category: "Security" }
  ];

  return (
    <section className="bg-white border border-gray-100 rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">API Reference</h2>
      <p className="text-gray-600 mb-6">
        Explore our comprehensive API documentation for detailed information on endpoints, parameters, and responses.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apiSections.map((api, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">{api.title}</h3>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-1">
                {api.category}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{api.endpoints} endpoints</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-1"
              asChild
            >
              <Link to={`/api-docs/api-reference#${api.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Code size={14} /> View Reference
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};
