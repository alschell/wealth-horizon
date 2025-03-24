
import React from "react";
import { LegalDocuments } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface LegalDocumentsSectionProps {
  legalDocuments: LegalDocuments;
  formatDate: (dateString: string) => string;
}

const LegalDocumentsSection: React.FC<LegalDocumentsSectionProps> = ({ 
  legalDocuments,
  formatDate
}) => {
  return (
    <section className="space-y-3 border-b pb-4">
      <ReviewSectionHeader title="Legal Documents" stepIndex={3} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
        <div>
          <span className="font-medium text-black">Document Type:</span>
          <span className="ml-2 text-black">{legalDocuments.documentType || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Document Number:</span>
          <span className="ml-2 text-black">{legalDocuments.documentNumber || "Not provided"}</span>
        </div>
        <div>
          <span className="font-medium text-black">Issue Date:</span>
          <span className="ml-2 text-black">{formatDate(legalDocuments.issueDate)}</span>
        </div>
        <div>
          <span className="font-medium text-black">Uploaded Documents:</span>
          <span className="ml-2 text-black">{legalDocuments.documentFiles.length} files</span>
        </div>
      </div>
    </section>
  );
};

export default LegalDocumentsSection;
