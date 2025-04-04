
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { BadgePercent, Clock, Calendar as CalendarIcon } from "lucide-react";

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

interface ActiveDepositsTableProps {
  deposits: ActiveDeposit[];
}

const ActiveDepositsTable = ({ deposits }: ActiveDepositsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Bank</TableHead>
          <TableHead className="font-medium">Amount</TableHead>
          <TableHead className="font-medium">Rate</TableHead>
          <TableHead className="font-medium">Term</TableHead>
          <TableHead className="font-medium">Start Date</TableHead>
          <TableHead className="font-medium">Maturity Date</TableHead>
          <TableHead className="font-medium text-right">Interest Earned</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deposits.map(deposit => (
          <TableRow key={deposit.id}>
            <TableCell className="font-medium">{deposit.bank}</TableCell>
            <TableCell>{formatCurrency(deposit.amount, deposit.currency)}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <BadgePercent className="h-4 w-4 mr-1 text-green-600" />
                {deposit.rate}%
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 opacity-70" />
                {deposit.term}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 opacity-70" />
                {new Date(deposit.startDate).toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell>{new Date(deposit.maturityDate).toLocaleDateString()}</TableCell>
            <TableCell className="text-right font-medium text-green-600">
              {formatCurrency(deposit.interest, deposit.currency)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActiveDepositsTable;
