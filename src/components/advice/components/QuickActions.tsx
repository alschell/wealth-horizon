
import React from "react";
import { Plus, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickActions: React.FC = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mt-6 mb-4">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:bg-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Advisory Mandate
            </CardTitle>
            <CardDescription>
              Setup a new advisory relationship with a bank
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="text-sm">
              Start <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Compare Advisors
            </CardTitle>
            <CardDescription>
              Benchmark performances across all mandates
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="text-sm">
              View <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-accent/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Review Latest Advice
            </CardTitle>
            <CardDescription>
              See the latest investment recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="text-sm">
              Review <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default QuickActions;
