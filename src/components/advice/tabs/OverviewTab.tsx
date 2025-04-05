
import React from "react";
import OverviewCards from "../components/OverviewCards";
import QuickActions from "../components/QuickActions";

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <OverviewCards />
      <QuickActions />
    </div>
  );
};

export default OverviewTab;
