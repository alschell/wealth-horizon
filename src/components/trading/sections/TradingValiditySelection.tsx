
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Clock, AlertCircle, CalendarClock, TrendingUp, Shield, DollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TradingValiditySelectionProps {
  timeInForce: string;
  setTimeInForce: (value: string) => void;
  orderExecutionType: string;
  leverage: number;
  setLeverage: (value: number) => void;
  [key: string]: any;
}

const TradingValiditySelection: React.FC<TradingValiditySelectionProps> = ({
  timeInForce,
  setTimeInForce,
  orderExecutionType,
  leverage,
  setLeverage,
  orderType
}) => {
  const showTimeInForce = orderExecutionType !== "market";
  const defaultTab = showTimeInForce ? "validity" : "leverage";

  return (
    <div className="space-y-8">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {showTimeInForce && (
            <TabsTrigger value="validity">Order Validity</TabsTrigger>
          )}
          <TabsTrigger value="leverage" className={!showTimeInForce ? "col-span-2" : ""}>
            Leverage Options
          </TabsTrigger>
        </TabsList>
        
        {showTimeInForce && (
          <TabsContent value="validity" className="mt-4">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select how long your {orderExecutionType} order should remain active.
              </p>
              
              <RadioGroup 
                value={timeInForce} 
                onValueChange={setTimeInForce}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
              >
                <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'day' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="day" id="day" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="day" className="cursor-pointer font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-600" />
                        Day Order
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Order is valid until the end of the current trading day.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'gtc' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="gtc" id="gtc" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="gtc" className="cursor-pointer font-medium flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-indigo-600" />
                        Good Till Canceled (GTC)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Order remains active until explicitly canceled.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'fok' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="fok" id="fok" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="fok" className="cursor-pointer font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                        Fill or Kill (FOK)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Order must be filled immediately in its entirety or canceled.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'ioc' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="ioc" id="ioc" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="ioc" className="cursor-pointer font-medium flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                        Immediate or Cancel (IOC)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Fills all or part of the order immediately, then cancels any unfilled portion.
                      </p>
                    </div>
                  </div>
                </Card>
              </RadioGroup>
            </div>
          </TabsContent>
        )}
        
        <TabsContent value="leverage" className="mt-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {orderType === "buy" 
                  ? "Apply leverage to increase your buying power and potential returns." 
                  : "Apply leverage for short positions to increase potential returns."}
                <span className="text-amber-600 font-medium"> Higher leverage increases both potential returns and risks.</span>
              </p>

              <RadioGroup 
                value={leverage.toString()} 
                onValueChange={(value) => setLeverage(Number(value))}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4"
              >
                <Card className={`p-4 cursor-pointer transition-all ${leverage === 1 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="1" id="leverage-1" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="leverage-1" className="cursor-pointer font-medium flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-green-600" />
                        No Leverage (1x)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Standard trading with your available capital.
                      </p>
                      <Badge variant="secondary" className="mt-2">Conservative</Badge>
                    </div>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer transition-all ${leverage === 2 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="2" id="leverage-2" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="leverage-2" className="cursor-pointer font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                        Moderate (2x)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Double your buying power with moderate risk.
                      </p>
                      <Badge variant="outline" className="mt-2">Standard</Badge>
                    </div>
                  </div>
                </Card>

                <Card className={`p-4 cursor-pointer transition-all ${leverage === 5 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-start">
                    <RadioGroupItem value="5" id="leverage-5" className="mr-2 mt-1" />
                    <div>
                      <Label htmlFor="leverage-5" className="cursor-pointer font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                        Advanced (5x)
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Quintuple your position size with higher risk.
                      </p>
                      <Badge variant="destructive" className="mt-2">High Risk</Badge>
                    </div>
                  </div>
                </Card>
              </RadioGroup>
            </div>

            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex justify-between">
                <h3 className="text-md font-medium">Custom Leverage</h3>
                <Badge variant={leverage > 5 ? "destructive" : leverage > 2 ? "outline" : "secondary"}>
                  {leverage}x
                </Badge>
              </div>

              <div className="space-y-3">
                <Slider 
                  value={[leverage]} 
                  min={1} 
                  max={10} 
                  step={0.5} 
                  onValueChange={([value]) => setLeverage(value)}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1x (No Leverage)</span>
                  <span>5x</span>
                  <span>10x (Max)</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-4">
                <div className="flex">
                  <DollarSign className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800">Margin Requirement</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Trading with {leverage}x leverage requires a minimum margin of {Math.round(100/leverage)}% of the position value.
                      Higher leverage increases the risk of liquidation if the market moves against your position.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingValiditySelection;
