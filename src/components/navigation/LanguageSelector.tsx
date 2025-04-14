
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

// Define the Language type to match the context
type Language = 'en' | 'zh' | 'es' | 'ar' | 'pt' | 'ru' | 'ja' | 'fr' | 'de' | 'ko';

const LanguageSelector: React.FC = () => {
  let { language, setLanguage } = { language: 'en' as Language, setLanguage: (lang: Language) => {} };
  
  try {
    const languageContext = useLanguage();
    language = languageContext.language;
    setLanguage = languageContext.setLanguage;
  } catch (error) {
    console.error('Language context not available in LanguageSelector:', error);
  }
  
  const [open, setOpen] = React.useState(false);

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
    
    // Force rerender when component mounts to ensure language is properly applied
    const timer = setTimeout(() => {
      document.documentElement.lang = language;
    }, 100);
    
    return () => clearTimeout(timer);
  }, [language]);

  const handleLanguageSelect = (langCode: string) => {
    console.log(`Language selected: ${langCode}, current language: ${language}`);
    
    // Only set language if the code is a valid Language type
    if (languages.find(lang => lang.code === langCode)) {
      setLanguage(langCode as Language);
      
      // Force a page reload to ensure all components pick up the language change
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
          className="h-9 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
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
