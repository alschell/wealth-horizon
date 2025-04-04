
import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  return (
    <header className="h-16 px-4 flex items-center justify-end bg-background">
      <Button variant="ghost" size="icon" className="text-black">
        <Bell className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default DashboardHeader;
