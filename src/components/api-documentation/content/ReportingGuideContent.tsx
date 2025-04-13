
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ReportingGuideContent: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reporting Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-700 mb-4">
          The WealthHorizon Reporting API allows you to generate customized reports for portfolios, assets,
          transactions, and performance analytics. This guide covers how to create, customize, and retrieve
          reports programmatically.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Portfolio Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Comprehensive reports on portfolio composition, performance, and risk metrics.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Transaction Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Detailed logs of all transactions within a specified time period.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Performance Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Analyses of portfolio performance against benchmarks and goals.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Custom Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tailored reports with specific metrics and visualizations.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Generation</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-medium text-gray-800 mb-4">Sample Report Request</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`POST /v1/reports
{
  "report_type": "portfolio_performance",
  "parameters": {
    "portfolio_id": "port_12345",
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "include_benchmarks": true,
    "benchmarks": ["SPY", "AGG"],
    "frequency": "monthly"
  },
  "format": "pdf",
  "template_id": "template_standard"
}`}
          </pre>
          
          <h3 className="font-medium text-gray-800 mb-4 mt-6">Sample Response</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm">
{`{
  "data": {
    "report_id": "report_789012",
    "status": "processing",
    "created_at": "2023-12-15T14:30:00Z",
    "estimated_completion_time": "2023-12-15T14:32:00Z",
    "download_url": null
  }
}`}
          </pre>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Templates</h2>
        
        <p className="text-gray-700 mb-6">
          WealthHorizon provides a variety of report templates that can be customized to meet your needs.
          You can also create your own templates using our template designer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Standard Template</h3>
              <p className="text-sm text-gray-600 mb-3">Comprehensive layout with all metrics</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Executive Summary</h3>
              <p className="text-sm text-gray-600 mb-3">Condensed high-level overview</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Detailed Analysis</h3>
              <p className="text-sm text-gray-600 mb-3">In-depth breakdown of all metrics</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Scheduling Reports</h2>
        
        <p className="text-gray-700 mb-6">
          Reports can be scheduled to run automatically at specified intervals using the Reporting API.
          Scheduled reports can be delivered via email, saved to cloud storage, or accessed through the API.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-4">Sample Schedule Request</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm">
{`POST /v1/reports/schedules
{
  "name": "Monthly Portfolio Review",
  "report_template_id": "template_standard",
  "parameters": {
    "portfolio_id": "port_12345",
    "relative_period": "last_month",
    "include_benchmarks": true
  },
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00",
    "timezone": "America/New_York"
  },
  "delivery": {
    "method": "email",
    "recipients": ["client@example.com", "advisor@example.com"],
    "subject": "Monthly Portfolio Review - {{ month }} {{ year }}"
  },
  "format": "pdf"
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};
