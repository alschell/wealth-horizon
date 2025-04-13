import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Users, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

// Leadership team data
const leadershipTeam = [
  {
    id: 1,
    name: "Alexander Schell",
    title: "Chief Executive Officer",
    bio: "Alexander has over a decade of experience in wealth managment and fintech. Prior to founding WealthHorizon, he was an Executive Director at UBS, where he led product development for Global Family Offices & Institutional Clients.",
    image: "/assets/dashboard-preview.png",
    linkedin: "#alexander-schell"
  },
  {
    id: 2,
    name: "Hilal Ram",
    title: "Chief Technology Officer",
    bio: "Michael brings 15 years of expertise in building scalable financial technology platforms. Before WealthHorizon, he was the Head of Technology at a leading financial data analytics company and previously held engineering leadership roles at Bloomberg.",
    image: "/assets/dashboard-fallback.png",
    linkedin: "#hilal-ram"
  },
  {
    id: 3,
    name: "Sarah Rodriguez",
    title: "Chief Product Officer",
    bio: "Sarah has spent her career developing innovative financial products. She previously served as Head of Product at a unicorn fintech startup and holds an MBA from Harvard Business School and a computer science degree from MIT.",
    image: "/assets/dashboard-preview.png",
    linkedin: "#sarah-rodriguez"
  },
  {
    id: 4,
    name: "James Wilson",
    title: "Chief Financial Officer",
    bio: "James has extensive experience in financial operations and strategy. Before joining WealthHorizon, he was a Partner at Deloitte's Financial Services practice and CFO at a rapidly-growing wealth management firm.",
    image: "/assets/dashboard-fallback.png",
    linkedin: "#james-wilson"
  },
  {
    id: 5,
    name: "Aisha Patel",
    title: "Chief Client Officer",
    bio: "Aisha leads our client success and relationship management teams. With 18 years in private banking and family office services, she previously managed key client relationships at UBS and JP Morgan's Private Bank.",
    image: "/assets/dashboard-preview.png",
    linkedin: "#aisha-patel"
  },
  {
    id: 6,
    name: "Robert Kim",
    title: "Head of Business Development",
    bio: "Robert drives WealthHorizon's growth and partnership strategy. He previously led business development at a leading family office software company and held senior roles in institutional sales at Fidelity Investments.",
    image: "/assets/dashboard-fallback.png",
    linkedin: "#robert-kim"
  }
];

// Board of advisors data
const advisoryBoard = [
  {
    id: 1,
    name: "Dr. Linda Thompson",
    title: "Former CIO, Global Investment Bank",
    bio: "Linda advises on technology strategy and implementation. She previously served as CIO at a major global investment bank and holds a Ph.D. in Computer Science.",
    image: "/assets/dashboard-preview.png"
  },
  {
    id: 2,
    name: "Jonathan Blackwell",
    title: "Family Office Executive",
    bio: "Jonathan brings perspective from the client side as the Executive Director of a multi-billion dollar family office. His insights help ensure our platform meets the real needs of sophisticated wealth management operations.",
    image: "/assets/dashboard-fallback.png"
  },
  {
    id: 3,
    name: "Maria Sanchez",
    title: "Fintech Investor & Entrepreneur",
    bio: "Maria has founded and invested in multiple successful fintech companies. Her entrepreneurial perspective and industry connections help guide our product and market strategy.",
    image: "/assets/dashboard-preview.png"
  }
];

const Team = () => {
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/assets/dashboard-fallback.png';
  };

  return (
    <>
      <Helmet>
        <title>Leadership Team | WealthHorizon</title>
        <meta name="description" content="Meet the leadership team and advisory board behind WealthHorizon's innovative wealth management platform." />
        <meta name="keywords" content="wealth management, leadership team, fintech executives, family office technology, wealth tech" />
      </Helmet>
      
      <PageTemplate
        title="Our Team"
        description="Meet the talented leaders and advisors behind WealthHorizon."
        icon={Users}
      >
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadershipTeam.map((member) => (
                <div key={member.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-64 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{member.title}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex items-center space-x-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={member.linkedin}>
                          <Linkedin size={14} /> LinkedIn
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2" asChild>
                        <a href={`mailto:media@wealthhorizon.ai`}>
                          <Mail size={14} /> Contact
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {advisoryBoard.map((advisor) => (
                <div key={advisor.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                    <img 
                      src={advisor.image} 
                      alt={advisor.name}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800">{advisor.name}</h3>
                    <p className="text-indigo-600 font-medium mb-3">{advisor.title}</p>
                    <p className="text-gray-600">{advisor.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
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
        </div>
      </PageTemplate>
    </>
  );
};

export default Team;
