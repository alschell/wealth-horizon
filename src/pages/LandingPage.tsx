
import Layout from "@/components/Layout";
import LandingHero from "@/components/LandingHero";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, FileCheck, Share } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout withPadding={false}>
      <header className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-white/80 z-50 border-b border-gray-100">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <h1 className="text-xl font-bold">Wealth Horizon</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Features
            </Button>
            <Button 
              variant="link" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </Button>
          </div>
          <Button 
            onClick={() => navigate('/onboarding')}
            className="rounded-lg"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="pt-20">
        <LandingHero />
        
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm text-blue-700 font-medium">Key Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Streamlined Wealth Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers a comprehensive suite of tools to help family offices manage their wealth efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure KYC Process</h3>
              <p className="text-gray-600">
                Complete your KYC verification securely and efficiently, with bank-level security and encryption.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aggregator Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect with your existing financial data aggregator or manually submit your accounts.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Document Management</h3>
              <p className="text-gray-600">
                Store and manage all your important financial documents in one secure location.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <Share className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Selective Sharing</h3>
              <p className="text-gray-600">
                Selectively share your KYC information with third parties, maintaining control over your data.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-blue-50/80 to-white/60">
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Wealth Management?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join Wealth Horizon today and experience a new standard in family office management.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/onboarding')}
              className="rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Onboarding
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Wealth Horizon</h3>
              <p className="text-sm text-gray-500">
                Advanced wealth management platform for family offices and high-net-worth individuals.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Features</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Security</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Integrations</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">About</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Careers</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Contact</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-gray-500 hover:text-blue-600">Cookie Policy</Button></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Wealth Horizon. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;
