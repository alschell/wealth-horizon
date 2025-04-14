
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import { useLocalizedText } from '@/components/ui/localized-text';

const HomeNavigation: React.FC = () => {
  const { t } = useLocalizedText();
  
  return (
    <header className="fixed w-full bg-white z-50 shadow-sm">
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
              <Link to="/#features" className="text-gray-500 hover:text-gray-900">
                {t('features')}
              </Link>
              <Link to="/#benefits" className="text-gray-500 hover:text-gray-900">
                {t('benefits')}
              </Link>
              <Link to="/#testimonials" className="text-gray-500 hover:text-gray-900">
                {t('testimonials')}
              </Link>
              <Link to="/#contact" className="text-gray-500 hover:text-gray-900">
                {t('contact')}
              </Link>
            </nav>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="outline" size="sm">
                {t('login')}
              </Button>
            </Link>
            <Link to="/#contact" className="hidden md:block">
              <Button size="sm">{t('contactUs')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeNavigation;
