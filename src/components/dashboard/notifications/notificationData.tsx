
import React from "react";
import { FileText, TrendingUp, AlertTriangle, Check } from "lucide-react";
import { Notification } from "./types";

export const notificationData: Notification[] = [
  {
    id: 1,
    title: "New advisory proposal",
    description: "UBS has sent a new proposal for your review",
    time: "10 minutes ago",
    read: false,
    icon: <FileText className="h-4 w-4" />,
    link: "/advice",
    details: {
      sender: "UBS Wealth Management",
      priority: "High",
      attachments: [
        { name: "Advisory_Proposal_Q2_2025.pdf", size: "1.2 MB" },
        { name: "Fee_Structure_Overview.xlsx", size: "852 KB" }
      ],
      content: "New discretionary mandate proposed with focus on sustainable investments. Fee structure changes included with 15% reduction from previous offer."
    }
  },
  {
    id: 2,
    title: "Market alert",
    description: "Unusual volatility detected in your portfolio",
    time: "2 hours ago",
    read: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    link: "/market-data",
    details: {
      sender: "Market Alert System",
      priority: "Medium",
      affectedAssets: ["US Equities", "Tech Sector ETFs"],
      content: "Several of your key holdings are experiencing high volatility due to recent economic announcements. Consider reviewing your position in technology assets."
    }
  },
  {
    id: 3,
    title: "Document signed",
    description: "Your mandate agreement was successfully signed",
    time: "Yesterday",
    read: true,
    icon: <Check className="h-4 w-4" />,
    link: "/documents",
    details: {
      sender: "Document Management",
      documentId: "MAND-20250405-001",
      counterparties: ["BlackRock", "Family Office"],
      content: "All parties have successfully signed the discretionary mandate agreement. The document has been securely stored and is available for your review."
    }
  },
  {
    id: 4,
    title: "Quarterly report available",
    description: "Your Q1 performance report is now available",
    time: "3 days ago",
    read: true,
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/reports",
    details: {
      sender: "Performance Reporting",
      period: "Q1 2025",
      highlights: [
        "Overall performance: +3.2%",
        "Benchmark comparison: +1.5%",
        "Top performer: Technology sector (+7.8%)"
      ],
      attachments: [
        { name: "Q1_2025_Performance_Report.pdf", size: "3.4 MB" }
      ],
      content: "Your quarterly performance report has been generated. Overall portfolio performance exceeds benchmark by 1.5%. Detailed asset class breakdown available in the full report."
    }
  }
];
