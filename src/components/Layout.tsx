
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/animation';

interface LayoutProps {
  children: ReactNode;
  withPadding?: boolean;
  className?: string;
  withAnimation?: boolean;
  fullHeight?: boolean;
}

const Layout = ({ 
  children, 
  withPadding = true,
  className = '',
  withAnimation = false,
  fullHeight = false,
}: LayoutProps) => {
  const content = (
    <div className={cn(
      'flex flex-col',
      fullHeight && 'min-h-screen',
      withPadding ? 'p-4 md:p-6 lg:p-8' : '',
      className
    )}>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );

  if (withAnimation) {
    return (
      <FadeIn>
        {content}
      </FadeIn>
    );
  }

  return content;
};

export default Layout;
