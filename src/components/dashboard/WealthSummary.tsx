
import React from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  onClick: () => void;
}

const SummaryCard = ({ title, value, change, icon, onClick }: SummaryCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <Card 
      className="hover-lift cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
          </div>
          <div className="p-3 rounded-full bg-primary/10">{icon}</div>
        </div>
        
        <div className="flex items-center mt-4">
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
          <span className="text-sm text-gray-500 ml-2">vs last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

const WealthSummary = () => {
  // Mock data - in a real app, this would come from your API
  const summaryData = [
    {
      title: "Total Assets",
      value: "$2,560,500",
      change: 4.2,
      icon: <DollarSign className="h-6 w-6 text-primary" />
    },
    {
      title: "Total Liabilities",
      value: "$350,200",
      change: -2.1,
      icon: <DollarSign className="h-6 w-6 text-primary" />
    },
    {
      title: "Net Worth",
      value: "$2,210,300",
      change: 5.4,
      icon: <DollarSign className="h-6 w-6 text-primary" />
    }
  ];

  const handleCardClick = (title: string) => {
    console.log(`Clicked on ${title}`);
    // Here you would implement the modal to show the breakdown
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Wealth Summary</h2>
        <select className="h-9 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm">
          <option value="all">All Banks</option>
          <option value="hsbc">HSBC</option>
          <option value="citi">Citi</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryData.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
            onClick={() => handleCardClick(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default WealthSummary;
