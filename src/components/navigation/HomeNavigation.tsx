
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useLocalizedText } from '@/components/ui/localized-text';

const HomeNavigation: React.FC = () => {
  // Safe access to translations
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLocalizedText();
  
  // Add scroll event listener to detect when to show shadow
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className={`fixed w-full bg-white z-50 transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">
                <span className="text-indigo-600">Wealth</span>Horizon
              </span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/#why" className="text-gray-500 hover:text-gray-900">
                {t('whyWealthHorizon', 'Why WH')}
              </Link>
              <Link to="/#features" className="text-gray-500 hover:text-gray-900">
                {t('features', 'Features')}
              </Link>
              <Link to="/#benefits" className="text-gray-500 hover:text-gray-900">
                {t('benefits', 'Benefits')}
              </Link>
              <Link to="/#testimonials" className="text-gray-500 hover:text-gray-900">
                {t('testimonials', 'Testimonials')}
              </Link>
            </nav>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="sm">
                {t('login', 'Login')}
              </Button>
            </Link>
            <Button 
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              {t('contactUs', 'Contact Us')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeNavigation;
