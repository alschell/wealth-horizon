
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

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (langCode: string) => {
    setIsChanging(true);
    try {
      await setLanguage(langCode as any);
      console.log(`Language changed to ${langCode}`);
    } catch (error) {
      console.error("Failed to change language:", error);
    } finally {
      setIsChanging(false);
      setIsOpen(false);
    }
  };

  const currentLang = LANGUAGES.find(lang => lang.code === currentLanguage);

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
