
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the Family Office Platform</h1>
        <p className="text-xl text-gray-600 mb-10 text-center">
          Manage your investments, trading, and advisory services in one place.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Trading</h2>
            <p className="text-gray-600 mb-6">
              Execute trades across multiple asset classes with our advanced trading platform.
            </p>
            <Link to="/trading">
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                Go to Trading
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Investment Advice</h2>
            <p className="text-gray-600 mb-6">
              Get professional advice on your investments from top financial institutions.
            </p>
            <Link to="/advice">
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                Get Investment Advice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold mb-4">Market Data</h2>
            <p className="text-gray-600 mb-6">
              Track markets, indices, and news for your investments in real-time.
            </p>
            <Link to="/market-data">
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                View Market Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
