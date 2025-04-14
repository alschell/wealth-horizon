
import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

interface StepProps {
  number: number;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
}

export function Step({ number, title, children, className }: StepProps) {
  return (
    <div className={cn("relative pl-10", className)}>
      <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-indigo-300 bg-indigo-50 text-sm font-medium text-indigo-700">
        {number}
      </div>
      <h3 className="text-base font-medium text-gray-900">{title}</h3>
      {children}
    </div>
  );
}
