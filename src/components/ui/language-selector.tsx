
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

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  // Ensure LANGUAGES exists and is an array
  const availableLanguages = Array.isArray(LANGUAGES) ? LANGUAGES : [];

  const handleLanguageChange = useCallback(async (langCode: string) => {
    if (!langCode) {
      console.error("Invalid language code provided");
      return;
    }
    
    if (typeof setLanguage !== 'function') {
      console.error("setLanguage function is not available");
      return;
    }
    
    setIsChanging(true);
    try {
      await setLanguage(langCode as any);
      console.log(`Language changed to ${langCode}`);
      
      // Instead of reloading the page, just close the dropdown
      // window.location.reload();
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
      setIsOpen(false);
    }
  }, [setLanguage]);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0] || { name: 'English', nativeName: 'English' };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          title={`Language: ${currentLang?.name || 'English'}`}
          disabled={isChanging}
        >
          <Globe className={`h-5 w-5 ${isChanging ? 'animate-spin' : ''}`} />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        {availableLanguages && availableLanguages.length > 0 ? (
          availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`cursor-pointer ${currentLanguage === language.code ? 'bg-slate-100 font-medium' : ''}`}
              disabled={isChanging}
            >
              <span>{language.name} ({language.nativeName})</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No languages available</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
