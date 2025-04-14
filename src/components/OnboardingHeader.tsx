
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "@/utils/icons";

const OnboardingHeader: React.FC = () => {
  return (
    <header className="flex justify-between items-center py-4 px-6 border-b">
      <div className="flex items-center">
        <img src="/logo.svg" alt="WealthHorizon" className="h-8 w-auto mr-8" />
        <span className="text-lg font-semibold">Onboarding</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="/assets/avatar.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default OnboardingHeader;
