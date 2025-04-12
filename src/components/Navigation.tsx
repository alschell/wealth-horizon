
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NotificationsPopover from '@/components/dashboard/notifications/NotificationsPopover';
import { toast } from 'sonner';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  const isOnboarding = location.pathname.includes('/onboarding');
  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isDashboard = !isOnboarding && !isHomePage && !isLoginPage;

  // Add scroll listener to detect when user scrolls for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Don't show navigation on onboarding or login pages
  if (isOnboarding || isLoginPage) {
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

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      navigate(`/#${id}`);
    }
  };

  // Landing page navigation
  if (isHomePage) {
    return (
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-md border-b border-gray-100' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl flex items-center">
              <span className="text-indigo-600">Wealth</span>
              <span className="text-gray-900">Horizon</span>
            </Link>
            
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white" 
              asChild
            >
              <Link to="/onboarding">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>
    );
  }

  // Dashboard navigation (original)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between mx-auto max-w-7xl px-6">
        <div className="flex items-center">
          <Link to="/dashboard" className="font-bold text-xl flex items-center">
            <span className="text-indigo-500">Wealth</span>
            <span>Horizon</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {isDashboard && (
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
