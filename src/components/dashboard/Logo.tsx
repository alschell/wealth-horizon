
import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };
  
  return (
    <div 
      className="text-xl font-bold tracking-tight cursor-pointer" 
      onClick={handleLogoClick}
    >
      <span className="text-indigo-400">Wealth</span>
      <span className="ml-0.5">Pro</span>
    </div>
  );
};

export default Logo;
