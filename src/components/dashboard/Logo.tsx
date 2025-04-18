
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link 
      to="/"
      className="text-xl font-bold tracking-tight cursor-pointer" 
      onClick={() => window.scrollTo(0, 0)}
    >
      <span className="text-indigo-400">Wealth</span>
      <span className="ml-0.5">Pro</span>
    </Link>
  );
};

export default Logo;
