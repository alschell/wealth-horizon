
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeProps {
  children: React.ReactNode;
  className?: string;
  block?: boolean;
  language?: string;
}

export function Code({
  children,
  className,
  block = false,
  language,
  ...props
}: CodeProps) {
  const codeClasses = cn(
    'px-1.5 py-0.5 font-mono text-sm rounded bg-muted/80',
    !block && 'inline-block',
    block && 'block p-4 overflow-x-auto',
    className
  );

  if (block) {
    return (
      <pre className={cn('rounded bg-muted/80 p-4', className)}>
        <code className="language-typescript" data-language={language || 'typescript'} {...props}>
          {children}
        </code>
      </pre>
    );
  }

  return (
    <code className={codeClasses} {...props}>
      {children}
    </code>
  );
}

export default Code;
