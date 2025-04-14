
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
    { code: 'en', name: getLocalizedText('english') },
    { code: 'zh', name: getLocalizedText('chinese') },
    { code: 'es', name: getLocalizedText('spanish') },
    { code: 'ar', name: getLocalizedText('arabic') }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-1">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline-block">{languages.find(l => l.code === language)?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'zh' | 'es' | 'ar')}
            className={language === lang.code ? "bg-gray-100" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
