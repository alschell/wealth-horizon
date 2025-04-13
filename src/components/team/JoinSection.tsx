
import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const JoinSection: React.FC = () => {
  return (
    <section className="bg-indigo-50 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Team</h2>
      <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
        We're always looking for talented individuals who are passionate about innovation in wealth management.
        Explore our current opportunities and see if there's a role that matches your skills and interests.
      </p>
      <Button size="lg" className="flex items-center gap-2 mx-auto" asChild>
        <a href="/careers">
          View Open Positions <ExternalLink size={14} />
        </a>
      </Button>
    </section>
  );
};

export default JoinSection;
