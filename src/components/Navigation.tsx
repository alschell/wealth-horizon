
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationsPopover from '@/components/dashboard/notifications/NotificationsPopover';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isOnboarding = location.pathname.includes('/onboarding');
  const isHomePage = location.pathname === '/';

  // Don't show navigation on onboarding pages
  if (isOnboarding) {
    return null;
  }

  const handleLogout = () => {
    // Clear any auth data from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    // Show success toast
    toast.success("You have been successfully logged out");
    
    // Navigate to logout page
    navigate('/logout');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="font-bold text-xl flex items-center">
            <span className="text-indigo-500">Wealth</span>
            <span className="ml-1">Horizon</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {!isOnboarding && !isHomePage && (
            <>
              <div className="relative w-64 mr-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 bg-white" />
              </div>
              <NotificationsPopover />
              <Button 
                variant="ghost" 
                size="icon"
                asChild
              >
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
