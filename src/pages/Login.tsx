
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/animation";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      {/* Left column with form */}
      <div className="w-full md:w-[450px] xl:w-[550px] bg-white flex flex-col justify-center px-8 py-8 md:px-12 lg:px-20">
        <div className="max-w-md mx-auto w-full">
          <FadeIn>
            {/* Logo and heading */}
            <div className="mb-8">
              <Link to="/" className="inline-block mb-6">
                <h1 className="text-3xl font-bold">
                  <span className="text-indigo-600">Wealth</span>
                  <span className="text-gray-900">Horizon</span>
                </h1>
              </Link>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input 
                      id="email"
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com" 
                      className="pl-10 h-12 border-gray-200 focus-visible:ring-indigo-600"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-700">
                      Password
                    </Label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-gray-200 focus-visible:ring-indigo-600"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
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
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center text-base"
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

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/onboarding" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>

      {/* Right column with background image/gradient */}
      <div className="hidden md:block flex-1 bg-gradient-to-br from-indigo-600 to-purple-700 relative">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=2070')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-12">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Secure Wealth Management Solutions</h2>
            <p className="text-white/90 text-lg mb-8">
              Access your personalized dashboard to manage your investment portfolio, track performance, and explore new opportunities.
            </p>

            <div className="flex flex-col space-y-4 items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-medium">Bank-Level Security</h3>
                    <p className="text-white/80 text-sm">State-of-the-art encryption and security protocols</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
