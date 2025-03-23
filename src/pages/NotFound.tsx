
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileWarning, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white p-4">
      <div className="text-center max-w-md w-full animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-blue-50">
            <FileWarning className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-gray-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            className="rounded-xl"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
