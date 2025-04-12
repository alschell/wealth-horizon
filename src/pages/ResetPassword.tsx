
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn, ScaleIn } from "@/components/ui/animation";
import { toast } from "sonner";
import PlatformAnimation from "@/components/animations/login/PlatformAnimation";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading state and API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent to your email");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-stretch">
      {/* Left column with form */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 py-12 md:px-16 relative z-10">
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
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Reset your password</h2>
              <p className="text-gray-600">Enter your email address and we'll send you instructions to reset your password.</p>
            </div>

            {!isSubmitted ? (
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
                        required
                      />
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
                      Sending...
                    </div>
                  ) : (
                    <>
                      Reset Password <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-5 text-green-800">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Mail className="h-5 w-5 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-green-900">Check your inbox</h3>
                  </div>
                  <p className="text-sm">We've sent instructions to <strong>{email}</strong>. Please check your email inbox and follow the link to reset your password.</p>
                </div>
                
                <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder or <button onClick={handleSubmit} className="text-indigo-600 hover:text-indigo-500 font-medium">click here to resend</button>.</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Link 
                to="/login" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right column with animation */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 relative overflow-hidden">
        <PlatformAnimation />
      </div>
    </div>
  );
};

export default ResetPassword;
