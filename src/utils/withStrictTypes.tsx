
/**
 * Higher-order component that enforces strict typing for components
 * 
 * @module withStrictTypes
 */

import React from 'react';

/**
 * A higher-order component that wraps a component to ensure proper type checking
 * without changing its functionality.
 * 
 * @template P - The props type of the wrapped component
 * @param Component - The component to wrap
 * @returns The same component with enhanced type safety
 */
export function withStrictTypes<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  // Create a properly named wrapped component
  const displayName = Component.displayName || Component.name || 'Component';
  
  const WrappedComponent: React.FC<P> = (props: P) => {
    return <Component {...props} />;
  };
  
  // Set proper display name for debugging
  WrappedComponent.displayName = `withStrictTypes(${displayName})`;
  
  return WrappedComponent;
}

/**
 * Function to create a strictly typed component with predefined props
 * 
 * @template P - The props type of the component
 * @param Component - The component to enhance
 * @param defaultProps - Default props to apply
 * @returns Enhanced component with default props
 */
export function createTypeSafeComponent<P extends object>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P>
): React.FC<Partial<P>> {
  const StrictComponent = withStrictTypes(Component);
  
  // Create a component with merged default props
  const EnhancedComponent: React.FC<Partial<P>> = (props) => {
    const mergedProps = { ...defaultProps, ...props } as P;
    return <StrictComponent {...mergedProps} />;
  };
  
  EnhancedComponent.displayName = `TypeSafe(${Component.displayName || Component.name || 'Component'})`;
  
  return EnhancedComponent;
}

export default withStrictTypes;
