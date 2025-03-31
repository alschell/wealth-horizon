
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { AlertCircle, DollarSign, Clock, BarChart2 } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";

interface TradingOrderTypeProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (timeInForce: string) => void;
  orderType: string;
}

const TradingOrderType: React.FC<TradingOrderTypeProps> = ({
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce,
  orderType
}) => {
  const [gtdDate, setGtdDate] = useState<Date | undefined>(undefined);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Order Execution Type</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'market' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('market')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <BarChart2 className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-center mb-2">Market</h3>
              <p className="text-sm text-gray-600 text-center">
                Execute immediately at current market price.
              </p>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'limit' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('limit')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-center mb-2">Limit</h3>
              <p className="text-sm text-gray-600 text-center">
                Execute at specified price or better.
              </p>
            </div>
          </Card>
          
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'stop' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('stop')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-medium text-center mb-2">Stop</h3>
              <p className="text-sm text-gray-600 text-center">
                Becomes market order when price reaches stop price.
              </p>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'stop_limit' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('stop_limit')}
          >
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-center mb-2">Stop Limit</h3>
              <p className="text-sm text-gray-600 text-center">
                Becomes limit order when price reaches stop price.
              </p>
            </div>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Time in Force</h3>
        <div className="space-y-4">
          <Select value={timeInForce} onValueChange={(value) => {
            setTimeInForce(value);
            if (value !== 'gtd') {
              setGtdDate(undefined);
            }
          }}>
            <SelectTrigger className="w-full h-11 border border-gray-300 focus:border-black focus:ring-2 focus:ring-black rounded-md">
              <SelectValue placeholder="Select time in force" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="day">Day Order</SelectItem>
                <SelectItem value="gtc">Good Till Canceled (GTC)</SelectItem>
                <SelectItem value="gtd">Good Till Date (GTD)</SelectItem>
                <SelectItem value="ioc">Immediate or Cancel (IOC)</SelectItem>
                <SelectItem value="fok">Fill or Kill (FOK)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {timeInForce === "gtd" && (
            <div className="mt-4">
              <DatePicker
                value={gtdDate}
                onChange={setGtdDate}
                label="Expiration Date"
                placeholder="Select expiration date"
              />
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            {timeInForce === "day" && "Order valid until end of current trading day."}
            {timeInForce === "gtc" && "Order valid until executed or canceled."}
            {timeInForce === "gtd" && "Order valid until specified date."}
            {timeInForce === "ioc" && "Fill whatever portion possible immediately, cancel rest."}
            {timeInForce === "fok" && "Must be filled immediately and completely or canceled."}
          </p>
        </div>
      </div>

      {orderType === "sell_short" && (
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Short Selling Requirements</h4>
              <p className="text-sm text-amber-700 mt-1">
                Short selling involves borrowing securities to sell in the market. Ensure your account has margin capabilities and there is borrowable inventory for the selected instrument. Additional fees and margin requirements apply.
              </p>
            </div>
          </div>
        </div>
      )}

      {orderType === "exchange" && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">Exchange Order Information</h4>
              <p className="text-sm text-blue-700 mt-1">
                Exchange orders allow you to swap one security for another in a single transaction. You'll need to specify both the security to sell and the security to buy. Tax implications will be calculated as if you sold and then purchased separately.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingOrderType;
