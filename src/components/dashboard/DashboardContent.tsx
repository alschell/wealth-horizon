
import React from "react";
import { Link } from "react-router-dom";

interface DashboardContentProps {
  orderedVisibleSections: string[];
  onCustomizeClick: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  orderedVisibleSections,
  onCustomizeClick
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={onCustomizeClick}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Customize Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Demo cards */}
        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
          <h3 className="font-medium mb-2">Form Validation Demo</h3>
          <p className="text-gray-500 text-sm mb-4">
            Showcase of our new unified form validation framework
          </p>
          <Link
            to="/validation-demo"
            className="text-primary hover:underline text-sm font-medium"
          >
            View Demo
          </Link>
        </div>

        <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
          <h3 className="font-medium mb-2">Error Handling Demo</h3>
          <p className="text-gray-500 text-sm mb-4">
            Demonstrate error boundaries and error handling patterns
          </p>
          <Link
            to="/error-demo"
            className="text-primary hover:underline text-sm font-medium"
          >
            View Demo
          </Link>
        </div>
      </div>

      {/* Placeholder for dashboard sections */}
      <div className="grid grid-cols-1 gap-6">
        {orderedVisibleSections.map((section) => (
          <div
            key={section}
            className="p-6 border rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold mb-4">{section}</h2>
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Content for {section}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
