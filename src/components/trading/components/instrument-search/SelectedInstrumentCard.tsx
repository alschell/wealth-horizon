
import React from "react";
import { Instrument } from "../../types";
import { Button } from "@/components/ui/button";

interface SelectedInstrumentCardProps {
  instrument: Instrument;
  onClear?: () => void;
}

// We'll remove this component entirely as it's creating the duplicate card
const SelectedInstrumentCard: React.FC<SelectedInstrumentCardProps> = ({ instrument, onClear }) => {
  return null; // Return null to prevent rendering anything
};

export default SelectedInstrumentCard;
