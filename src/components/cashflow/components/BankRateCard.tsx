
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NewTermDepositForm from "./NewTermDepositForm";

interface BankRateCardProps {
  rate: {
    id: string;
    bank: string;
    currency: string;
    term: string;
    rate: number;
  };
  isTopRate: boolean;
}

const BankRateCard = ({ rate, isTopRate }: BankRateCardProps) => {
  return (
    <Card className={`overflow-hidden ${isTopRate ? 'border-green-200 bg-green-50' : ''}`}>
      <CardHeader className="p-4 pb-2 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-gray-500" />
            <CardTitle className="text-base">{rate.bank}</CardTitle>
          </div>
          {isTopRate && (
            <Badge className="bg-green-600">Best Rate</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Currency</p>
            <p className="font-medium">{rate.currency}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Term</p>
            <p className="font-medium">{rate.term}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Rate</p>
            <p className="font-bold text-green-600">{rate.rate}%</p>
          </div>
        </div>
        
        {isTopRate && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4">
                <Coins className="mr-2 h-4 w-4" />
                Create Deposit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Term Deposit</DialogTitle>
              </DialogHeader>
              <NewTermDepositForm bestRate={rate} />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default BankRateCard;
