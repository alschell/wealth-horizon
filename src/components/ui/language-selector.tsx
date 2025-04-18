
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
  const { currentLanguage, setLanguage, isLoading } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === currentLanguage || isChanging) {
      setIsOpen(false);
      return;
    }
    
    setIsChanging(true);
    setIsOpen(false); // Close dropdown immediately
    
    try {
      await setLanguage(langCode as any);
      const selectedLang = LANGUAGES.find(lang => lang.code === langCode);
      
      if (selectedLang) {
        toast.success(`Language changed to ${selectedLang.name}`, {
          id: 'language-change',
          duration: 2000
        });
      }
    } catch (error) {
      console.error("Failed to change language:", error);
      toast.error("Failed to change language. Please try again.", {
        id: 'language-change-error' 
      });
    } finally {
      // Small delay to prevent rapid switching
      setTimeout(() => {
        setIsChanging(false);
      }, 500);
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
          disabled={isChanging || isLoading}
          className="transition-opacity"
        >
          <Globe className={`h-5 w-5 ${isChanging ? 'animate-spin' : ''}`} />
          <span className="sr-only">Change Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${currentLanguage === language.code ? 'bg-slate-100 font-medium' : ''}`}
            disabled={isChanging || isLoading || currentLanguage === language.code}
          >
            <span>{language.name} ({language.nativeName})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSelector;
