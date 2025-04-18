
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useTranslation } from '@/context/TranslationContext';

const HomeNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { translate } = useTranslation();

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  }, [scrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md border-b border-gray-100' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <NavigationBrand />
          <NavigationLinks scrollToSection={scrollToSection} />
        </div>
        <NavigationActions navigate={navigate} scrollToSection={scrollToSection} />
      </nav>
    </header>
  );
};

const NavigationBrand: React.FC = () => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Reliable navigation approach
      window.location.href = '/';
    } catch (error) {
      console.error("Navigation error:", error);
      window.location.reload();
    }
  };

  return (
    <a 
      href="/" 
      className="font-bold text-xl flex items-center"
      onClick={handleLogoClick}
    >
      <span className="text-indigo-600">Wealth</span>
      <span className="text-gray-900">Horizon</span>
    </a>
  );
};

const NavigationLinks: React.FC<{ scrollToSection: (id: string) => void }> = ({ 
  scrollToSection 
}) => {
  // Use plain text instead of TranslatedText to avoid potential errors
  return (
    <div className="flex items-center space-x-8">
      <button 
        onClick={() => scrollToSection('why-wh')} 
        className="text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Why WH
      </button>
      <button 
        onClick={() => scrollToSection('features')} 
        className="text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Features
      </button>
      <button 
        onClick={() => scrollToSection('benefits')} 
        className="text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Benefits
      </button>
      <button 
        onClick={() => scrollToSection('testimonials')} 
        className="text-gray-700 hover:text-indigo-600 transition-colors"
      >
        Testimonials
      </button>
    </div>
  );
};

const NavigationActions: React.FC<{ 
  navigate: (path: string) => void;
  scrollToSection: (id: string) => void;
}> = ({ navigate, scrollToSection }) => {
  // Use plain text instead of TranslatedText to avoid potential errors
  return (
    <div className="flex items-center gap-3">
      <LanguageSelector />
      <Button variant="ghost" onClick={() => navigate('/login')}>
        Log In
      </Button>
      <Button onClick={() => scrollToSection('contact')}>
        Contact Us
      </Button>
    </div>
  );
};

export default HomeNavigation;
