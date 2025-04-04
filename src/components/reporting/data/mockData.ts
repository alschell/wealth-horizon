
import { Report, ScheduledReport } from "../types";

// Sample report data
export const reportsData: Report[] = [
  {
    id: 1,
    title: "Q1 2025 Performance Report",
    type: "Performance",
    date: "2025-04-01",
    status: "Available",
    format: "PDF",
    size: "2.4 MB",
    category: "portfolio",
    starred: true
  },
  {
    id: 2,
    title: "March 2025 Transaction Report",
    type: "Transactions",
    date: "2025-03-31",
    status: "Available",
    format: "XLSX",
    size: "1.8 MB",
    category: "transaction"
  },
  {
    id: 3,
    title: "Risk Analysis Report",
    type: "Risk",
    date: "2025-03-25",
    status: "Available",
    format: "PDF",
    size: "3.2 MB",
    category: "risk"
  },
  {
    id: 4,
    title: "Q4 2024 Performance Report",
    type: "Performance",
    date: "2025-01-15",
    status: "Available",
    format: "PDF",
    size: "2.6 MB",
    category: "portfolio"
  },
  {
    id: 5,
    title: "Tax Documentation 2024",
    type: "Tax",
    date: "2025-02-28",
    status: "Available",
    format: "PDF",
    size: "4.1 MB",
    category: "tax"
  },
  {
    id: 6,
    title: "Custom Wealth Report",
    type: "Custom",
    date: "2025-04-06",
    status: "Processing",
    category: "custom"
  },
  {
    id: 7,
    title: "ESG Impact Analysis",
    type: "ESG",
    date: "2025-03-10",
    status: "Available",
    format: "PDF",
    size: "2.9 MB",
    category: "esg"
  }
];

// Sample scheduled reports
export const scheduledReportsData: ScheduledReport[] = [
  {
    id: 1,
    title: "Monthly Performance Summary",
    frequency: "Monthly",
    nextDate: "2025-05-01",
    format: "PDF",
    recipients: ["your.email@example.com"]
  },
  {
    id: 2,
    title: "Transaction Report",
    frequency: "Weekly",
    nextDate: "2025-04-11",
    format: "XLSX",
    recipients: ["your.email@example.com", "advisor@example.com"]
  },
  {
    id: 3,
    title: "Portfolio Valuation",
    frequency: "Daily",
    nextDate: "2025-04-05",
    format: "PDF",
    recipients: ["your.email@example.com"]
  }
];
