
import React, { useState } from "react";
import { Check, AlertTriangle, TrendingUp, Brain, X, ThumbsUp, ThumbsDown, MessagesSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type RecommendationType = {
  id: string;
  title: string;
  description: string;
  impact: string;
  type: string;
  category?: 'allocation' | 'risk' | 'opportunity' | 'tax' | 'cash';
  priority?: 'high' | 'medium' | 'low';
  aiAssisted?: boolean;
  isDismissed?: boolean;
  isAutomated?: boolean;
};

type RecommendationsTabContentProps = {
  recommendations: {
    title: string;
    description: string;
    impact: string;
    type: string;
  }[];
};

const RecommendationsTabContent = ({
  recommendations,
}: RecommendationsTabContentProps) => {
  // Convert incoming recommendations to enhanced format
  const initialRecommendations: RecommendationType[] = recommendations.map((rec, index) => ({
    id: `rec-${index}`,
    ...rec,
    category: ['allocation', 'risk', 'opportunity', 'tax', 'cash'][index % 5] as any,
    priority: index % 3 === 0 ? 'high' : index % 3 === 1 ? 'medium' : 'low',
    aiAssisted: index % 2 === 0,
    isDismissed: false,
    isAutomated: false
  }));

  const [enhancedRecommendations, setEnhancedRecommendations] = useState<RecommendationType[]>(initialRecommendations);
  const [activeTab, setActiveTab] = useState('pending');
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<RecommendationType | null>(null);
  const [autoSettingsOpen, setAutoSettingsOpen] = useState(false);

  const pendingRecommendations = enhancedRecommendations.filter(r => !r.isDismissed);
  const dismissedRecommendations = enhancedRecommendations.filter(r => r.isDismissed);
  const automatedRecommendations = enhancedRecommendations.filter(r => r.isAutomated);

  const handleDismiss = (id: string) => {
    setEnhancedRecommendations(
      enhancedRecommendations.map(rec => 
        rec.id === id ? { ...rec, isDismissed: true } : rec
      )
    );
    toast.success("Recommendation dismissed");
  };

  const handleRestore = (id: string) => {
    setEnhancedRecommendations(
      enhancedRecommendations.map(rec => 
        rec.id === id ? { ...rec, isDismissed: false } : rec
      )
    );
    toast.success("Recommendation restored");
  };

  const handleImplement = (recommendation: RecommendationType) => {
    toast.success(`Implementing: ${recommendation.title}`);
    // In a real app, this would trigger the actual implementation
    setTimeout(() => {
      setEnhancedRecommendations(
        enhancedRecommendations.map(rec => 
          rec.id === recommendation.id ? { ...rec, isDismissed: true } : rec
        )
      );
    }, 1500);
  };

  const handleAiChat = (recommendation: RecommendationType) => {
    setSelectedRecommendation(recommendation);
    setAiChatOpen(true);
  };

  const handleToggleAutomation = (id: string, automated: boolean) => {
    setEnhancedRecommendations(
      enhancedRecommendations.map(rec => 
        rec.id === id ? { ...rec, isAutomated: automated } : rec
      )
    );
    toast.success(automated 
      ? "Recommendation set to autopilot" 
      : "Recommendation removed from autopilot"
    );
  };

  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case 'risk': return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'opportunity': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'allocation': return <PieChart className="h-4 w-4 text-blue-500" />;
      case 'tax': return <Calculator className="h-4 w-4 text-purple-500" />;
      case 'cash': return <DollarSign className="h-4 w-4 text-green-500" />;
      default: return <Check className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch(priority) {
      case 'high': return 'bg-red-50 text-red-600 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'low': return 'bg-green-50 text-green-600 border-green-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">Risk Score</p>
                <p className="text-2xl font-bold">Medium</p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-amber-500 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" /> Review recommended
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">Compliance</p>
                <p className="text-2xl font-bold">Compliant</p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-green-600 text-xs">
              <Check className="h-3 w-3 mr-1" /> No issues
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">Potential Gain</p>
                <p className="text-2xl font-bold">+$124K</p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-emerald-100">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-emerald-600 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" /> From recommendations
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600 mb-1">Excess Cash</p>
                <p className="text-2xl font-bold">$280K</p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100">
                <DollarSign className="h-4 w-4 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-amber-500 text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" /> Consider investing
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recommendations Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Next Best Actions</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setAutoSettingsOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Autopilot Settings
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="pending" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({pendingRecommendations.length})
              </TabsTrigger>
              <TabsTrigger value="automated">
                Autopilot ({automatedRecommendations.length})
              </TabsTrigger>
              <TabsTrigger value="dismissed">
                Dismissed ({dismissedRecommendations.length})
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingRecommendations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No pending recommendations</p>
              </div>
            ) : (
              pendingRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="overflow-hidden">
                  <div className={`h-1 ${recommendation.priority === 'high' ? 'bg-red-500' : recommendation.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${recommendation.category === 'risk' ? 'bg-amber-100' : recommendation.category === 'opportunity' ? 'bg-emerald-100' : recommendation.category === 'allocation' ? 'bg-blue-100' : recommendation.category === 'tax' ? 'bg-purple-100' : 'bg-green-100'}`}>
                          {getCategoryIcon(recommendation.category)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-1">
                          <Badge variant="outline" className={getPriorityColor(recommendation.priority)}>
                            {recommendation.priority?.toUpperCase()}
                          </Badge>
                          
                          {recommendation.aiAssisted && (
                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                              <Brain className="h-3 w-3 mr-1" /> AI Suggested
                            </Badge>
                          )}
                          
                          <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                            {recommendation.category?.[0].toUpperCase()}{recommendation.category?.slice(1)}
                          </Badge>
                        </div>
                        
                        <h4 className="text-base font-medium">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-4">
                          <Button variant="default" size="sm" onClick={() => handleImplement(recommendation)}>
                            Implement
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAiChat(recommendation)}>
                            <MessagesSquare className="h-4 w-4 mr-1" /> Discuss with AI
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDismiss(recommendation.id)}>
                            <X className="h-4 w-4 mr-1" /> Dismiss
                          </Button>
                          <div className="ml-auto flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Autopilot</span>
                            <Switch
                              checked={recommendation.isAutomated}
                              onCheckedChange={(checked) => handleToggleAutomation(recommendation.id, checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="automated" className="space-y-4">
            {automatedRecommendations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No automated recommendations</p>
              </div>
            ) : (
              automatedRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${recommendation.category === 'risk' ? 'bg-amber-100' : recommendation.category === 'opportunity' ? 'bg-emerald-100' : recommendation.category === 'allocation' ? 'bg-blue-100' : recommendation.category === 'tax' ? 'bg-purple-100' : 'bg-green-100'}`}>
                          {getCategoryIcon(recommendation.category)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-base font-medium">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            Autopilot Enabled
                          </Badge>
                          <div className="ml-auto">
                            <Button variant="ghost" size="sm" onClick={() => handleToggleAutomation(recommendation.id, false)}>
                              Disable Autopilot
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="dismissed" className="space-y-4">
            {dismissedRecommendations.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No dismissed recommendations</p>
              </div>
            ) : (
              dismissedRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="opacity-70">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getCategoryIcon(recommendation.category)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-base font-medium">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <Button variant="outline" size="sm" onClick={() => handleRestore(recommendation.id)}>
                            Restore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chat Dialog */}
      <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" /> 
              AI Assistant
            </DialogTitle>
            <DialogDescription>
              Discussing: {selectedRecommendation?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  I've analyzed this recommendation for {selectedRecommendation?.title}. Would you like me to explain why this is recommended and the potential impact?
                </p>
              </div>
              
              <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%] ml-auto">
                <p className="text-sm">Yes, please explain why this is important and what will happen if I implement it.</p>
              </div>
              
              <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">
                  This recommendation {selectedRecommendation?.description}. It was suggested based on market analysis and your portfolio composition.
                </p>
                <p className="text-sm mt-2">
                  If implemented, it could {selectedRecommendation?.impact}. This represents a significant opportunity for portfolio optimization.
                </p>
                <p className="text-sm mt-2">
                  Would you like me to go ahead and implement this for you?
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex border rounded-md p-2">
            <input 
              className="flex-1 border-0 focus:outline-none text-sm" 
              placeholder="Ask a question about this recommendation..." 
            />
            <Button size="sm" className="ml-2">Send</Button>
          </div>
          
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setAiChatOpen(false)}>
                <ThumbsDown className="h-4 w-4 mr-1" /> Not Helpful
              </Button>
              <Button variant="outline" size="sm" onClick={() => setAiChatOpen(false)}>
                <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
              </Button>
            </div>
            <Button onClick={() => {
              handleImplement(selectedRecommendation!);
              setAiChatOpen(false);
            }}>
              Implement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Autopilot Settings Dialog */}
      <Dialog open={autoSettingsOpen} onOpenChange={setAutoSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autopilot Settings</DialogTitle>
            <DialogDescription>
              Configure which types of recommendations should be automatically implemented.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                  <h4 className="text-sm font-medium">Cash Management</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically optimize cash positions
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                  <h4 className="text-sm font-medium">Risk Reduction</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically reduce portfolio risk
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <PieChart className="h-4 w-4 text-blue-500 mr-2" />
                  <h4 className="text-sm font-medium">Rebalancing</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically rebalance to target allocations
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                  <h4 className="text-sm font-medium">Opportunities</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically act on investment opportunities
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center">
                  <Calculator className="h-4 w-4 text-purple-500 mr-2" />
                  <h4 className="text-sm font-medium">Tax Optimization</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically optimize for tax efficiency
                </p>
              </div>
              <Switch />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAutoSettingsOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("Autopilot settings saved");
              setAutoSettingsOpen(false);
            }}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Add the missing icons
const PieChart = (props: any) => <TrendingUp {...props} />;
const Calculator = (props: any) => <TrendingUp {...props} />;
const DollarSign = (props: any) => <TrendingUp {...props} />;

export default RecommendationsTabContent;
