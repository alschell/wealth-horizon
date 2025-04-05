
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Wallet, ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCreditFacilitiesFlat } from "@/components/trading/data/creditFacilities";
import { useToast } from "@/hooks/use-toast";

const Borrow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFacility, setSelectedFacility] = useState(mockCreditFacilitiesFlat[0].id);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(mockCreditFacilitiesFlat[0].currency);
  const [purpose, setPurpose] = useState("investment");
  
  const facility = mockCreditFacilitiesFlat.find(f => f.id === selectedFacility);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Borrow request submitted",
      description: `Your request to borrow ${amount} ${currency} has been submitted for approval.`,
    });
    
    setTimeout(() => {
      navigate("/credit-facilities");
    }, 2000);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={Wallet}
          title="Borrow from Credit Facility"
          description="Access your available credit lines to fund investments or meet liquidity needs"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Facilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreditFacilitiesFlat.map((facility) => (
                  <div 
                    key={facility.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedFacility === facility.id ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedFacility(facility.id);
                      setCurrency(facility.currency);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{facility.name}</h3>
                        <p className="text-sm text-gray-500">Type: {facility.type}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Available</p>
                        <p className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.available)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Interest</p>
                        <p className="font-medium">{facility.interestRate || "4.5"}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Borrow Request</CardTitle>
            </CardHeader>
            <CardContent>
              {facility && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="flex gap-2">
                      <Input
                        id="amount"
                        placeholder="Enter amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="w-28">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="CHF">CHF</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Select value={purpose} onValueChange={setPurpose}>
                      <SelectTrigger id="purpose">
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="liquidity">Liquidity Management</SelectItem>
                        <SelectItem value="acquisition">Acquisition</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">Borrow Summary</p>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Facility</span>
                        <span className="text-sm font-medium">{facility.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Available</span>
                        <span className="text-sm font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.available)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Interest Rate</span>
                        <span className="text-sm font-medium">{facility.interestRate || "4.5"}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full">
                      Submit Borrow Request
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Borrow;
