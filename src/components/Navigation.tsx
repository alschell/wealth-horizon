
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsPopover from '@/components/dashboard/notifications/NotificationsPopover';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isOnboarding = location.pathname.includes('/onboarding');
  const isDashboard = location.pathname.includes('/dashboard');

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
      <div className="container flex h-16 items-center justify-between px-0">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="text-indigo-500">Wealth</span>
            <span className="ml-1">Horizon</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {!isOnboarding && (
            <>
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
