
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

interface HeaderActionProps {
  icon: LucideIcon;
  label: string;
  to: string;
}

const HeaderAction = ({ icon: Icon, label, to }: HeaderActionProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="text-black" asChild>
            <Link to={to}>
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p><TranslatedText>{label}</TranslatedText></p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HeaderAction;
