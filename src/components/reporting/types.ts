
export interface ReportBase {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
  category: string;
  starred?: boolean;
}

export interface AvailableReport extends ReportBase {
  status: "Available";
  format: string;
  size: string;
}

export interface ProcessingReport extends ReportBase {
  status: "Processing";
  format?: string;
  size?: string;
}

export type Report = AvailableReport | ProcessingReport;

export interface ScheduledReport {
  id: number;
  title: string;
  frequency: string;
  nextDate: string;
  format: string;
  recipients: string[];
}
