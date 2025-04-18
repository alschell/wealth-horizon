
import React, { useState } from 'react';
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
import { toast } from 'sonner';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === currentLanguage) {
      setIsOpen(false);
      return; // Don't change if it's the same language
    }

    console.log(`Starting language change to ${langCode} from ${currentLanguage}`);
    setIsChanging(true);
    
    try {
      // Store language in localStorage before the async operation
      localStorage.setItem('preferredLanguage', langCode);
      
      await setLanguage(langCode as any);
      console.log(`Language successfully changed to ${langCode}`);
      
      toast.success(`Language changed to ${langCode}`);
    } catch (error) {
      console.error("Failed to change language:", error);
      toast.error("Failed to change language");
      // Remove from localStorage if it failed
      localStorage.removeItem('preferredLanguage');
    } finally {
      setIsChanging(false);
      setIsOpen(false);
    }
  };

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

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
            disabled={isChanging}
          >
            <span>{language.name} ({language.nativeName})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
