
import React from 'react';

/**
 * Higher-order function to enforce stricter component type checking
 * 
 * @param Component - The component to wrap
 * @returns The typed component
 */
export function withStrictTypes<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  const StrictComponent: React.FC<P> = (props) => <Component {...props} />;
  
  // Preserve the display name
  StrictComponent.displayName = `WithStrictTypes(${Component.displayName || Component.name || 'Component'})`;
  
  return StrictComponent;
}

/**
 * Higher-order function to add default props to a component
 * 
 * @param Component - The component to wrap
 * @param defaultProps - Default props object
 * @returns The component with default props
 */
export function withDefaultProps<
  P extends object,
  DP extends Partial<P>
>(
  Component: React.ComponentType<P>,
  defaultProps: DP
): React.FC<Omit<P, keyof DP> & Partial<Pick<P, Extract<keyof P, keyof DP>>>> {
  type ResultProps = Omit<P, keyof DP> & Partial<Pick<P, Extract<keyof P, keyof DP>>>;
  
  const ComponentWithDefaults: React.FC<ResultProps> = (props) => {
    // Use explicit type casting to address the type conversion issue
    const combinedProps = { ...defaultProps, ...props } as unknown as P;
    return <Component {...combinedProps} />;
  };
  
  // Preserve the display name
  ComponentWithDefaults.displayName = `WithDefaultProps(${Component.displayName || Component.name || 'Component'})`;
  
  return ComponentWithDefaults;
}
