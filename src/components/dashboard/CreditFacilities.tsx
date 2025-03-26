
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CreditFacility {
  id: string;
  name: string;
  bank: string;
  limit: string;
  used: string;
  status: "Active" | "Pending" | "Inactive";
}

const CreditFacilities = () => {
  // Mock data - in a real app, this would come from your API
  const facilities: CreditFacility[] = [
    {
      id: "1",
      name: "Term Loan",
      bank: "HSBC",
      limit: "$1,000,000",
      used: "$500,000",
      status: "Active",
    },
    {
      id: "2",
      name: "Credit Line",
      bank: "Citi",
      limit: "$750,000",
      used: "$250,000",
      status: "Active",
    },
    {
      id: "3",
      name: "Overdraft Facility",
      bank: "Bank of America",
      limit: "$250,000",
      used: "$0",
      status: "Inactive",
    },
  ];

  const handleRowClick = (id: string) => {
    console.log(`Clicked on facility ${id}`);
    // Here you would navigate to the detail page
  };

  const handleManage = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    console.log(`Manage facility ${id}`);
    // Here you would open a dropdown or modal with management options
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Credit Facilities Overview</h2>
      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Facility Name</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facilities.map((facility) => (
              <TableRow 
                key={facility.id} 
                className="cursor-pointer"
                onClick={() => handleRowClick(facility.id)}
              >
                <TableCell className="font-medium">{facility.name}</TableCell>
                <TableCell>{facility.bank}</TableCell>
                <TableCell>{facility.limit}</TableCell>
                <TableCell>{facility.used}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    facility.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : facility.status === "Pending" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {facility.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => handleManage(e, facility.id)}
                    className="ml-auto"
                  >
                    Manage
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CreditFacilities;
