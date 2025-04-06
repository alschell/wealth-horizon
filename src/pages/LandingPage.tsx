
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, FileCheck, Share, PieChart, Globe, Smartphone } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout withPadding={false}>
      <header className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-white/80 z-50 border-b border-gray-100">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-1">
            <div className="text-xl font-bold tracking-tight">
              <span className="text-indigo-400">W</span>
              <span className="ml-0.5">Pro</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
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
              Solutions
            </Button>
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
              Contact
            </Button>
          </div>
          <Button 
            onClick={() => navigate('/dashboard')}
            className="rounded-lg"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section with new slogan */}
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 lg:px-12 animate-fade-in">
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50/80 to-blue-100/30 opacity-70"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          
          <div className="flex flex-col items-center text-center max-w-5xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm text-blue-700 font-medium">Wealth Management Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              All your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">bankable wealth</span> made actionable over <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">one platform</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
              across all your banks, brokers and custodians
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button 
                className="h-12 px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate('/onboarding')}
              >
                Start Onboarding
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="h-12 px-8 rounded-xl font-medium border border-gray-200"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-50 border border-blue-100">
              <span className="text-sm text-blue-700 font-medium">Key Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Comprehensive Wealth Management</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers powerful tools to manage your wealth efficiently across all your financial institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Portfolio Analytics</h3>
              <p className="text-gray-600">
                Advanced analytics and visualization of your entire wealth across all your accounts and assets.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Bank Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect all your financial accounts from different institutions into a single dashboard.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure KYC Process</h3>
              <p className="text-gray-600">
                Complete your KYC verification with bank-level security and encryption for all your sensitive data.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aggregator Integration</h3>
              <p className="text-gray-600">
                Connect with your existing financial data aggregators or manually manage your accounts.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '500ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Document Management</h3>
              <p className="text-gray-600">
                Store and organize all your financial documents in one secure location with easy access.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all animate-slide-up" style={{ animationDelay: '600ms' }}>
              <div className="p-3 rounded-full bg-blue-50 w-fit mb-4">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Get intelligent recommendations and insights about your financial portfolio powered by AI.
              </p>
            </div>
          </div>
        </section>
        
        {/* AI Assistant Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200">
                  <span className="text-sm text-indigo-700 font-medium">AI-Powered</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Intelligent Financial Assistant</h2>
                <p className="text-gray-600">
                  Our AI assistant provides personalized insights, answers your financial questions, and helps you make informed decisions based on your complete financial picture.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Natural language queries about your portfolio performance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Proactive alerts on market conditions affecting your assets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Customized investment suggestions based on your goals</span>
                  </li>
                </ul>
                <Button 
                  className="rounded-xl"
                  onClick={() => navigate('/ai-assistant')}
                >
                  Try AI Assistant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">AI</span>
                    </div>
                    <div className="ml-4 bg-gray-100 rounded-2xl rounded-tl-none p-3">
                      <p className="text-sm">How is my portfolio performing compared to last quarter?</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">WP</span>
                    </div>
                    <div className="ml-4 bg-blue-50 rounded-2xl rounded-tl-none p-3">
                      <p className="text-sm">Your portfolio has grown by 4.2% this quarter compared to 3.1% last quarter. Your tech investments are up 7.8%, while your bond holdings have remained stable at 1.2% growth.</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">AI</span>
                    </div>
                    <div className="ml-4 bg-gray-100 rounded-2xl rounded-tl-none p-3">
                      <p className="text-sm">What actions would you recommend for my cash holdings?</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">WP</span>
                    </div>
                    <div className="ml-4 bg-blue-50 rounded-2xl rounded-tl-none p-3">
                      <p className="text-sm">Based on current interest rates and your risk profile, I recommend moving 30% of your cash to short-term treasury bonds which are yielding 4.8% annually with minimal risk.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50/80 to-white/60">
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Optimize Your Wealth Management?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join WPro today and experience a new standard in wealth management across all your financial institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/onboarding')}
                className="rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Start Onboarding
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/dashboard')}
                className="rounded-xl border border-gray-200"
              >
                Explore Dashboard
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold tracking-tight mb-4">
                <span className="text-indigo-400">W</span>
                <span className="ml-0.5">Pro</span>
              </div>
              <p className="text-sm text-gray-500">
                Advanced wealth management platform for high-net-worth individuals and family offices.
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
            © {new Date().getFullYear()} WPro. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default LandingPage;
