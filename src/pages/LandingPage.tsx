
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, CheckCircle, BarChart3, Shield, Briefcase, Users, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScaleIn, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";
import { Separator } from "@/components/ui/separator";

const LandingPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Holistic wealth management for{" "}
                <span className="text-indigo-600">family offices</span> and{" "}
                <span className="text-indigo-600">institutions</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">
                All your bankable wealth made actionable over one platform across all your banks, brokers & custodians
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-md px-8">
                  <Link to="/onboarding">Get Started</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-md px-8"
                  onClick={() => scrollToSection("features")}
                >
                  Learn More
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 items-center text-sm text-gray-600">
                {["Bank-level security", "Full compliance", "Real-time analytics"].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-indigo-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <ScaleIn delay={0.4}>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-100">
                <div className="relative aspect-[4/3]">
                  <img
                    src="/assets/dashboard-preview.png"
                    alt="Wealth Horizon Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </ScaleIn>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection("features")}
              aria-label="Scroll to features"
              className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white transition-colors"
            >
              <ChevronDown size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">One Platform to Replace Them All</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Eliminate disconnected tools and unify your wealth management operations in a single, powerful platform.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index} className="group">
                <div className="h-full p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Transform Your Wealth Management</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Experience a new level of efficiency, insight, and control with Wealth Horizon.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn delay={0.2}>
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/assets/dashboard-fallback.png" 
                  alt="Platform Overview" 
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
            
            <div>
              <StaggerContainer className="space-y-8">
                {benefits.map((benefit, index) => (
                  <StaggerItem key={index}>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Optimize Your Wealth Management?</h2>
              <p className="mt-4 text-xl text-indigo-100 max-w-2xl">
                Join leading family offices and institutions that have transformed their operations with Wealth Horizon.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8">
                  <Link to="/onboarding">Get Started</Link>
                </Button>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 text-md px-8">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Wealth Horizon</h3>
              <p className="mb-4">Holistic wealth management for family offices and institutions.</p>
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Portfolio Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trading</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wealth Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reporting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-800" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Wealth Horizon. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature section data
const features = [
  {
    title: "Comprehensive Portfolio Management",
    description: "Track, analyze, and optimize your entire investment portfolio with real-time data and advanced analytics.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Advanced Trading Platform",
    description: "Execute trades, manage allocations, and monitor market movements all in one integrated platform.",
    icon: <Briefcase size={24} />,
  },
  {
    title: "Institutional-Grade Security",
    description: "Enterprise security features with multi-factor authentication and end-to-end encryption for your data.",
    icon: <Shield size={24} />,
  },
  {
    title: "Family Office Management",
    description: "Specialized tools for family offices including entity management, tax planning, and legacy planning.",
    icon: <Users size={24} />,
  },
  {
    title: "Global Investment Coverage",
    description: "Access and analyze investment opportunities across all asset classes and global markets.",
    icon: <Globe size={24} />,
  },
  {
    title: "Compliance Monitoring",
    description: "Automated compliance checks and real-time monitoring to ensure regulatory adherence.",
    icon: <CheckCircle size={24} />,
  },
];

// Benefits section data
const benefits = [
  {
    title: "Centralized Wealth Management",
    description: "Eliminate data silos and manage all assets, investments, and operations in one unified platform.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Data-Driven Decision Making",
    description: "Leverage advanced analytics and AI-powered insights to make more informed investment decisions.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Operational Efficiency",
    description: "Streamline workflows, automate routine tasks, and reduce manual work to focus on high-value activities.",
    icon: <BarChart3 size={24} />,
  },
  {
    title: "Enterprise-Grade Security",
    description: "Safeguard sensitive financial data with bank-level security, encryption, and access controls.",
    icon: <Shield size={24} />,
  },
];

// Testimonials data
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

export default LandingPage;
