
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, MessageCircle, Settings, Trash2, TrendingUp, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  impactValue: number;
  urgency: "high" | "medium" | "low";
  action: string;
};

type RecommendationsTabContentProps = {
  recommendations: Recommendation[];
};

const RecommendationsTabContent = ({ recommendations }: RecommendationsTabContentProps) => {
  const [dismissedActions, setDismissedActions] = useState<string[]>([]);
  const [autopilotEnabled, setAutopilotEnabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  const handleDismiss = (id: string) => {
    setDismissedActions([...dismissedActions, id]);
  };

  const handleRestore = (id: string) => {
    setDismissedActions(dismissedActions.filter(actionId => actionId !== id));
  };

  const openDialog = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setIsDialogOpen(true);
  };

  const filteredRecommendations = recommendations.filter(
    rec => !dismissedActions.includes(rec.id)
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-semibold">Next Best Actions</h2>
          <p className="text-muted-foreground">Personalized recommendations to optimize your portfolio</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="autopilot" 
              checked={autopilotEnabled}
              onCheckedChange={setAutopilotEnabled}
            />
            <label htmlFor="autopilot" className="text-sm font-medium">
              Autopilot
            </label>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRecommendations.length === 0 ? (
          <Card>
            <CardContent className="py-8 flex flex-col items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">All caught up!</h3>
              <p className="text-muted-foreground text-center max-w-md">
                You've addressed all your recommendations. We'll notify you when new opportunities are identified.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredRecommendations.map((recommendation) => (
            <Card key={recommendation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                    <CardDescription className="mt-1">{recommendation.description}</CardDescription>
                  </div>
                  <Badge className={`${getUrgencyColor(recommendation.urgency)} capitalize`}>
                    {recommendation.urgency} priority
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center">
                    <div className="mr-6">
                      <span className="text-muted-foreground block">Category</span>
                      <span className="font-medium">{recommendation.category}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Potential Impact</span>
                      <span className={`font-medium ${recommendation.impactValue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {recommendation.impact}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => openDialog(recommendation)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Talk to AI
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 pt-3">
                <div className="flex justify-between w-full">
                  <Button variant="ghost" size="sm" onClick={() => handleDismiss(recommendation.id)}>
                    <XCircle className="h-4 w-4 mr-1" />
                    Dismiss
                  </Button>
                  <Button className="px-4" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    {recommendation.action}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {dismissedActions.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Dismissed Actions</h3>
          <div className="grid gap-3">
            {recommendations
              .filter(rec => dismissedActions.includes(rec.id))
              .map((recommendation) => (
                <div key={recommendation.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center">
                    <Trash2 className="h-4 w-4 text-muted-foreground mr-3" />
                    <div>
                      <h4 className="text-sm font-medium">{recommendation.title}</h4>
                      <p className="text-xs text-muted-foreground">{recommendation.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleRestore(recommendation.id)}>
                    Restore
                  </Button>
                </div>
              ))}
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRecommendation?.title}</DialogTitle>
            <DialogDescription>
              Discuss this recommendation with your AI assistant
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-sm">
                  {selectedRecommendation?.description}
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">You</p>
                <p className="text-sm">Why are you recommending this action?</p>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">AI Assistant</p>
                <p className="text-sm">
                  Based on your portfolio analysis, I'm recommending this action because it aligns with your investment goals and risk tolerance. This adjustment should help optimize your returns while maintaining your preferred asset allocation strategy.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">You</p>
                <p className="text-sm">What are the potential risks?</p>
              </div>
              
              <div className="bg-secondary/10 rounded-lg p-4">
                <p className="text-sm font-medium mb-1">AI Assistant</p>
                <p className="text-sm">
                  The main risks include potential market volatility in the short term and opportunity costs if you choose alternative investments. However, based on historical data and your investment timeframe, the benefits outweigh these risks.
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Ask more questions..." 
                  className="flex-1 bg-transparent outline-none text-sm"
                />
                <Button size="sm" className="ml-2">Send</Button>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex items-center justify-between sm:justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                handleDismiss(selectedRecommendation?.id || "");
                setIsDialogOpen(false);
              }}>
                Dismiss
              </Button>
              <Button>
                Take Action
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendationsTabContent;
