
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Newspaper, Award, Calendar, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const pressReleases = [
  {
    id: 1,
    title: "WealthHorizon Announces Strategic Partnership with Global Investment Firm",
    date: "April 10, 2025",
    excerpt: "This collaboration will enhance our platform's capabilities and expand access to exclusive investment opportunities for our clients.",
    link: "#"
  },
  {
    id: 2,
    title: "WealthHorizon Platform Wins 'Innovation of the Year' at Wealth Tech Awards",
    date: "March 15, 2025",
    excerpt: "Our wealth management platform was recognized for its breakthrough approach to portfolio analytics and client engagement.",
    link: "#"
  },
  {
    id: 3,
    title: "WealthHorizon Expands European Presence with New Office in Zurich",
    date: "February 22, 2025",
    excerpt: "This expansion strengthens our commitment to serving family offices and financial institutions across Europe.",
    link: "#"
  }
];

const mediaFeatures = [
  {
    id: 1,
    title: "How WealthHorizon is Revolutionizing Family Office Management",
    publication: "Financial Times",
    date: "March 28, 2025",
    link: "#"
  },
  {
    id: 2,
    title: "The Technology Transforming Wealth Management for Ultra-High-Net-Worth Families",
    publication: "Bloomberg",
    date: "March 5, 2025",
    link: "#"
  },
  {
    id: 3,
    title: "WealthHorizon CEO Discusses the Future of Wealth Tech",
    publication: "Forbes",
    date: "February 12, 2025",
    link: "#"
  },
  {
    id: 4,
    title: "Family Offices Embrace Digital Transformation with WealthHorizon",
    publication: "Wall Street Journal",
    date: "January 20, 2025",
    link: "#"
  }
];

const Press = () => {
  return (
    <PageTemplate
      title="Press"
      description="News, announcements, and media resources about WealthHorizon."
      icon={Newspaper}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release.id} className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{release.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.excerpt}</p>
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href={release.link}>
                    Read Full Release <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Media Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaFeatures.map((feature) => (
              <div key={feature.id} className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-indigo-600 font-medium">{feature.publication}</span>
                  <span className="text-sm text-gray-500">{feature.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <a href={feature.link} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                  Read Article <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { year: "2025", award: "Innovation of the Year", organization: "Wealth Tech Awards" },
              { year: "2025", award: "Best Platform for Family Offices", organization: "Private Banking Awards" },
              { year: "2025", award: "Top 10 FinTech Innovators", organization: "Financial Advisor Magazine" }
            ].map((item, index) => (
              <div key={index} className="bg-indigo-50 rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.award}</h3>
                <p className="text-gray-600 mb-2">{item.organization}</p>
                <span className="text-sm text-indigo-600">{item.year}</span>
              </div>
            ))}
          </div>
        </section>
        
        <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Media Inquiries</h2>
          <p className="text-gray-600 mb-6">
            For press inquiries, interview requests, or media resources, please contact our communications team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex items-center gap-2">
              Download Press Kit <ExternalLink size={16} />
            </Button>
            <Button variant="outline">Contact Media Relations</Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Press;
