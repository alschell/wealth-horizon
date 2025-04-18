
import React, { useState, useCallback } from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation, LANGUAGES } from '@/context/TranslationContext';
import TranslatedText from './translated-text';

export function LanguageSelector() {
  const { currentLanguage, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Safely ensure LANGUAGES is an array
  const availableLanguages = Array.isArray(LANGUAGES) ? LANGUAGES : [];

  const handleLanguageChange = useCallback(async (langCode: string) => {
    if (isChanging || isLoading) return;
    
    if (langCode === currentLanguage) {
      return;
    }
    
    setIsChanging(true);
    try {
      console.log(`Starting language change to ${langCode}`);
      
      // Store the selected language in localStorage before reload
      localStorage.setItem('preferredLanguage', langCode);
      
      // Force a complete page reload to reset all components and translation states
      window.location.reload();
    } catch (error) {
      console.error("Failed to change language:", error);
      setIsChanging(false);
    }
  }, [currentLanguage, isChanging, isLoading]);

  // Safely find the current language
  const currentLang = availableLanguages.length > 0
    ? availableLanguages.find(lang => lang.code === currentLanguage) 
    : undefined;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          title={`Language: ${currentLang?.name || 'English'}`}
          disabled={isChanging}
        >
          <Globe className={`h-5 w-5 ${isChanging ? 'animate-spin text-indigo-600' : ''}`} />
          <span className="sr-only">
            Change Language
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        {availableLanguages.length > 0 ? availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${currentLanguage === language.code ? 'bg-slate-100 font-medium' : ''}`}
            disabled={isChanging}
          >
            <span>{language.name} ({language.nativeName})</span>
          </DropdownMenuItem>
        )) : (
          <DropdownMenuItem disabled>
            <span>No languages available</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
