
import React from "react";
import { FadeIn } from "@/components/ui/animation";
import { LocalizedText, useLocalizedText } from "@/components/ui/localized-text";

const testimonials = [
  {
    quote: "WealthHorizon has transformed how our family office operates. We've eliminated multiple tools and streamlined the way we facilitate our business.",
    name: "Alexandra Chen",
    position: "CEO, Chen Family Office",
  },
  {
    quote: "The analytics capabilities are exceptional. We're able to see portfolio insights we never had access to before, which has directly improved our returns.",
    name: "Michael Thompson",
    position: "CIO, Granite Investments",
  },
  {
    quote: "We were not aware that this degree of automation and efficiency is possible using artificial intelligence.",
    name: "Sarah Rodriguez",
    position: "Head of Compliance, Legacy Capital",
  },
];

const TestimonialsSection: React.FC = () => {
  const { t } = useLocalizedText();
  
  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <LocalizedText textKey="trustedByLeading" fallback="Trusted by Leading Institutions" />
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              <LocalizedText 
                textKey="seeWhatFamilyOffices" 
                fallback="See what family offices and institutional investors say about" 
              />
              {" "}
              <span className="text-indigo-600">Wealth</span>
              <span>Horizon</span>.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 flex-grow italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
