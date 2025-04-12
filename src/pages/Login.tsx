
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import { toast } from "sonner";

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
      {/* Left column with form */}
      <div className="w-full md:w-[500px] bg-white flex flex-col justify-center px-8 py-12 md:px-16 relative z-10">
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
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                      Forgot password?
                    </a>
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

      {/* Right column with background image/gradient */}
      <div className="hidden md:block flex-1 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-600/40 to-purple-800/40"></div>
        
        <div className="absolute top-0 right-0 w-3/4 h-full">
          <svg className="h-full w-full text-white/5" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-20 h-full flex flex-col items-center justify-center p-12">
          <ScaleIn delay={0.3}>
            <div className="max-w-md text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Wealth Management Simplified</h2>
              <p className="text-white/90 text-lg mb-10 leading-relaxed">
                Access your personalized dashboard to manage investments, track performance, and discover new opportunities.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transition-all hover:bg-white/15">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-lg">Bank-Level Security</h3>
                    </div>
                  </div>
                  <p className="text-white/80 text-left pl-14 text-sm">
                    State-of-the-art encryption and advanced security protocols to keep your data safe
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 transition-all hover:bg-white/15">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-lg">Personalized Insights</h3>
                    </div>
                  </div>
                  <p className="text-white/80 text-left pl-14 text-sm">
                    Custom financial recommendations tailored to your investment goals and risk profile
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
