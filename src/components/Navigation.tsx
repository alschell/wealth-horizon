
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { BellIcon, Settings, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  const isOnboarding = location.pathname.includes('/onboarding');
  const isDashboard = location.pathname.includes('/dashboard');

  // Don't show navigation on onboarding pages
  if (isOnboarding) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl flex items-center">
            <span className="text-indigo-500">Wealth</span>
            <span className="ml-1">Horizon</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/dashboard">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/dashboard') && "bg-accent text-accent-foreground"
                  )}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/analyze-wealth">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/analyze-wealth') && "bg-accent text-accent-foreground"
                  )}>
                    Analyze
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/trading">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/trading') && "bg-accent text-accent-foreground"
                  )}>
                    Trade
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/advice">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/advice') && "bg-accent text-accent-foreground"
                  )}>
                    Advice
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/market-data">
                  <NavigationMenuLink className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/market-data') && "bg-accent text-accent-foreground"
                  )}>
                    Market Data
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          {!isOnboarding && (
            <>
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              {!isDashboard && (
                <Button asChild className="ml-2 hidden md:inline-flex">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
