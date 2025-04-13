
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  BenefitsSection,
  OpenPositionsSection,
  HiringProcessSection,
  LifeAtCompanySection,
  ResumeUploadModal,
  CareersCTA,
  JobPosition
} from "@/components/careers";

// Career positions data
const openPositions: JobPosition[] = [
  {
    id: 1,
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time"
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time"
  },
  {
    id: 3,
    title: "Financial Analyst",
    department: "Finance",
    location: "New York, NY",
    type: "Full-time"
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote (Global)",
    type: "Full-time"
  },
  {
    id: 5,
    title: "Client Success Manager",
    department: "Client Services",
    location: "Boston, MA",
    type: "Full-time"
  }
];

const Careers = () => {
  const navigate = useNavigate();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const viewPosition = (position: JobPosition) => {
    navigate(`/careers/${position.id}`, { state: { job: position } });
  };

  return (
    <PageTemplate
      title="Careers"
      description="Join our team and help shape the future of wealth management technology."
      icon={Briefcase}
    >
      <div className="space-y-12">
        <BenefitsSection />
        
        <Separator />
        
        <OpenPositionsSection 
          positions={openPositions} 
          onViewPosition={viewPosition} 
        />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <HiringProcessSection />
          <LifeAtCompanySection />
        </section>
        
        <CareersCTA onResumeUpload={() => setIsResumeModalOpen(true)} />
      </div>

      <ResumeUploadModal 
        open={isResumeModalOpen} 
        onOpenChange={setIsResumeModalOpen}
      />
    </PageTemplate>
  );
};

export default Careers;
