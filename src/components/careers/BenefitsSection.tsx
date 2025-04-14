
import React from "react";
import { Target, Users, Heart } from "@/utils/icons";

export const BenefitsSection: React.FC = () => {
  return (
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
  );
};
