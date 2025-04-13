
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Call-to-action section encouraging visitors to explore job opportunities
 */
const JoinSection: React.FC = () => {
  return (
    <section className="bg-indigo-50 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Team</h2>
      
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        We're always looking for talented individuals who are passionate about 
        transforming the wealth management industry with innovative technology.
      </p>
      
      <Button asChild>
        <Link to="/careers" className="inline-flex items-center">
          View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </section>
  );
};

export default JoinSection;
