
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Bell,
  Users,
  DollarSign,
  LineChart,
  BarChart,
  Wallet,
  Puzzle,
  Settings
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarSeparator,
  SidebarFooter
} from "@/components/ui/sidebar";

const menuSections = [
  {
    label: "Core",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
      },
      {
        title: "Wealth",
        icon: DollarSign,
        path: "/dashboard/wealth",
      },
      {
        title: "Analyze Wealth",
        icon: BarChart,
        path: "/analyze-wealth",
      },
      {
        title: "Manage Cashflow & Liquidity",
        icon: Wallet,
        path: "/cashflow",
      },
    ]
  },
  {
    label: "Markets & Finance",
    items: [
      {
        title: "Trade",
        icon: TrendingUp,
        path: "/trading",
      },
      {
        title: "View Market Data & News",
        icon: LineChart,
        path: "/market-data",
      },
      {
        title: "Credit Facilities",
        icon: CreditCard,
        path: "/dashboard/credit",
      },
    ]
  },
  {
    label: "Management",
    items: [
      {
        title: "Notifications",
        icon: Bell,
        path: "/dashboard/notifications",
      },
      {
        title: "Manage Users & Permissions",
        icon: Users,
        path: "/dashboard/users",
      },
    ]
  },
  {
    label: "Settings & Integrations",
    items: [
      {
        title: "Connect 3rd Party Services",
        icon: Puzzle,
        path: "/integrations",
      },
      {
        title: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ]
  }
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  // Helper function to check if a path is active (exact match or starts with path)
  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== "/dashboard" && location.pathname.startsWith(path));
  };
  
  return (
    <Sidebar className="border-r border-border bg-background" collapsible="icon">
      <SidebarHeader className="flex items-center h-14 px-3 border-b border-border">
        <div className="text-lg font-semibold text-black">WP</div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {menuSections.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-2">
            <SidebarGroupLabel className="font-medium text-xs text-muted-foreground px-3 mb-1 uppercase tracking-wider">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActivePath(item.path)}
                      tooltip={item.title}
                      className="transition-colors hover:bg-accent/50 focus:bg-accent/50 group"
                    >
                      <Link to={item.path} className="flex items-center gap-3 p-2 rounded-md text-sm">
                        <div className="flex items-center justify-center w-5 h-5">
                          <item.icon className={`h-[18px] w-[18px] ${isActivePath(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                        </div>
                        <span className={`${isActivePath(item.path) ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-3 mt-auto border-t border-border" />
    </Sidebar>
  );
};

export default DashboardSidebar;
