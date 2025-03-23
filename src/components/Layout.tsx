
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  withPadding?: boolean;
  className?: string;
}

const Layout = ({ children, withPadding = true, className = '' }: LayoutProps) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <main className={`flex-grow ${withPadding ? 'p-4 md:p-6 lg:p-8' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
