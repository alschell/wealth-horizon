
import React from "react";
import { MapPin } from "@/utils/icons";
import FormHeader from "@/components/onboarding/family-office/FormHeader";

const AddressFormHeader: React.FC = () => {
  return (
    <FormHeader
      icon={<MapPin className="h-7 w-7 text-black" />}
      title="Address Information"
      description="Please provide the current address for your family office."
    />
  );
};

export default AddressFormHeader;
