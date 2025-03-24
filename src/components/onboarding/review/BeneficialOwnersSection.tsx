
import React from "react";
import { BeneficialOwnerInfo } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface BeneficialOwnersSectionProps {
  beneficialOwners: BeneficialOwnerInfo[];
}

const BeneficialOwnersSection: React.FC<BeneficialOwnersSectionProps> = ({ 
  beneficialOwners 
}) => {
  return (
    <section className="space-y-3">
      <ReviewSectionHeader title="Beneficial Owners" stepIndex={5} />
      {beneficialOwners.length > 0 ? (
        <div className="space-y-2">
          {beneficialOwners.map((owner, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
              <div className="font-medium text-black">{owner.firstName} {owner.lastName}</div>
              <div className="text-black">
                {owner.relationship} · {owner.ownershipPercentage}% ownership · {owner.nationality}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-black">No beneficial owners added</div>
      )}
    </section>
  );
};

export default BeneficialOwnersSection;
