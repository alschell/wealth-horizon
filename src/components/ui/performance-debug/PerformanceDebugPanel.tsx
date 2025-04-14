
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePerformanceMonitor } from '@/utils/hooks/usePerformanceMonitor';
import { Button } from '@/components/ui/button';
import { Activity, RefreshCw, XCircle } from 'lucide-react';
import { clearRenderMetrics, clearAnimationMetrics } from '@/utils/performance';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Performance debug panel for development use
 * Displays render and animation performance metrics
 */
const PerformanceDebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const metrics = usePerformanceMonitor();
  
  // Skip rendering in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  
  const handleClearMetrics = () => {
    clearRenderMetrics();
    clearAnimationMetrics();
  };
  
  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="fixed bottom-4 right-4 z-50 w-10 h-10 p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Activity size={16} className={metrics.slowComponents.length > 0 ? "text-red-500" : ""} />
      </Button>
      
      {isOpen && (
        <Card className="fixed bottom-16 right-4 z-50 w-[360px] shadow-lg">
          <CardHeader className="py-2 px-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Performance Monitor</CardTitle>
            <div className="flex">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleClearMetrics}>
                <RefreshCw size={14} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <XCircle size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="render">
              <TabsList className="w-full">
                <TabsTrigger value="render" className="flex-1">
                  Render
                  {metrics.slowComponents.length > 0 && (
                    <span className="ml-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                      {metrics.slowComponents.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="animation" className="flex-1">Animation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="render">
                <ScrollArea className="h-[300px]">
                  <div className="p-4">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="text-left font-medium">Component</th>
                          <th className="text-right">Count</th>
                          <th className="text-right">Last (ms)</th>
                          <th className="text-right">Avg (ms)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(metrics.renderMetrics)
                          .sort((a, b) => b.lastRenderTime - a.lastRenderTime)
                          .map((metric) => (
                            <tr key={metric.component}>
                              <td 
                                className={`py-1 ${metric.lastRenderTime > 16 ? "text-red-500 font-medium" : ""}`}
                              >
                                {metric.component}
                              </td>
                              <td className="text-right">{metric.renderCount}</td>
                              <td 
                                className={`text-right ${metric.lastRenderTime > 16 ? "text-red-500 font-medium" : ""}`}
                              >
                                {metric.lastRenderTime.toFixed(1)}
                              </td>
                              <td className="text-right">{metric.averageRenderTime.toFixed(1)}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    
                    {Object.keys(metrics.renderMetrics).length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No render metrics collected yet
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="animation">
                <ScrollArea className="h-[300px]">
                  <div className="p-4">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="text-left font-medium">Component</th>
                          <th className="text-right">Duration (ms)</th>
                          <th className="text-right">Dropped Frames</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metrics.animationMetrics
                          .filter(metric => metric.duration !== undefined)
                          .sort((a, b) => (b.duration || 0) - (a.duration || 0))
                          .map((metric, index) => (
                            <tr key={`${metric.component}-${index}`}>
                              <td 
                                className={`py-1 ${(metric.dropped || 0) > 3 ? "text-red-500 font-medium" : ""}`}
                              >
                                {metric.component}
                              </td>
                              <td className="text-right">{metric.duration?.toFixed(1) || '—'}</td>
                              <td 
                                className={`text-right ${(metric.dropped || 0) > 3 ? "text-red-500 font-medium" : ""}`}
                              >
                                {metric.dropped || '—'}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    
                    {metrics.animationMetrics.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No animation metrics collected yet
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PerformanceDebugPanel;
