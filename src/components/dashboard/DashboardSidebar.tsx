
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart,
  Lightbulb,
  TrendingUp,
  LineChart,
  CreditCard,
  Wallet,
  Settings,
  FileText,
  Users,
  LogOut,
  Link2
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Wealth Analysis",
    icon: BarChart,
    path: "/analyze-wealth",
  },
  {
    title: "Advisory",
    icon: Lightbulb,
    path: "/advice",
  },
  {
    title: "Trading",
    icon: TrendingUp,
    path: "/trading",
  },
  {
    title: "Market Data & News",
    icon: LineChart,
    path: "/market-data",
  },
  {
    title: "Credit Facilities",
    icon: CreditCard,
    path: "/dashboard/credit",
  },
  {
    title: "Cashflow & Liquidity",
    icon: Wallet,
    path: "/cashflow",
  },
  {
    title: "Integrations",
    icon: Link2,
    path: "/integrations",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    title: "Reporting",
    icon: FileText,
    path: "/reporting",
  },
  {
    title: "User Management",
    icon: Users,
    path: "/dashboard/users",
  },
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActivePath(item.path)}
                    tooltip={item.title}
                    className="transition-colors hover:bg-accent/50 focus:bg-accent/50 group whitespace-nowrap"
                  >
                    <Link to={item.path} className="flex items-center gap-2 p-2 rounded-md text-sm">
                      <div className="flex items-center justify-center w-5 h-5">
                        <item.icon className={`h-[18px] w-[18px] ${isActivePath(item.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                      </div>
                      <span className={`truncate ${isActivePath(item.path) ? 'font-medium text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-3 mt-auto border-t border-border">
        <Separator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log Out"
              className="transition-colors hover:bg-accent/50 focus:bg-accent/50 group whitespace-nowrap"
            >
              <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-sm">
                <div className="flex items-center justify-center w-5 h-5">
                  <LogOut className="h-[18px] w-[18px] text-muted-foreground group-hover:text-foreground" />
                </div>
                <span className="truncate text-muted-foreground group-hover:text-foreground">
                  Log Out
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
