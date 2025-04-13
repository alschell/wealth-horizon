
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CompanyInfoSection: React.FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Company Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">About WealthHorizon</h3>
          <p className="text-gray-600 mb-4">
            WealthHorizon is a leading wealth management technology provider for family offices and ultra-high-net-worth individuals. Founded in 2025, we now serve over 50 family offices across 15 countries with our comprehensive wealth management platform.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Leadership Team</h3>
          <p className="text-gray-600 mb-4">
            Our leadership team brings together expertise from wealth management, financial services, and technology to build solutions that address the unique needs of family offices and high-net-worth individuals.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/team">Meet the Team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfoSection;
