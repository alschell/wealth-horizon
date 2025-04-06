
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Add proper import for motion
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  LayoutDashboard,
  Mail,
  Phone,
  TrendingUp,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  ScaleIn 
} from "@/components/ui/animation";
import { toast } from "sonner";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state when component mounts
    setIsLoaded(true);
    
    // Cleanup tab interval on unmount
    const interval = setInterval(() => {
      setActiveTab(prev => (prev + 1) % platformTabs.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/assets/dashboard-fallback.png";
  };

  // Platform features tab data
  const platformTabs = [
    {
      id: 0,
      title: "Portfolio Aggregation",
      description: "Consolidate all your assets across custodians into a single, actionable view"
    },
    {
      id: 1,
      title: "Sophisticated Analytics",
      description: "Make data-driven decisions with our powerful analytics and reporting"
    },
    {
      id: 2,
      title: "Seamless Integration",
      description: "Automate data flows from all your institutions without manual work"
    },
    {
      id: 3,
      title: "Robust Compliance",
      description: "Automated monitoring of regulatory requirements and internal mandates"
    }
  ];
  
  // Handle newsletter signup
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout withPadding={false} className="bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-gray-900">W</span>
              <span className="ml-0.5 text-gray-600">Pro</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => scrollToSection('platform-section')}
            >
              Platform
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => scrollToSection('features-section')}
            >
              Solutions
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => scrollToSection('contact-section')}
            >
              Contact
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="rounded-lg border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/onboarding')}
              className="rounded-lg bg-gray-900 text-white hover:bg-gray-800"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section - Updated with animation components */}
        <section 
          id="hero-section"
          className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #F9FAFC 0%, #F3F4F6 100%)"
          }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
          
          <div className="max-w-7xl w-full px-6 md:px-12 py-20 md:py-32 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <StaggerContainer 
                className="md:w-1/2 space-y-8"
                delayChildren={0.1}
                staggerChildren={0.1}
              >
                <StaggerItem>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                    <span className="text-sm text-gray-700 font-medium">For Family Offices & Institutional Investors</span>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    All your{" "}
                    <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      wealth
                    </span>{" "}
                    on a single actionable platform
                  </h1>
                </StaggerItem>
                
                <StaggerItem>
                  <p className="text-lg text-gray-600 max-w-lg">
                    View, analyze, and act on your bankable wealth across all your banks, brokers, and custodians in one powerful platform.
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="h-12 px-6 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all text-base"
                      onClick={() => navigate('/onboarding')}
                    >
                      Start Onboarding
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-12 px-6 rounded-lg border-gray-300 text-gray-900 hover:bg-gray-100 text-base"
                      onClick={() => navigate('/dashboard')}
                    >
                      See Demo
                    </Button>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="flex flex-col md:flex-row gap-6 pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-600 text-sm">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-600 text-sm">Bank-level Security</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-600 text-sm">SOC 2 Compliant</span>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
              
              <ScaleIn 
                className="md:w-1/2 relative"
                delay={0.3}
                duration={0.6}
              >
                <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
                  <img 
                    src="/assets/dashboard-preview.png" 
                    alt="WPro Dashboard" 
                    className="w-full aspect-video object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                </div>
                
                {/* Floating elements */}
                <FadeIn 
                  className="absolute -top-3 -right-3 bg-white border border-gray-200 rounded-lg p-3 shadow-lg"
                  delay={0.8}
                  duration={0.4}
                  direction="down"
                >
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </FadeIn>
                
                <FadeIn 
                  className="absolute -bottom-3 -left-3 bg-white border border-gray-200 rounded-lg p-3 shadow-lg"
                  delay={1}
                  duration={0.4}
                  direction="up"
                >
                  <LayoutDashboard className="h-5 w-5 text-blue-600" />
                </FadeIn>
              </ScaleIn>
            </div>
          </div>
        </section>
        
        {/* Platform Section - Updated with animations */}
        <section 
          id="platform-section"
          className="py-20 md:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">One Platform to Replace Them All</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Eliminate the need for multiple systems with our comprehensive wealth management platform designed for institutional investors.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 space-y-6">
                {platformTabs.map((tab, index) => (
                  <FadeIn
                    key={tab.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gray-100 border border-gray-200 shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    direction="left"
                    delay={index * 0.1}
                  >
                    <h3 className="text-xl font-semibold mb-2">{tab.title}</h3>
                    <p className="text-gray-600">{tab.description}</p>
                  </FadeIn>
                ))}
              </div>
              
              <div className="md:col-span-8 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
                <div className="relative aspect-video w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Display the active tab content */}
                      <ScaleIn
                        key={activeTab}
                      >
                        <h3 className="text-2xl font-semibold text-gray-600">
                          {platformTabs[activeTab].title}
                        </h3>
                      </ScaleIn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Real-time Performance",
                  description: "Monitor your complete portfolio performance with real-time analytics and insights."
                },
                {
                  icon: Users,
                  title: "Multi-User Access",
                  description: "Collaborate seamlessly with team members and advisors with customizable permissions."
                },
                {
                  icon: Globe,
                  title: "Global Coverage",
                  description: "Manage assets across multiple jurisdictions, currencies, and asset classes."
                }
              ].map((feature, index) => (
                <FadeIn 
                  key={index}
                  className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  direction="up"
                  delay={index * 0.1 + 0.2}
                >
                  <div className="p-3 rounded-full bg-gray-200 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Updated with animations */}
        <section 
          id="features-section"
          className="py-20 md:py-32 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Enterprise-Grade Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Our platform delivers comprehensive solutions tailored for family offices and institutional investors.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature cards */}
              <StaggerContainer delayChildren={0.1} staggerChildren={0.1}>
                {[
                  {
                    title: "Portfolio Analytics",
                    description: "Advanced analytics and visualization of your entire wealth across all accounts and assets",
                    icon: <TrendingUp className="h-6 w-6 text-gray-900" />
                  },
                  {
                    title: "Multi-Bank Integration",
                    description: "Seamlessly connect all your financial accounts from different institutions into a single dashboard",
                    icon: <Globe className="h-6 w-6 text-gray-900" />
                  },
                  {
                    title: "Secure KYC Process",
                    description: "Complete your KYC verification with bank-level security and encryption for all sensitive data",
                    icon: <CheckCircle className="h-6 w-6 text-gray-900" />
                  },
                  {
                    title: "Automated Reporting",
                    description: "Generate comprehensive reports automatically for internal reviews and external stakeholders",
                    icon: <LayoutDashboard className="h-6 w-6 text-gray-900" />
                  },
                  {
                    title: "Document Management",
                    description: "Store and organize all your financial documents in one secure location with easy access",
                    icon: <CheckCircle className="h-6 w-6 text-gray-900" />
                  },
                  {
                    title: "AI-Powered Insights",
                    description: "Get intelligent recommendations and insights about your financial portfolio powered by AI",
                    icon: <TrendingUp className="h-6 w-6 text-gray-900" />
                  }
                ].map((feature, index) => (
                  <StaggerItem 
                    key={index} 
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 transition-all duration-300"
                  >
                    <div className="p-3 rounded-full bg-gray-100 w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
            
            <div className="mt-16 text-center">
              <FadeIn direction="up">
                <Button 
                  className="h-12 px-6 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-all text-base"
                  onClick={() => navigate('/onboarding')}
                >
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Contact Form & Newsletter Section */}
        <section 
          id="contact-section"
          className="py-20 md:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div 
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with our team to learn more about how we can help your family office or institution.
                </p>
                
                <form className="space-y-6" onSubmit={(e) => { 
                  e.preventDefault();
                  toast.success("Your message has been sent. We'll be in touch shortly!");
                }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
                      <Input 
                        id="firstName" 
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
                      <Input 
                        id="lastName" 
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      className="bg-white border-gray-300 text-gray-900" 
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-gray-600">Company</label>
                    <Input 
                      id="company" 
                      className="bg-white border-gray-300 text-gray-900" 
                      placeholder="Company Ltd."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-600">Message</label>
                    <Textarea 
                      id="message" 
                      className="bg-white border-gray-300 text-gray-900 min-h-[100px]" 
                      placeholder="Tell us about your needs..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Send Message
                  </Button>
                </form>
              </motion.div>
              
              {/* Newsletter & Contact Info */}
              <div className="space-y-12">
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-600 mb-8">
                    Stay updated with the latest in wealth management technology and industry insights.
                  </p>
                  
                  <form onSubmit={handleNewsletterSignup} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="newsletterEmail" className="text-sm text-gray-600">Email Address</label>
                      <Input 
                        id="newsletterEmail" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Subscribe
                    </Button>
                  </form>
                </motion.div>
                
                <motion.div 
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Mail className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Email Us</h3>
                        <p className="text-gray-600 mt-1">info@wpro.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Phone className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Call Us</h3>
                        <p className="text-gray-600 mt-1">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Globe className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">Visit Us</h3>
                        <p className="text-gray-600 mt-1">
                          123 Finance Street<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="text-xl font-bold tracking-tight mb-4">
                <span className="text-gray-900">W</span>
                <span className="ml-0.5 text-gray-600">Pro</span>
              </div>
              <p className="text-gray-600 text-sm max-w-xs">
                Advanced wealth management platform for high-net-worth individuals, family offices, and institutional investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Platform</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Features</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Security</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Integrations</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">APIs</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">About</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Careers</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-gray-900">GDPR Compliance</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} WPro. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
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
