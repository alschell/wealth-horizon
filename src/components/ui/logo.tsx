
import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="font-bold text-xl flex items-center">
      <span className="text-indigo-500">Wealth</span>
      <span>Horizon</span>
    </Link>
  );
};

export default Logo;
