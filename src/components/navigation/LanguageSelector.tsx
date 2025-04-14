
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, getLocalizedText } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', localName: 'English' },
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
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
