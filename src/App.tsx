
import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </h1>
        
        <p className="text-gray-600 mb-4">
          Welcome to Wealth Horizon, your comprehensive wealth management platform. The application is currently being built.
        </p>
        
        <ul className="list-disc pl-5 mb-4 text-gray-600">
          <li>Portfolio Analytics</li>
          <li>Wealth Planning</li>
          <li>Financial Reporting</li>
          <li>Tax Optimization</li>
          <li>Estate Planning</li>
        </ul>
        
        <div className="flex justify-end">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
