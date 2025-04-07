
import React from "react";
import { Header, FeatureOverview, PlatformModules, VisualizationArea, ActionButton } from "./platform-overview";

const PlatformOverviewAnimation = () => {
  return (
    <div className="relative w-full h-full bg-white overflow-hidden rounded-lg">
      {/* Header with logo */}
      <Header />
      
      {/* Main Content */}
      <div className="p-6 h-[calc(100%-60px)]">
        {/* Platform Feature Overview */}
        <FeatureOverview />
        
        {/* Platform Modules Grid */}
        <PlatformModules />
        
        {/* Visualization Area with Charts */}
        <VisualizationArea />
        
        {/* Action Button */}
        <ActionButton />
      </div>
    </div>
  );
};

export default PlatformOverviewAnimation;
