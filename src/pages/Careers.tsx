
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Briefcase, Users, Heart, Target, Search, MapPin, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const openPositions = [
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
  return (
    <PageTemplate
      title="Careers"
      description="Join our team and help shape the future of wealth management technology."
      icon={Briefcase}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why Join WealthHorizon?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">
                Build solutions that transform how wealth is managed globally, working on challenging problems with significant financial impact.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Exceptional Team</h3>
              <p className="text-gray-600">
                Collaborate with talented, diverse professionals who bring expertise from finance, technology, and design.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Holistic Benefits</h3>
              <p className="text-gray-600">
                Enjoy competitive compensation, flexible work arrangements, comprehensive healthcare, and professional development opportunities.
              </p>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Open Positions</h2>
            <div className="relative mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search positions..."
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
            {openPositions.map((position, index) => (
              <React.Fragment key={position.id}>
                {index > 0 && <Separator />}
                <div className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{position.title}</h3>
                      <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                        <span className="mr-4 flex items-center">
                          <Briefcase size={16} className="mr-1" /> {position.department}
                        </span>
                        <span className="mr-4 flex items-center">
                          <MapPin size={16} className="mr-1" /> {position.location}
                        </span>
                        <span className="flex items-center">
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button className="mt-4 md:mt-0 flex items-center" variant="outline">
                      View Position <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Hiring Process</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Application Review</h4>
                  <p className="text-gray-600 text-sm">Our team reviews your application and assesses your qualifications.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Initial Interview</h4>
                  <p className="text-gray-600 text-sm">A conversation with our recruiting team to discuss your experience and goals.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Technical Assessment</h4>
                  <p className="text-gray-600 text-sm">Role-specific evaluation of your skills and expertise.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Team Interviews</h4>
                  <p className="text-gray-600 text-sm">Meet with potential teammates and stakeholders.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Offer & Onboarding</h4>
                  <p className="text-gray-600 text-sm">Welcome to the WealthHorizon team!</p>
                </div>
              </li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Life at WealthHorizon</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                At WealthHorizon, we foster a culture of innovation, collaboration, and excellence. Our team members enjoy:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Flexible work arrangements with remote options</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Continuous learning and development opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Comprehensive health and wellness benefits</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Competitive compensation and equity packages</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                    ✓
                  </div>
                  <span className="text-gray-700">Regular team events and community building</span>
                </li>
              </ul>
              
              <div className="mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-indigo-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Don't see the right position?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to WealthHorizon.
          </p>
          <Button className="bg-white text-indigo-600 hover:bg-gray-100">
            Submit Your Resume
          </Button>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Careers;
