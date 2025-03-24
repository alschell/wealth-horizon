
import React from "react";
import { AddressInfo } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface AddressSectionProps {
  addressInfo: AddressInfo;
}

const AddressSection: React.FC<AddressSectionProps> = ({ 
  addressInfo 
}) => {
  return (
    <section className="space-y-3 border-b pb-4">
      <ReviewSectionHeader title="Address" stepIndex={2} />
      <div className="grid grid-cols-1 gap-y-2 text-sm">
        <div>
          <span className="font-medium text-black">Street Address:</span>
          <span className="ml-2 text-black">{addressInfo.streetAddress || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">City, State, Postal Code:</span>
          <span className="ml-2 text-black">
            {addressInfo.city}
            {addressInfo.state ? `, ${addressInfo.state}` : ""} {addressInfo.postalCode}
          </span>
        </div>
        <div>
          <span className="font-medium text-black">Country:</span>
          <span className="ml-2 text-black">{addressInfo.country || "Not provided"}</span>
        </div>
      </div>
    </section>
  );
};

export default AddressSection;
