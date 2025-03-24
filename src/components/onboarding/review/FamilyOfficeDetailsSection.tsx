
import React from "react";
import { FamilyOfficeInfo } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface FamilyOfficeDetailsSectionProps {
  familyOfficeInfo: FamilyOfficeInfo;
}

const FamilyOfficeDetailsSection: React.FC<FamilyOfficeDetailsSectionProps> = ({ 
  familyOfficeInfo 
}) => {
  return (
    <section className="space-y-3 border-b pb-4">
      <ReviewSectionHeader title="Family Office Details" stepIndex={0} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div>
          <span className="font-medium text-black">Office Name:</span>
          <span className="ml-2 text-black">{familyOfficeInfo.officeName || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Legal Entity Type:</span>
          <span className="ml-2 text-black">{familyOfficeInfo.legalEntityType || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Jurisdiction:</span>
          <span className="ml-2 text-black">{familyOfficeInfo.jurisdiction || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Tax ID:</span>
          <span className="ml-2 text-black">{familyOfficeInfo.taxId || "Not provided"}</span>
        </div>
      </div>
    </section>
  );
};

export default FamilyOfficeDetailsSection;
