
# Component Architecture Guidelines

## Structure
- Each component should be in its own file
- Components should be small and focused (preferably under 150 lines)
- Use composition over inheritance
- Keep business logic separate from presentation

## Component Organization
1. **Container Components**
   - Handle data fetching and state management
   - Pass data and callbacks to presentational components
   - Should contain minimal JSX

2. **Presentational Components**
   - Focus on how things look
   - Receive data and callbacks via props
   - Should be stateless when possible
   - Can contain UI state (e.g., isOpen, isHovered)

## File Structure
```
components/
  ├── feature/
  │   ├── components/    # Presentational components
  │   ├── containers/    # Container components
  │   ├── hooks/        # Feature-specific hooks
  │   └── types.ts      # Type definitions
  └── common/           # Shared components
```

## Best Practices
1. Use TypeScript interfaces for props
2. Implement error boundaries where appropriate
3. Use proper prop naming conventions
4. Keep components pure when possible
5. Use composition patterns

## Component Conventions
1. Use named exports for components
2. Include prop interface definitions
3. Use proper TypeScript typing
4. Include JSDoc comments for complex components
5. Implement proper error handling

## Example Usage
```tsx
import { ComponentWrapper, ComponentContainer } from '@/components/common';

const ExampleComponent = () => {
  return (
    <ComponentContainer>
      <ComponentWrapper variant="bordered" spacing="medium">
        {/* Component content */}
      </ComponentWrapper>
    </ComponentContainer>
  );
};
```
