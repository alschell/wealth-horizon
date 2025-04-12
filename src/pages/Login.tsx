
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/animation";
import { toast } from "sonner";
import LoginAnimation from "@/components/animations/login/LoginAnimation";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading state
    setTimeout(() => {
      toast.success("Login successful");
      navigate("/dashboard");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left column with form - equal width (1/2) */}
      <div className="w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:px-16 relative z-10">
        <div className="max-w-md mx-auto w-full">
          <FadeIn>
            {/* Logo and heading */}
            <div className="mb-10">
              <Link to="/" className="inline-block mb-8">
                <h1 className="text-3xl font-bold">
                  <span className="text-indigo-600">Wealth</span>
                  <span className="text-gray-900">Horizon</span>
                </h1>
              </Link>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h2>
              <p className="text-gray-600">Sign in to your personalized dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-2.5">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-base">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="pl-11 h-14 text-base border-gray-200 bg-gray-50/50 focus-visible:border-indigo-500 focus-visible:ring-indigo-200"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700 font-medium text-base">
                      Password
                    </Label>
                    <Link to="/reset-password" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-11 pr-11 h-14 text-base border-gray-200 bg-gray-50/50 focus-visible:border-indigo-500 focus-visible:ring-indigo-200"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-1.5 text-green-500" />
                    <span>Secure Login</span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/onboarding" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>

      {/* Right column with animation - equal width (1/2) */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
        <LoginAnimation />
      </div>
    </div>
  );
};

export default Login;
