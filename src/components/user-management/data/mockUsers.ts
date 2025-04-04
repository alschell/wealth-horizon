
import { UserType } from "../types";

export const mockUsers: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastActivity: "Today at 10:23 AM",
    dataAccess: "Full Access",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: true,
      marketData: true,
      cashflow: true,
      analyzeWealth: true,
      integrations: true,
      settings: true
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "member",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastActivity: "Yesterday at 4:15 PM",
    dataAccess: "Limited Access",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: true,
      marketData: true,
      cashflow: false,
      analyzeWealth: true,
      integrations: false,
      settings: false
    }
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "viewer",
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastActivity: "5 days ago",
    dataAccess: "Read Only",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: false,
      marketData: true,
      cashflow: false,
      analyzeWealth: false,
      integrations: false,
      settings: false
    }
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    role: "member",
    status: "invited",
    dataAccess: "Limited Access",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: true,
      marketData: true,
      cashflow: true,
      analyzeWealth: false,
      integrations: false,
      settings: false
    }
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "viewer",
    status: "invited",
    dataAccess: "Read Only",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: false,
      marketData: true,
      cashflow: false,
      analyzeWealth: false,
      integrations: false,
      settings: false
    }
  },
  {
    id: "6",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "member",
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastActivity: "2 months ago",
    dataAccess: "Limited Access",
    permissions: {
      dashboard: true,
      wealth: true,
      trading: true,
      marketData: true,
      cashflow: true,
      analyzeWealth: false,
      integrations: false,
      settings: false
    }
  }
];
