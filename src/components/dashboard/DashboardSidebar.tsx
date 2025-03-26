
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Bell,
  Users,
  DollarSign
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
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
    title: "Trading",
    icon: TrendingUp,
    path: "/dashboard/trading",
  },
  {
    title: "Credit Facilities",
    icon: CreditCard,
    path: "/dashboard/credit",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/dashboard/notifications",
  },
  {
    title: "User Management",
    icon: Users,
    path: "/dashboard/users",
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
