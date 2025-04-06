
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 lg:px-12">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50/80 to-blue-100/30 opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="flex flex-col items-center text-center max-w-5xl">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm text-blue-700 font-medium">Family Office Management</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Streamlined Wealth Management 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 block md:inline"> for Family Offices</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
          Our comprehensive platform helps family offices manage their wealth, streamline KYC processes, 
          and seamlessly integrate with financial data aggregators.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
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
  );
};

export default LandingHero;
