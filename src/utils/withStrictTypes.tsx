
import React from 'react';

/**
 * A higher-order component that enforces strict typing for components.
 * This is useful for components where we want to ensure that all required props are passed.
 */
export function withStrictTypes<P>(Component: React.ComponentType<P>): React.FC<P> {
  const StrictComponent: React.FC<P> = (props) => {
    return <Component {...props} />;
  };

  // Preserve the original component's name and defaultProps
  StrictComponent.displayName = `withStrictTypes(${
    Component.displayName || Component.name || 'Component'
  })`;
  
  if (Component.defaultProps) {
    StrictComponent.defaultProps = { ...Component.defaultProps };
  }

  return StrictComponent;
}
