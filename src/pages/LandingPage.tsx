
import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Globe,
  LayoutDashboard,
  Mail,
  Phone,
  TrendingUp,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const LandingPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<number>(0);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const platformRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const platformInView = useInView(platformRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.2 });
  
  // Platform features tab data
  const platformTabs = [
    {
      id: 0,
      title: "Portfolio Aggregation",
      description: "Consolidate all your assets across custodians into a single, actionable view",
      animation: "/animations/portfolio-anim.svg"
    },
    {
      id: 1,
      title: "Sophisticated Analytics",
      description: "Make data-driven decisions with our powerful analytics and reporting",
      animation: "/animations/analytics-anim.svg"
    },
    {
      id: 2,
      title: "Seamless Integration",
      description: "Automate data flows from all your institutions without manual work",
      animation: "/animations/integration-anim.svg"
    },
    {
      id: 3,
      title: "Robust Compliance",
      description: "Automated monitoring of regulatory requirements and internal mandates",
      animation: "/animations/compliance-anim.svg"
    }
  ];
  
  // Auto-advance platform tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % platformTabs.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [platformTabs.length]);
  
  // Handle newsletter signup
  const [email, setEmail] = useState("");
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your newsletter service
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <Layout withPadding={false} className="bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-white">W</span>
              <span className="ml-0.5 text-gray-400">Pro</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="link" 
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => {
                document.getElementById('platform-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Platform
            </Button>
            <Button 
              variant="link" 
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Solutions
            </Button>
            <Button 
              variant="link" 
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => {
                document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="rounded-lg border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/onboarding')}
              className="rounded-lg bg-white text-black hover:bg-gray-200"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section 
          id="hero-section" 
          ref={heroRef}
          className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #000000 0%, #0A0A0A 100%)"
          }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
          
          <div 
            className="max-w-7xl w-full px-6 md:px-12 py-20 md:py-32 relative z-10"
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out"
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="md:w-1/2 space-y-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 border border-gray-800">
                  <span className="text-sm text-gray-300 font-medium">For Family Offices & Institutional Investors</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  All your{" "}
                  <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    wealth
                  </span>{" "}
                  on a single actionable platform
                </h1>
                
                <p className="text-lg text-gray-400 max-w-lg">
                  View, analyze, and act on your bankable wealth across all your banks, brokers, and custodians in one powerful platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="h-12 px-6 rounded-lg bg-white text-black hover:bg-gray-200 transition-all text-base"
                    onClick={() => navigate('/onboarding')}
                  >
                    Start Onboarding
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-12 px-6 rounded-lg border-gray-700 text-white hover:bg-gray-800 text-base"
                    onClick={() => navigate('/dashboard')}
                  >
                    See Demo
                  </Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Secure & Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">Bank-level Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400 text-sm">SOC 2 Compliant</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                  <img 
                    src="/dashboard-preview.png" 
                    alt="WPro Dashboard" 
                    className="w-full aspect-video object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-3 -right-3 bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-lg">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-gray-900 border border-gray-800 rounded-lg p-3 shadow-lg">
                  <LayoutDashboard className="h-5 w-5 text-blue-400" />
                </div>
              </div>
            </div>
            
            {/* Scroll down indicator */}
            <div className="hidden md:flex flex-col items-center absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
              onClick={() => {
                document.getElementById('platform-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-gray-500 text-sm mb-2">Learn More</span>
              <ChevronDown className="h-5 w-5 text-gray-500 animate-bounce" />
            </div>
          </div>
        </section>
        
        {/* Platform Section - "One platform to replace them all" */}
        <section 
          id="platform-section" 
          ref={platformRef}
          className="py-20 md:py-32 bg-gray-950"
        >
          <div 
            className="max-w-7xl mx-auto px-6 md:px-12"
            style={{
              opacity: platformInView ? 1 : 0,
              transform: platformInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              transitionDelay: "0.2s"
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">One Platform to Replace Them All</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Eliminate the need for multiple systems with our comprehensive wealth management platform designed for institutional investors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 space-y-6">
                {platformTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gray-900 border border-gray-800 shadow-lg"
                        : "hover:bg-gray-900/50"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <h3 className="text-xl font-semibold mb-2">{tab.title}</h3>
                    <p className="text-gray-400">{tab.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="md:col-span-8 bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <div className="relative aspect-video w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* This would be replaced with actual animations */}
                      <img
                        src={platformTabs[activeTab].animation || "/dashboard-preview.png"}
                        alt={platformTabs[activeTab].title}
                        className="w-full h-full object-contain p-8"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="p-3 rounded-full bg-gray-800 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Performance</h3>
                <p className="text-gray-400">
                  Monitor your complete portfolio performance with real-time analytics and insights.
                </p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="p-3 rounded-full bg-gray-800 w-fit mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Multi-User Access</h3>
                <p className="text-gray-400">
                  Collaborate seamlessly with team members and advisors with customizable permissions.
                </p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="p-3 rounded-full bg-gray-800 w-fit mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
                <p className="text-gray-400">
                  Manage assets across multiple jurisdictions, currencies, and asset classes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          id="features-section" 
          ref={featuresRef}
          className="py-20 md:py-32 bg-black"
        >
          <div 
            className="max-w-7xl mx-auto px-6 md:px-12"
            style={{
              opacity: featuresInView ? 1 : 0,
              transform: featuresInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              transitionDelay: "0.2s"
            }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Solutions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Our platform delivers comprehensive solutions tailored for family offices and institutional investors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature cards */}
              {[
                {
                  title: "Portfolio Analytics",
                  description: "Advanced analytics and visualization of your entire wealth across all accounts and assets",
                  icon: <TrendingUp className="h-6 w-6 text-white" />
                },
                {
                  title: "Multi-Bank Integration",
                  description: "Seamlessly connect all your financial accounts from different institutions into a single dashboard",
                  icon: <Globe className="h-6 w-6 text-white" />
                },
                {
                  title: "Secure KYC Process",
                  description: "Complete your KYC verification with bank-level security and encryption for all sensitive data",
                  icon: <CheckCircle className="h-6 w-6 text-white" />
                },
                {
                  title: "Automated Reporting",
                  description: "Generate comprehensive reports automatically for internal reviews and external stakeholders",
                  icon: <LayoutDashboard className="h-6 w-6 text-white" />
                },
                {
                  title: "Document Management",
                  description: "Store and organize all your financial documents in one secure location with easy access",
                  icon: <CheckCircle className="h-6 w-6 text-white" />
                },
                {
                  title: "AI-Powered Insights",
                  description: "Get intelligent recommendations and insights about your financial portfolio powered by AI",
                  icon: <TrendingUp className="h-6 w-6 text-white" />
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:scale-105 transition-all duration-300"
                  style={{
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="p-3 rounded-full bg-gray-800 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                className="h-12 px-6 rounded-lg bg-white text-black hover:bg-gray-200 transition-all text-base"
                onClick={() => navigate('/onboarding')}
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form & Newsletter Section */}
        <section 
          id="contact-section" 
          ref={contactRef}
          className="py-20 md:py-32 bg-gray-950"
        >
          <div 
            className="max-w-7xl mx-auto px-6 md:px-12"
            style={{
              opacity: contactInView ? 1 : 0,
              transform: contactInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              transitionDelay: "0.2s"
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-gray-400 mb-8">
                  Get in touch with our team to learn more about how we can help your family office or institution.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm text-gray-400">First Name</label>
                      <Input 
                        id="firstName" 
                        className="bg-gray-800 border-gray-700 text-white" 
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm text-gray-400">Last Name</label>
                      <Input 
                        id="lastName" 
                        className="bg-gray-800 border-gray-700 text-white" 
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="bg-gray-800 border-gray-700 text-white" 
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-gray-400">Company</label>
                    <Input 
                      id="company" 
                      className="bg-gray-800 border-gray-700 text-white" 
                      placeholder="Company Ltd."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                    <Textarea 
                      id="message" 
                      className="bg-gray-800 border-gray-700 text-white min-h-[100px]" 
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-gray-200"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Newsletter & Contact Info */}
              <div className="space-y-12">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-400 mb-8">
                    Stay updated with the latest in wealth management technology and industry insights.
                  </p>
                  
                  <form onSubmit={handleNewsletterSignup} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="newsletterEmail" className="text-sm text-gray-400">Email Address</label>
                      <Input 
                        id="newsletterEmail" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white" 
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-white text-black hover:bg-gray-200"
                    >
                      Subscribe
                    </Button>
                  </form>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-800">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Email Us</h3>
                        <p className="text-gray-400 mt-1">info@wpro.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-800">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Call Us</h3>
                        <p className="text-gray-400 mt-1">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-800">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Visit Us</h3>
                        <p className="text-gray-400 mt-1">
                          123 Finance Street<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="text-xl font-bold tracking-tight mb-4">
                <span className="text-white">W</span>
                <span className="ml-0.5 text-gray-400">Pro</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Advanced wealth management platform for high-net-worth individuals, family offices, and institutional investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-white">Platform</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Features</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Security</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Integrations</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">APIs</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-white">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">About</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Careers</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-400 hover:text-white">GDPR Compliance</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} WPro. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;
