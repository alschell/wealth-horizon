
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScaleIn } from '@/components/ui/animation/index';

const LandingHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_bottom,#ffffff_0%,#f5f5f5_100%)] opacity-70"></div>
      
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
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-700 font-medium">
                Family Office Management
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              All your bankable wealth made actionable over one platform
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Across all your banks, brokers and custodians - our comprehensive platform helps family offices manage their wealth efficiently.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                className="h-12 px-8 rounded-xl font-medium shadow-lg bg-black text-white hover:bg-gray-800"
                onClick={() => navigate('/onboarding')}
              >
                Start Onboarding
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="h-12 px-8 rounded-xl font-medium border border-gray-300"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 text-sm">Secure Authentication</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 text-sm">Bank-level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600 text-sm">Multi-Bank Integration</span>
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
                alt="WPro Dashboard" 
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
  );
};

export default LandingHero;
