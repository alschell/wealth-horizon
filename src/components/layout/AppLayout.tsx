
import React from 'react';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import AnimatedTransition from '@/components/AnimatedTransition';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Navigation />
      <AnimatedTransition>
        {children}
      </AnimatedTransition>
    </Layout>
  );
};
