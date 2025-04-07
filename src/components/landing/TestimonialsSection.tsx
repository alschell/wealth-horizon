
import React from "react";
import { FadeIn } from "@/components/ui/animation";

const testimonials = [
  {
    quote: "Wealth Horizon has transformed how our family office operates. We've eliminated multiple tools and streamlined our entire wealth management process.",
    name: "Alexandra Chen",
    position: "CEO, Chen Family Office",
  },
  {
    quote: "The analytics capabilities are exceptional. We're able to see portfolio insights we never had access to before, which has directly improved our returns.",
    name: "Michael Thompson",
    position: "CIO, Granite Investments",
  },
  {
    quote: "The compliance monitoring alone has saved us countless hours and helped us avoid potential regulatory issues. Incredible value for any institution.",
    name: "Sarah Rodriguez",
    position: "Head of Compliance, Legacy Capital",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Leading Institutions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See what family offices and institutional investors say about Wealth Horizon.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
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
