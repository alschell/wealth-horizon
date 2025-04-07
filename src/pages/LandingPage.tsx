
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, CheckCircle, BarChart3, Globe, ShieldCheck, 
  Briefcase, UsersRound, Zap, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScaleIn, FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animation";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#ffffff_0%,#f7f7ff_100%)] opacity-90"></div>
        
        <div className="max-w-7xl w-full px-6 md:px-12 py-12 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-sm text-indigo-700 font-medium">
                  Institutional-Grade Wealth Management
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Unlock the full potential of your family office
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                The comprehensive platform that streamlines wealth management across all your banks, brokers, and custodians with institutional-grade controls.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button 
                  className="h-12 px-8 rounded-xl font-medium shadow-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  asChild
                >
                  <Link to="/onboarding">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-12 px-8 rounded-xl font-medium border border-gray-300"
                  asChild
                >
                  <Link to="/dashboard">
                    View Demo
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-600 text-sm">Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-600 text-sm">Multi-Bank Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-gray-600 text-sm">Comprehensive Analytics</span>
                </div>
              </motion.div>
            </motion.div>
            
            <ScaleIn
              className="relative"
              delay={0.4}
              scale={0.95}
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
                <img 
                  src="/assets/dashboard-preview.png" 
                  alt="Wealth Horizon Dashboard" 
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/assets/dashboard-fallback.png";
                  }}
                />
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <StaggerContainer className="text-center mb-16">
            <StaggerItem>
              <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                Comprehensive Solution
              </span>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                One Platform To Replace Them All
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Wealth Horizon consolidates your complex financial ecosystem into a single, powerful platform that delivers unprecedented clarity and control.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FadeIn delay={0.1} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Consolidated Reporting</h3>
              <p className="text-gray-600">
                Aggregate all your assets and investments into a unified dashboard with real-time performance metrics and customizable reports.
              </p>
            </FadeIn>

            {/* Feature 2 */}
            <FadeIn delay={0.2} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Jurisdictional View</h3>
              <p className="text-gray-600">
                Manage complex structures across multiple jurisdictions with our intuitive interface designed for global wealth management.
              </p>
            </FadeIn>

            {/* Feature 3 */}
            <FadeIn delay={0.3} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Security</h3>
              <p className="text-gray-600">
                Enterprise-grade security protocols safeguard your sensitive financial data with multi-factor authentication and end-to-end encryption.
              </p>
            </FadeIn>

            {/* Feature 4 */}
            <FadeIn delay={0.4} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trade Execution</h3>
              <p className="text-gray-600">
                Execute trades across multiple accounts and brokers from a single interface with advanced allocation capabilities.
              </p>
            </FadeIn>

            {/* Feature 5 */}
            <FadeIn delay={0.5} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <UsersRound className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Family Governance</h3>
              <p className="text-gray-600">
                Streamline family office operations with customizable permission levels, activity logs, and governance frameworks.
              </p>
            </FadeIn>

            {/* Feature 6 */}
            <FadeIn delay={0.6} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Harness the power of AI to identify investment opportunities, optimize tax strategies, and forecast cash flows.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <StaggerContainer className="text-center mb-16">
            <StaggerItem>
              <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                Trusted By The Best
              </span>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                What Our Clients Say
              </h2>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <ScaleIn delay={0.1} scale={0.96} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  JP
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jonathan Phillips</h4>
                  <p className="text-sm text-gray-600">CIO, Westwood Family Office</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Wealth Horizon has transformed how we manage our multi-jurisdictional assets. The consolidated view and reporting capabilities have saved us countless hours every month."
              </p>
            </ScaleIn>

            {/* Testimonial 2 */}
            <ScaleIn delay={0.2} scale={0.96} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  EL
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Lawson</h4>
                  <p className="text-sm text-gray-600">Director, Legacy Capital Partners</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The compliance monitoring features have been invaluable for our complex regulatory environment. Wealth Horizon provides peace of mind that we're always audit-ready."
              </p>
            </ScaleIn>

            {/* Testimonial 3 */}
            <ScaleIn delay={0.3} scale={0.96} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Rodriguez</h4>
                  <p className="text-sm text-gray-600">Head of Technology, Horizon Investments</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The integration capabilities with our existing systems were seamless. We were up and running within weeks, with full visibility across all our entities and accounts."
              </p>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Integration Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <StaggerContainer className="text-center mb-16">
            <StaggerItem>
              <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
                Seamless Integrations
              </span>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
                Works With Your Existing Providers
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Connect to your banks, custodians, and service providers through our secure API integrations for a truly consolidated view.
              </p>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FadeIn 
                key={i} 
                delay={i * 0.1} 
                className="h-16 w-32 flex items-center justify-center"
              >
                <Building2 className="h-12 w-12 text-gray-400" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <ScaleIn className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Family Office?
            </h2>
            <p className="text-indigo-100 mb-8 text-lg">
              Join the leading family offices and institutional investors who are streamlining their wealth management operations with Wealth Horizon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="h-12 px-8 rounded-xl font-medium shadow-lg bg-white text-indigo-700 hover:bg-gray-100"
                asChild
              >
                <Link to="/onboarding">
                  Get Started
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 px-8 rounded-xl font-medium border border-white text-white hover:bg-indigo-700"
                asChild
              >
                <Link to="/dashboard">
                  Request a Demo
                </Link>
              </Button>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-indigo-400">Wealth</span>
                <span className="ml-1">Horizon</span>
              </h3>
              <p className="text-gray-400 mb-4">
                The comprehensive platform for modern family offices and institutional investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Family Offices</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Institutional Investors</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Private Banks</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Wealth Managers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Press</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Wealth Horizon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
