
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingHero = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.4, duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_bottom,#ffffff_0%,#f5f5f5_100%)] opacity-70"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      
      <div className="max-w-7xl w-full px-6 md:px-12 py-12 md:py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-4">
                <span className="text-sm text-gray-700 font-medium">Family Office Management</span>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black"
              variants={itemVariants}
            >
              All your bankable wealth made actionable over one platform
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 max-w-xl"
              variants={itemVariants}
            >
              Across all your banks, brokers and custodians - our comprehensive platform helps family offices manage their wealth efficiently.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Button 
                className="h-12 px-8 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all bg-black text-white hover:bg-gray-800"
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
              variants={itemVariants}
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
          
          <motion.div 
            className="relative"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
