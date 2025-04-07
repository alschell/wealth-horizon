
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import { QuickAccessGrid } from "@/components/dashboard/quick-access";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import MarketSnapshot from "@/components/dashboard/MarketSnapshot";
import RecentActivity from "@/components/dashboard/RecentActivity";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import KeyMetricsGrid from "@/components/dashboard/performance/KeyMetricsGrid";
import { LayoutDashboard, Sliders, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { newsData } from "@/components/dashboard/performance/PerformanceData";
import TopAssets from "@/components/dashboard/performance/TopAssets";
import RecentNewsList from "@/components/dashboard/performance/RecentNewsList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Default sections for the dashboard
const defaultSections = [
  { id: "keyMetrics", name: "Key Metrics", description: "Important financial metrics and indicators" },
  { id: "performanceOverview", name: "Performance Overview", description: "Charts and graphs showing your portfolio performance" },
  { id: "quickAccess", name: "Quick Access", description: "Shortcuts to frequently used features" },
  { id: "topAssets", name: "Top Assets", description: "Your highest value assets and their performance" },
  { id: "recentNews", name: "Recent News", description: "Latest financial news and updates" },
  { id: "notifications", name: "Notifications", description: "Important alerts and notifications" },
  { id: "marketSnapshot", name: "Market Snapshot", description: "Current market conditions and trends" },
  { id: "recentActivity", name: "Recent Activity", description: "Recent transactions and account activity" },
];

const Dashboard = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [dashboardSections, setDashboardSections] = useState({
    keyMetrics: true,
    performanceOverview: true,
    quickAccess: true,
    topAssets: true,
    recentNews: true,
    notifications: true,
    marketSnapshot: true,
    recentActivity: true,
  });
  const [sectionsOrder, setSectionsOrder] = useState<string[]>([]);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSections = localStorage.getItem("dashboardSections");
    const savedOrder = localStorage.getItem("dashboardSectionsOrder");
    
    if (savedSections) {
      setDashboardSections(JSON.parse(savedSections));
    }
    
    if (savedOrder) {
      setSectionsOrder(JSON.parse(savedOrder));
    } else {
      // Default order is all sections in their original order
      setSectionsOrder(defaultSections.map(section => section.id));
    }
  }, []);

  const toggleSection = (section: string) => {
    setDashboardSections({
      ...dashboardSections,
      [section]: !dashboardSections[section],
    });
  };

  const handleCustomizeSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem("dashboardSections", JSON.stringify(dashboardSections));
    localStorage.setItem("dashboardSectionsOrder", JSON.stringify(sectionsOrder));
    setIsCustomizing(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sectionsOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSectionsOrder(items);
  };

  // Get the ordered and filtered sections
  const orderedVisibleSections = sectionsOrder
    .filter(id => dashboardSections[id as keyof typeof dashboardSections]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard header */}
        <div className="flex justify-between items-center">
          <PageHeaderCard
            icon={LayoutDashboard}
            title="Dashboard"
            description="Your complete financial overview at a glance"
            iconColor="text-gray-700"
            iconBgColor="bg-gray-100"
          />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsCustomizing(true)}
            className="h-8 w-8 p-0"
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>

        {/* Welcome header */}
        <WelcomeHeader />
        
        {/* Render sections in the correct order */}
        {orderedVisibleSections.includes("keyMetrics") && <KeyMetricsGrid />}
        {orderedVisibleSections.includes("performanceOverview") && <PerformanceOverview />}
        {orderedVisibleSections.includes("quickAccess") && <QuickAccessGrid />}

        {/* Top Assets, Recent News, and Notifications in separate cards with same height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Assets card */}
          {orderedVisibleSections.includes("topAssets") && (
            <Card className="shadow-sm h-[350px] flex flex-col">
              <CardHeader className="pb-0">
                <TopAssets />
              </CardHeader>
            </Card>
          )}
          
          {/* Recent News card */}
          {orderedVisibleSections.includes("recentNews") && (
            <Card className="shadow-sm h-[350px] flex flex-col">
              <CardHeader className="pb-0">
                <RecentNewsList newsData={newsData} />
              </CardHeader>
            </Card>
          )}

          {/* Notifications container */}
          {orderedVisibleSections.includes("notifications") && <NotificationsFeed />}
        </div>

        {/* Key summary cards - Market Snapshot and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {orderedVisibleSections.includes("marketSnapshot") && (
            <div className="lg:col-span-2">
              {/* Market overview card */}
              <Card className="shadow-sm h-[350px] flex flex-col">
                <MarketSnapshot />
              </Card>
            </div>
          )}
          
          {orderedVisibleSections.includes("recentActivity") && (
            <div>
              {/* Recent activities card */}
              <Card className="shadow-sm h-[350px] flex flex-col">
                <RecentActivity />
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Customization Dialog */}
      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Dashboard</DialogTitle>
            <DialogDescription>
              Select which sections to display on your dashboard and drag to reorder them.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {/* Section for enabling/disabling sections */}
              <div>
                <h3 className="text-sm font-medium mb-3">Available Sections</h3>
                <div className="space-y-4">
                  {defaultSections.map((section) => (
                    <div key={section.id} className="flex items-start space-x-3">
                      <Checkbox 
                        id={`section-${section.id}`}
                        checked={dashboardSections[section.id as keyof typeof dashboardSections]}
                        onCheckedChange={() => toggleSection(section.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`section-${section.id}`}
                          className="text-sm font-medium leading-none"
                        >
                          {section.name}
                        </label>
                        <p className="text-xs text-muted-foreground">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section for reordering visible sections */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Order of Display</h3>
                <p className="text-xs text-muted-foreground mb-2">Drag to reorder sections</p>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="dashboard-sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {sectionsOrder
                          .filter(id => dashboardSections[id as keyof typeof dashboardSections])
                          .map((sectionId, index) => {
                            const section = defaultSections.find(s => s.id === sectionId);
                            if (!section) return null;
                            
                            return (
                              <Draggable key={sectionId} draggableId={sectionId} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex items-center p-2 border rounded bg-white"
                                  >
                                    <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                    <span className="text-sm">{section.name}</span>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizing(false)}>Cancel</Button>
            <Button onClick={handleCustomizeSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Dashboard;
