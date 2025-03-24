
import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const FormLayout: React.FC<FormLayoutProps> = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className={cn("p-6 md:p-8 shadow-sm", className)}>
        {children}
      </Card>
    </motion.div>
  );
};

export default FormLayout;
