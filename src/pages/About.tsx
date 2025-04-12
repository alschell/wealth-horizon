
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Building, Users, ChartLine, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <PageTemplate
      title="About Us"
      description="Learn about WealthHorizon's mission, vision, and the team behind our innovative wealth management platform."
      icon={Building}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At WealthHorizon, we're committed to transforming wealth management through technology and 
            innovation. Our mission is to empower family offices and financial institutions with 
            comprehensive, intelligent tools that simplify complex financial operations and create 
            exceptional value.
          </p>
        </section>

        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2022 by a team of financial experts and technology innovators, WealthHorizon
            emerged from a shared vision to address the unique challenges faced by family offices
            and financial institutions in managing complex wealth portfolios.
          </p>
          <p className="text-gray-600 mb-4">
            We recognized that traditional wealth management systems were often fragmented,
            difficult to use, and lacked the comprehensive insights needed for strategic decision-making.
            Our platform was built from the ground up to overcome these limitations.
          </p>
          <p className="text-gray-600">
            Today, WealthHorizon serves clients across the globe, helping them streamline operations,
            gain deeper insights, and maximize the potential of their wealth management strategies.
          </p>
        </section>

        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Users size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">Client-Centric</h3>
              </div>
              <p className="text-gray-600">We put our clients' needs at the center of everything we do.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <ChartLine size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">Innovation</h3>
              </div>
              <p className="text-gray-600">We continuously push boundaries to create better solutions.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Award size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">Excellence</h3>
              </div>
              <p className="text-gray-600">We strive for excellence in every aspect of our service.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Building size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">Integrity</h3>
              </div>
              <p className="text-gray-600">We uphold the highest standards of integrity and ethics.</p>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default About;
