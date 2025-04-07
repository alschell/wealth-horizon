
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  LayoutDashboard,
  Mail,
  Phone,
  TrendingUp,
  PieChart,
  Shield,
  Fingerprint,
  Link,
  Laptop,
  Lock
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn
} from "@/components/ui/animation";

const LandingPage = () => {
  const navigate = useNavigate();
  
  // Handle newsletter signup
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    
    if (emailInput.value) {
      toast.success(`Thank you for subscribing with ${emailInput.value}!`);
      emailInput.value = "";
    }
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent. We'll be in touch shortly!");
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Platform features
  const platformFeatures = [
    {
      title: "Portfolio Aggregation",
      description: "Consolidate all your assets across custodians into a single, actionable view",
      icon: <PieChart className="h-6 w-6 text-black" />
    },
    {
      title: "Advanced Analytics",
      description: "Make data-driven decisions with our powerful analytics and reporting",
      icon: <TrendingUp className="h-6 w-6 text-black" />
    },
    {
      title: "Seamless Integration",
      description: "Automate data flows from all your financial institutions without manual work",
      icon: <Link className="h-6 w-6 text-black" />
    },
    {
      title: "Robust Compliance",
      description: "Automated monitoring of regulatory requirements and internal mandates",
      icon: <Shield className="h-6 w-6 text-black" />
    }
  ];
  
  // Enterprise solutions
  const enterpriseSolutions = [
    {
      title: "Consolidated Wealth View",
      description: "View your complete financial picture across all accounts, assets, and institutions",
      icon: <Laptop className="h-6 w-6 text-gray-900" />
    },
    {
      title: "Multi-Bank Integration",
      description: "Connect all your financial accounts from different institutions into a single dashboard",
      icon: <Globe className="h-6 w-6 text-gray-900" />
    },
    {
      title: "Secure Authentication",
      description: "Enterprise-grade security with multi-factor authentication for all sensitive operations",
      icon: <Fingerprint className="h-6 w-6 text-gray-900" />
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive reports automatically for internal reviews and stakeholders",
      icon: <LayoutDashboard className="h-6 w-6 text-gray-900" />
    },
    {
      title: "Bank-Level Security",
      description: "Your data is protected with the same security standards used by leading financial institutions",
      icon: <Lock className="h-6 w-6 text-gray-900" />
    },
    {
      title: "Real-Time Insights",
      description: "Get intelligent recommendations and insights about your financial portfolio",
      icon: <TrendingUp className="h-6 w-6 text-gray-900" />
    }
  ];

  return (
    <Layout withPadding={false} className="bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-black">W</span>
              <span className="ml-0.5 text-gray-600">Pro</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => scrollToSection('platform-section')}
            >
              Platform
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => scrollToSection('solutions-section')}
            >
              Solutions
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-black transition-colors"
              onClick={() => scrollToSection('contact-section')}
            >
              Contact
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="rounded-lg border-gray-300 text-gray-700 hover:text-black hover:bg-gray-100"
            >
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/onboarding')}
              className="rounded-lg bg-black text-white hover:bg-gray-800"
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
          className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)"
          }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5"></div>
          
          <div className="max-w-7xl w-full px-6 md:px-12 py-20 md:py-32 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <StaggerContainer className="md:w-1/2 space-y-8">
                <StaggerItem>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
                    <span className="text-sm text-gray-700 font-medium">Wealth Management Platform</span>
                  </div>
                </StaggerItem>
                
                <StaggerItem>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-black">
                    All your bankable wealth made actionable over one platform
                  </h1>
                </StaggerItem>
                
                <StaggerItem>
                  <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                    Across all your banks, brokers and custodians. A comprehensive platform that helps you manage your wealth efficiently.
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="h-12 px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all bg-black text-white hover:bg-gray-800"
                      onClick={() => navigate('/onboarding')}
                    >
                      Start Onboarding
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-12 px-8 rounded-xl font-medium border border-gray-300 text-gray-800 hover:bg-gray-100"
                      onClick={() => navigate('/dashboard')}
                    >
                      Go to Dashboard
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
              
              <ScaleIn className="md:w-1/2 relative" duration={0.7}>
                <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-20"></div>
                  <img 
                    src="/assets/dashboard-preview.png" 
                    alt="WPro Dashboard" 
                    className="w-full aspect-video object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/assets/dashboard-fallback.png";
                    }}
                  />
                </div>
                
                {/* Floating elements */}
                <FadeIn 
                  className="absolute -top-3 -right-3 bg-white border border-gray-200 rounded-lg p-3 shadow-lg"
                  delay={0.8}
                >
                  <TrendingUp className="h-5 w-5 text-gray-800" />
                </FadeIn>
                
                <FadeIn 
                  className="absolute -bottom-3 -left-3 bg-white border border-gray-200 rounded-lg p-3 shadow-lg"
                  delay={1}
                >
                  <LayoutDashboard className="h-5 w-5 text-gray-800" />
                </FadeIn>
              </ScaleIn>
            </div>
          </div>
        </section>
        
        {/* Platform Section */}
        <section 
          id="platform-section"
          className="py-20 md:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn 
              className="text-center mb-16"
              direction="up"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">One Platform to Replace Them All</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Eliminate the need for multiple systems with our comprehensive wealth management platform designed for institutional investors.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 space-y-6">
                {platformFeatures.map((feature, index) => (
                  <FadeIn
                    key={feature.title}
                    className="p-6 rounded-xl cursor-pointer transition-all duration-300 hover:bg-gray-50 border border-gray-200"
                    direction="left"
                    delay={index * 0.1}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {feature.icon}
                      <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </FadeIn>
                ))}
              </div>
              
              <ScaleIn 
                className="md:col-span-8 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xl"
                duration={0.6}
              >
                <div className="relative aspect-video w-full">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white p-8">
                    <img 
                      src="/assets/dashboard-preview.png" 
                      alt="Platform Preview" 
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/dashboard-fallback.png";
                      }}
                    />
                  </div>
                </div>
              </ScaleIn>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Real-time Performance",
                  description: "Monitor your complete portfolio performance with real-time analytics and insights."
                },
                {
                  icon: Globe,
                  title: "Multi-Bank Access",
                  description: "Collaborate seamlessly with team members and advisors with customizable permissions."
                },
                {
                  icon: Shield,
                  title: "Global Coverage",
                  description: "Manage assets across multiple jurisdictions, currencies, and asset classes."
                }
              ].map((feature, index) => (
                <FadeIn 
                  key={feature.title}
                  className="bg-gray-100 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  direction="up"
                  delay={index * 0.1 + 0.2}
                >
                  <div className="p-3 rounded-full bg-gray-200 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black">{feature.title}</h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section 
          id="solutions-section"
          className="py-20 md:py-32 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FadeIn 
              className="text-center mb-16"
              direction="up"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">Enterprise-Grade Solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Our platform delivers comprehensive solutions tailored for family offices and institutional investors.
              </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enterpriseSolutions.map((solution, index) => (
                <FadeIn 
                  key={solution.title} 
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  direction="up"
                  delay={index * 0.1}
                >
                  <div className="p-3 rounded-full bg-gray-100 w-fit mb-4">
                    {solution.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black">{solution.title}</h3>
                  <p className="text-gray-600">
                    {solution.description}
                  </p>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <FadeIn direction="up" duration={0.5}>
                <Button 
                  className="h-12 px-6 rounded-lg bg-black text-white hover:bg-gray-800 transition-all text-base"
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
              <FadeIn 
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                direction="left"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Contact Us</h2>
                <p className="text-gray-600 mb-8">
                  Get in touch with our team to learn more about how we can help your family office or institution.
                </p>
                
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm text-gray-600">Email</label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      className="bg-white border-gray-300 text-gray-900" 
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm text-gray-600">Company</label>
                    <Input 
                      id="company" 
                      name="company"
                      className="bg-white border-gray-300 text-gray-900" 
                      placeholder="Company Ltd."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-600">Message</label>
                    <Textarea 
                      id="message" 
                      name="message"
                      className="bg-white border-gray-300 text-gray-900 min-h-[100px]" 
                      placeholder="Tell us about your needs..."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    Send Message
                  </Button>
                </form>
              </FadeIn>
              
              {/* Newsletter & Contact Info */}
              <div className="space-y-12">
                <FadeIn 
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                  direction="right"
                  delay={0.1}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-600 mb-8">
                    Stay updated with the latest in wealth management technology and industry insights.
                  </p>
                  
                  <form onSubmit={handleNewsletterSignup} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="newsletterEmail" className="text-sm text-gray-600">Email Address</label>
                      <Input 
                        id="newsletterEmail" 
                        name="email"
                        type="email" 
                        className="bg-white border-gray-300 text-gray-900" 
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      Subscribe
                    </Button>
                  </form>
                </FadeIn>
                
                <FadeIn 
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg"
                  direction="right"
                  delay={0.2}
                >
                  <h2 className="text-2xl font-bold mb-6 text-black">Get in Touch</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Mail className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-black">Email Us</h3>
                        <p className="text-gray-600 mt-1">info@wpro.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Phone className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-black">Call Us</h3>
                        <p className="text-gray-600 mt-1">+1 (555) 000-0000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Globe className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-black">Visit Us</h3>
                        <p className="text-gray-600 mt-1">
                          123 Finance Street<br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
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
                <span className="text-black">W</span>
                <span className="ml-0.5 text-gray-600">Pro</span>
              </div>
              <p className="text-gray-600 text-sm max-w-xs">
                Advanced wealth management platform for high-net-worth individuals, family offices, and institutional investors.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-black">Platform</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Features</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Security</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Integrations</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">APIs</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-black">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">About</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Careers</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Blog</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-black">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">Cookie Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-600 hover:text-black">GDPR Compliance</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} WPro. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
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
