
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationsPopover from '@/components/dashboard/notifications/NotificationsPopover';
import { TranslatedText } from '@/components/ui/translated-text';
import { toast } from 'sonner';
import { useTranslation } from '@/context/TranslationContext';
import Logo from '@/components/common/Logo';

const DashboardNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useTranslation();
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search...");

  useEffect(() => {
    const updatePlaceholder = async () => {
      const translated = await translate("Search...");
      setSearchPlaceholder(translated);
    };
    
    updatePlaceholder();
  }, [translate, currentLanguage]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    toast.success("You have been successfully logged out");
    
    navigate('/logout');
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-6 sticky top-0">
        <Logo variant="dark" />
        
        <div className="flex items-center gap-3">
          <div className="relative w-64 mr-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder={searchPlaceholder} 
              className="pl-10 bg-white" 
              aria-label={searchPlaceholder}
            />
          </div>
          <NotificationsPopover />
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only"><TranslatedText>Settings</TranslatedText></span>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only"><TranslatedText>Logout</TranslatedText></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavigation;
