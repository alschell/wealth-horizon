
import React from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Financial Dashboard System
          </h1>
          
          <p className="text-gray-600 mb-8">
            Welcome to the Financial Dashboard System. This application provides tools for 
            financial management, account tracking, and data visualization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NavCard 
              title="Dashboard" 
              description="View your financial dashboard and key metrics"
              to="/dashboard"
            />
            
            <NavCard 
              title="Form Validation Demo" 
              description="Example of form validation techniques"
              to="/validation-demo"
            />
            
            <NavCard 
              title="Form Example" 
              description="Demonstrates the new unified form system"
              to="/form-example"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavCardProps {
  title: string;
  description: string;
  to: string;
}

function NavCard({ title, description, to }: NavCardProps) {
  return (
    <Link 
      to={to}
      className="block p-6 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors duration-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

export default HomePage;
