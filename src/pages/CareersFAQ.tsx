
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Briefcase, FileText, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CareersFAQ = () => {
  const navigate = useNavigate();

  return (
    <PageTemplate
      title="Careers FAQ"
      description="Frequently asked questions about careers at WealthHorizon"
      icon={HelpCircle}
    >
      <Button 
        variant="outline" 
        className="mb-6 flex items-center"
        onClick={() => navigate("/careers")}
      >
        <Briefcase className="mr-2 h-4 w-4" /> Back to Careers
      </Button>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the hiring process like at WealthHorizon?</h3>
              <p className="text-gray-600">
                Our hiring process typically consists of an initial application review, followed by a screening call with our recruiting team, a technical or role-specific assessment, team interviews, and finally an offer and onboarding. The entire process usually takes 3-4 weeks, depending on the role and candidate availability.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Do you offer remote work options?</h3>
              <p className="text-gray-600">
                Yes, we offer flexible work arrangements including fully remote positions for many roles. Some positions may require periodic in-office presence or may be location-specific. Each job posting will specify the location requirements.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What benefits does WealthHorizon offer?</h3>
              <p className="text-gray-600">
                We offer competitive compensation packages including base salary and equity options, comprehensive health, dental, and vision insurance, flexible PTO, professional development budgets, parental leave, 401(k) matching, and various wellness programs.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">I don't see a position that matches my skills. Can I still apply?</h3>
              <p className="text-gray-600">
                Absolutely! We're always interested in connecting with talented individuals. You can submit your resume through our "Submit Your Resume" option on the Careers page, and we'll reach out if a suitable position becomes available.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How can I prepare for interviews at WealthHorizon?</h3>
              <p className="text-gray-600">
                Research our platform and services, review the job description thoroughly, prepare examples of relevant past work, and be ready to discuss how your skills align with our mission of transforming wealth management. For technical roles, brush up on relevant technologies mentioned in the job posting.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the company culture like?</h3>
              <p className="text-gray-600">
                We foster a collaborative, innovative environment where ideas are valued regardless of where they come from. We believe in work-life balance, continuous learning, and maintaining high standards of excellence. Our team is diverse, inclusive, and united by our mission to transform wealth management.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How long does it take to hear back after applying?</h3>
              <p className="text-gray-600">
                We typically review applications within 1-2 weeks of submission. If your qualifications match our needs, our recruiting team will reach out to schedule an initial conversation. Due to the volume of applications, we may not be able to respond to every applicant individually.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Are there opportunities for growth and advancement?</h3>
              <p className="text-gray-600">
                Yes, we strongly believe in promoting from within and providing clear pathways for career development. We offer mentorship opportunities, regular performance feedback, and professional development resources to help you grow your career at WealthHorizon.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Still have questions?</h2>
          <p className="mb-6 max-w-2xl mx-auto text-gray-600">
            If you couldn't find the answer you're looking for, feel free to reach out to our recruiting team directly.
          </p>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => window.location.href = "mailto:careers@wealthhorizon.ai"}
          >
            <FileText className="mr-2 h-4 w-4" />
            Contact Recruiting
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default CareersFAQ;
