
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <Link 
      to="/"
      className="text-xl font-bold tracking-tight cursor-pointer" 
      onClick={handleLogoClick}
    >
      <span className="text-indigo-400">Wealth</span>
      <span className="ml-0.5">Pro</span>
    </Link>
  );
};

export default Logo;
