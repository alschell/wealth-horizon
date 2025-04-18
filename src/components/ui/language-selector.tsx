
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
  const { currentLanguage, setLanguage, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = useCallback(async (langCode: string) => {
    if (isChanging || isLoading) return;
    
    if (langCode === currentLanguage) {
      console.log("Language is already set to:", langCode);
      return;
    }
    
    setIsChanging(true);
    try {
      console.log(`Starting language change to ${langCode}`);
      await setLanguage(langCode as any);
      console.log(`Language changed to ${langCode}`);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setTimeout(() => {
        setIsChanging(false);
        setIsOpen(false);
      }, 500);
    }
  }, [setLanguage, currentLanguage, isChanging, isLoading]);

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          title={`Language: ${currentLang?.name || 'English'}`}
          disabled={isChanging || isLoading}
        >
          <Globe className={`h-5 w-5 ${isChanging || isLoading ? 'animate-spin text-[#4E46DC]' : ''}`} />
          <span className="sr-only">
            <TranslatedText>Change Language</TranslatedText>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${currentLanguage === language.code ? 'bg-slate-100 font-medium' : ''}`}
            disabled={isChanging || isLoading}
          >
            <span>{language.name} ({language.nativeName})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
