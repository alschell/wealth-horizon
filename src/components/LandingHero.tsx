
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 lg:px-12">
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-gray-50 to-gray-100/30 opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="flex flex-col items-center text-center max-w-5xl">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-gray-50 border border-gray-100">
          <span className="text-sm text-gray-700 font-medium">Family Office Management</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-black">
          All your bankable wealth made actionable 
          <span className="block md:inline"> over one platform</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mb-10">
          Across all your banks, brokers and custodians - our comprehensive platform helps family offices manage their wealth efficiently.
        </p>
        
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
