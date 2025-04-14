
import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

// Define the Language type to match the context
type Language = 'en' | 'zh' | 'es' | 'ar' | 'pt' | 'ru' | 'ja' | 'fr' | 'de' | 'ko';

const LanguageSelector: React.FC = () => {
  let { language, setLanguage } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Chinese', localName: '中文' },
    { code: 'es', name: 'Spanish', localName: 'Español' },
    { code: 'ar', name: 'Arabic', localName: 'العربية' },
    { code: 'pt', name: 'Portuguese', localName: 'Português' },
    { code: 'ru', name: 'Russian', localName: 'Русский' },
    { code: 'ja', name: 'Japanese', localName: '日本語' },
    { code: 'fr', name: 'French', localName: 'Français' },
    { code: 'de', name: 'German', localName: 'Deutsch' },
    { code: 'ko', name: 'Korean', localName: '한국어' }
  ];

  useEffect(() => {
    console.log(`LanguageSelector mounted with language: ${language}`);
    
    // Set the document language when component mounts
    document.documentElement.lang = language;
  }, [language]);

  const handleLanguageSelect = (langCode: string) => {
    console.log(`Language selected: ${langCode}, current language: ${language}`);
    
    // Only set language if the code is a valid Language type
    if (languages.find(lang => lang.code === langCode)) {
      // Add more logging to debug the language change flow
      console.log(`Changing language from ${language} to ${langCode}`);
      
      // Store the selection in localStorage for persistence
      localStorage.setItem('preferredLanguage', langCode);
      
      // Set the language in the context
      setLanguage(langCode as Language);
      
      // Dispatch a custom event that all components can listen for
      const event = new CustomEvent('languageChange', { 
        detail: { language: langCode, previousLanguage: language }
      });
      window.dispatchEvent(event);
      
      // ALWAYS reload the page when language changes for complete refresh
      // This is the most reliable way to ensure all components are re-rendered with the new language
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    
    setOpen(false); // Explicitly close the dropdown
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 focus:ring-2 focus:ring-black focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={language === lang.code ? "bg-gray-100" : ""}
          >
            {lang.name} {lang.code !== 'en' && `(${lang.localName})`}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
