
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveDepositsTable from "./ActiveDepositsTable";

interface ActiveDeposit {
  id: string;
  bank: string;
  amount: number;
  currency: string;
  rate: number;
  startDate: string;
  maturityDate: string;
  term: string;
  interest: number;
}

interface TermDepositsCardProps {
  activeDeposits: ActiveDeposit[];
  depositView: string;
  onDepositViewChange: (value: string) => void;
}

const TermDepositsCard = ({ 
  activeDeposits, 
  depositView, 
  onDepositViewChange 
}: TermDepositsCardProps) => {
  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Your Term Deposits</CardTitle>
          
          <Tabs value={depositView} onValueChange={onDepositViewChange} className="h-9">
            <TabsList className="h-9">
              <TabsTrigger value="active" className="h-8 px-3">Active</TabsTrigger>
              <TabsTrigger value="maturing" className="h-8 px-3">Maturing Soon</TabsTrigger>
              <TabsTrigger value="completed" className="h-8 px-3">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ActiveDepositsTable deposits={activeDeposits} />
      </CardContent>
    </Card>
  );
};

export default TermDepositsCard;
