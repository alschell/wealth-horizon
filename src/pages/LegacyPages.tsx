
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const pageName = location.pathname.split('/').filter(Boolean)[0];
  const formattedName = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/" className="text-indigo-600 hover:underline mb-4 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{formattedName || 'Page'}</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

const LegacyPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').filter(Boolean)[0];
  const formattedName = pageName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <PageLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{formattedName}</h2>
      <p className="text-gray-600 mb-6">
        This page is currently under development. Please check back soon for more information 
        about {formattedName.toLowerCase()}.
      </p>
      <div className="flex space-x-4">
        <Link 
          to="/contact" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Contact Us
        </Link>
        <Link 
          to="/" 
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </PageLayout>
  );
};

export default LegacyPage;
