
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
    <Sidebar 
      className="border-r border-border/10 bg-gradient-to-b from-gray-900 to-gray-800 text-white" 
      collapsible="icon"
    >
      <SidebarHeader className="flex items-center h-16 px-4 border-b border-border/10 bg-gray-900/50 backdrop-blur-sm">
        <div className="text-xl font-bold text-white tracking-tight">
          <span className="text-indigo-400">W</span>
          <span>ealth Pro</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActivePath(item.path)}
                    tooltip={item.title}
                    className={`transition-all duration-150 ease-in-out my-1 hover:bg-indigo-600/20 focus:bg-indigo-600/20 group whitespace-nowrap ${
                      isActivePath(item.path) 
                        ? "bg-indigo-600/30 text-white border-l-2 border-indigo-400 pl-[10px]" 
                        : "text-gray-300 hover:text-white pl-3"
                    }`}
                  >
                    <Link to={item.path} className="flex items-center gap-3 p-2 rounded-md text-sm">
                      <div className="flex items-center justify-center w-5 h-5">
                        <item.icon className={`h-[18px] w-[18px] ${
                          isActivePath(item.path) 
                            ? 'text-indigo-400' 
                            : 'text-gray-400 group-hover:text-indigo-400'
                        }`} />
                      </div>
                      <span className={`truncate ${
                        isActivePath(item.path) 
                          ? 'font-medium' 
                          : ''
                      }`}>
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
      
      <SidebarFooter className="p-4 mt-auto border-t border-border/10 bg-gray-900/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Log Out"
              className="transition-all duration-150 ease-in-out hover:bg-red-600/20 focus:bg-red-600/20 group whitespace-nowrap"
            >
              <Link to="/" className="flex items-center gap-3 p-2 rounded-md text-sm">
                <div className="flex items-center justify-center w-5 h-5">
                  <LogOut className="h-[18px] w-[18px] text-gray-400 group-hover:text-red-400" />
                </div>
                <span className="truncate text-gray-300 group-hover:text-red-400">
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
