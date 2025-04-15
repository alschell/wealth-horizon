
export const defaultSections = [
  {
    id: "portfolioPerformance",
    name: "Portfolio Performance",
    description: "Summary of your investment performance",
    defaultEnabled: true
  },
  {
    id: "marketSnapshot",
    name: "Market Snapshot",
    description: "Current market data and indicators",
    defaultEnabled: true
  },
  {
    id: "recentActivity",
    name: "Recent Activity",
    description: "Latest transactions and account changes",
    defaultEnabled: true
  },
  {
    id: "notifications",
    name: "Notifications & Tasks",
    description: "Important alerts and pending actions",
    defaultEnabled: true
  },
  {
    id: "cashFlow",
    name: "Cash Flow Overview",
    description: "Summary of your cash flows",
    defaultEnabled: true
  },
  {
    id: "upcomingEvents",
    name: "Upcoming Events",
    description: "Scheduled meetings and important dates",
    defaultEnabled: false
  },
  {
    id: "recommendations",
    name: "Recommendations",
    description: "Personalized financial advice",
    defaultEnabled: false
  },
  {
    id: "quickAccess",
    name: "Quick Access",
    description: "Frequently used actions and tools",
    defaultEnabled: true
  }
];

export const getInitialSections = () => {
  const savedSections = localStorage.getItem("dashboardSections");
  
  if (savedSections) {
    return JSON.parse(savedSections);
  }
  
  // Create initial sections object from defaults
  const initialSections = defaultSections.reduce((acc, section) => {
    acc[section.id] = section.defaultEnabled;
    return acc;
  }, {} as Record<string, boolean>);
  
  return initialSections;
};

export const getInitialSectionsOrder = () => {
  const savedOrder = localStorage.getItem("dashboardSectionsOrder");
  
  if (savedOrder) {
    return JSON.parse(savedOrder);
  }
  
  // Create initial order from defaults
  return defaultSections.map(section => section.id);
};
