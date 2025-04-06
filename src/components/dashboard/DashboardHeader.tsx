
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, LogOut, Settings } from "lucide-react";
import Logo from "./Logo";
import NotificationsPopover from "./notifications";
import HeaderAction from "./HeaderAction";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DashboardHeader = () => {
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full md:w-[200px] bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm 
                focus-visible:outline-none focus-visible:ring-0 focus-visible:border-black focus-visible:border-2"
              />
            </div>
            <NotificationsPopover />
            <HeaderAction 
              icon={Settings} 
              label="Settings" 
              to="/settings" 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-black" 
              onClick={() => setLogoutConfirmOpen(true)}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <AlertDialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out of your Wealth Pro account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardHeader;
