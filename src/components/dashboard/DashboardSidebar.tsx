
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
  PlusCircle,
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
  
  return (
    <Sidebar className="border-r border-border bg-secondary">
      <SidebarHeader className="flex items-center h-14 px-4 border-b border-border">
        <div className="text-lg font-semibold text-black">Wealth Platform</div>
      </SidebarHeader>
      <SidebarContent className="py-2">
        {menuSections.map((section, idx) => (
          <SidebarGroup key={idx} className="mb-4">
            <SidebarGroupLabel className="font-medium text-xs text-muted-foreground px-3 mb-1 uppercase tracking-wider">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.path}
                      tooltip={item.title}
                      className="transition-colors hover:bg-accent focus:bg-accent group"
                    >
                      <Link to={item.path} className="flex items-center gap-3 p-2 rounded-md text-sm">
                        <div className="flex items-center justify-center w-6 h-6">
                          <item.icon className={`h-[18px] w-[18px] ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                        </div>
                        <span className={`${location.pathname === item.path ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
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

        <SidebarSeparator className="my-2" />
        
        <SidebarGroup>
          <SidebarMenuButton 
            asChild
            className="mt-2 mx-3 text-sm font-medium w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md py-2 px-3 transition-colors"
          >
            <button>
              <PlusCircle className="h-4 w-4" />
              <span>Add Integration</span>
            </button>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3 mt-auto border-t border-border" />
    </Sidebar>
  );
};

export default DashboardSidebar;
