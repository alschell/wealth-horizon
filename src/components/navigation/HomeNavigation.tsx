import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { TranslatedText } from '@/components/ui/translated-text';

const HomeNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

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
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="text-indigo-600">Wealth</span>
            <span className="text-gray-900">Horizon</span>
          </Link>
          
          <div className="hidden md:flex items-center ml-10 space-x-8">
            <button 
              onClick={() => scrollToSection('why-wh')} 
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <TranslatedText>Benefits</TranslatedText>
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <TranslatedText>Features</TranslatedText>
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <TranslatedText>Testimonials</TranslatedText>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Button variant="ghost" onClick={() => navigate('/login')}>
            <TranslatedText>Log In</TranslatedText>
          </Button>
          <Button onClick={() => scrollToSection('contact')}>
            <TranslatedText>Contact Us</TranslatedText>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default HomeNavigation;
