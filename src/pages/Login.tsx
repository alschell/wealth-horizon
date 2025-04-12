
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/ui/animation";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we're automatically redirecting to dashboard without credentials
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <FadeIn>
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-3xl font-bold">
                  <span className="text-indigo-600">Wealth</span>
                  <span className="text-gray-900">Horizon</span>
                </h1>
              </Link>
              <p className="mt-3 text-gray-600">Log in to access your wealth management dashboard</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="you@example.com" 
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <Button type="submit" className="w-full flex items-center justify-center" size="lg">
                  Log In <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/onboarding" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="p-6 text-center text-gray-500 text-sm">
        <p>© 2025 WealthHorizon. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
