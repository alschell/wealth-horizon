
import React from "react";
import { Report } from "../types";
import ReportFilters from "../components/ReportFilters";
import ReportCard from "../components/ReportCard";
import NoReportsFound from "../components/NoReportsFound";

interface AvailableReportsTabProps {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortDirection: string;
  setSortDirection: (value: string) => void;
  toggleStar: (id: number) => void;
  downloadReport: (id: number) => void;
}

const AvailableReportsTab: React.FC<AvailableReportsTabProps> = ({
  reports,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  date,
  setDate,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  toggleStar,
  downloadReport
}) => {
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setDate(undefined);
  };

  const filteredReports = reports
    .filter(report => 
      (selectedCategory === "all" || report.category === selectedCategory) &&
      (report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       report.type.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortDirection === "desc" 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "title") {
        return sortDirection === "desc" 
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      } else if (sortBy === "type") {
        return sortDirection === "desc" 
          ? b.type.localeCompare(a.type)
          : a.type.localeCompare(b.type);
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <ReportFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        date={date}
        setDate={setDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
      />

      {filteredReports.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              toggleStar={toggleStar}
              downloadReport={downloadReport}
            />
          ))}
        </div>
      ) : (
        <NoReportsFound resetFilters={resetFilters} />
      )}
    </div>
  );
};

export default AvailableReportsTab;
