
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { TranslatedText } from '@/components/ui/translated-text';

const HomeNavigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="font-semibold text-xl flex items-center">
            <span className="text-violet-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => document.getElementById('why-wh')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Why WH
            </button>
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Benefits
            </button>
            <button 
              onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Testimonials
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-gray-900"
          >
            Log In
          </Button>
          <Button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white hover:bg-gray-800"
          >
            Contact Us
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavigation;
