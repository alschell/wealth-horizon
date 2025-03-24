
import React from "react";
import { PrimaryContactInfo } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface PrimaryContactSectionProps {
  primaryContactInfo: PrimaryContactInfo;
}

const PrimaryContactSection: React.FC<PrimaryContactSectionProps> = ({ 
  primaryContactInfo 
}) => {
  return (
    <section className="space-y-3 border-b pb-4">
      <ReviewSectionHeader title="Primary Contact" stepIndex={1} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div>
          <span className="font-medium text-black">Name:</span>
          <span className="ml-2 text-black">
            {primaryContactInfo.firstName} {primaryContactInfo.lastName}
          </span>
        </div>
        <div>
          <span className="font-medium text-black">Position:</span>
          <span className="ml-2 text-black">{primaryContactInfo.position || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Email:</span>
          <span className="ml-2 text-black">{primaryContactInfo.email || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Phone:</span>
          <span className="ml-2 text-black">{primaryContactInfo.phone || "Not provided"}</span>
        </div>
      </div>
    </section>
  );
};

export default PrimaryContactSection;
