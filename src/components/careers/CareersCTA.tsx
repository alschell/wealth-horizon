
import React from "react";
import { Button } from "@/components/ui/button";

interface CareersCTAProps {
  onResumeUpload: () => void;
}

export const CareersCTA: React.FC<CareersCTAProps> = ({ onResumeUpload }) => {
  return (
    <section className="bg-indigo-600 text-white rounded-xl p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-white">Don't see the right position?</h2>
      <p className="mb-6 max-w-2xl mx-auto">
        We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to WealthHorizon.
      </p>
      <Button 
        className="bg-white text-indigo-600 hover:bg-gray-100"
        onClick={onResumeUpload}
      >
        Submit Your Resume
      </Button>
    </section>
  );
};
