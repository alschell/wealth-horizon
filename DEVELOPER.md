
# Developer Documentation

## 1. Project Overview

This application is a comprehensive wealth management platform designed to provide users with powerful tools for financial management, portfolio analysis, and investment tracking. The platform features dashboard views, risk assessments, compliance monitoring, wealth analysis, and more.

## 2. Technology Stack

### Core Technologies
- **React 18**: Frontend library for building the user interface
- **TypeScript**: For type-safe JavaScript development
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling

### Key Libraries
- **React Router Dom**: For application routing and navigation
- **Framer Motion**: For animations and transitions
- **Tanstack React Query**: For server state management and data fetching
- **Shadcn/ui**: Component library built on Radix UI primitives
- **Lucide React**: Icon library
- **Recharts**: For data visualization and charting
- **React Hook Form**: For form handling
- **Zod**: For schema validation
- **Sonner**: For toast notifications

## 3. Project Structure

The project follows a feature-based organization structure:

```
src/
├── components/          # UI components organized by feature
│   ├── advice/          # Advice-related components
│   ├── animations/      # Animation components
│   ├── compliance/      # Compliance monitoring components
│   ├── dashboard/       # Dashboard components
│   ├── onboarding/      # Onboarding flow components
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── wealth-analysis/ # Wealth analysis components
│   └── ...
├── context/             # React context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components that use feature components
├── services/            # API client and services
└── utils/               # Utility functions and constants
```

## 4. Design Patterns and Architecture

### Component Architecture
The application uses a component-based architecture with several key patterns:

1. **Feature-based Organization**: Components are organized by feature rather than type
2. **Container/Presentation Pattern**: Many features separate container components (with logic) from presentation components (UI only)
3. **Compound Components**: For complex UI elements with related sub-components

### State Management
- **Local State**: React's `useState` for component-specific state
- **Context API**: For sharing state across component trees
- **React Query**: For server state management and data fetching

### Custom Hooks
The application leverages custom hooks to encapsulate and reuse logic:
- `useApiQuery`: Wrapper around React Query for API calls
- `useIsMobile`: For responsive design adjustments
- `useNotifications`: For managing toast notifications
- Various feature-specific hooks (e.g., `useDashboardCustomize`, `useComplianceData`)

### Animation Patterns
Animations are implemented using Framer Motion with consistent patterns:
- Staggered animations for lists of items
- Fade-in/slide animations for page transitions
- Subtle hover effects for interactive elements

## 5. Key Features and Implementation

### Dashboard
The dashboard provides an overview of financial data with customizable sections:
- **Dashboard Layout**: `DashboardLayout.tsx` provides the page structure
- **Dashboard Content**: `DashboardContent.tsx` renders the content sections
- **Customization**: Users can customize which sections appear using `DashboardCustomizeDialog.tsx`

### Wealth Analysis
The wealth analysis section provides detailed portfolio analysis:
- **Risk Assessment**: Analyzes portfolio risk with multiple visualization tabs
- **Performance Analysis**: Charts and metrics for portfolio performance
- **Asset Allocation**: Visual breakdown of portfolio allocation

### Animations
The platform uses sophisticated animations to enhance user experience:
- **Dashboard Animation**: Animated dashboard elements in `animations/dashboard/`
- **Platform Overview Animation**: Animated platform overview in `animations/platform-overview/`
- **Animation Components**: Reusable animation components in `ui/animation/`

### Compliance Monitoring
Compliance monitoring features help track regulatory requirements:
- **Filings**: Track upcoming regulatory filings
- **Changes**: Monitor regulatory changes
- **Calendar**: Calendar view of compliance events

## 6. Data Flow

### API Integration
- **API Client**: `apiClient` in `services/api-client.ts` provides standardized methods for API interactions
- **React Query**: Used for data fetching, caching, and synchronization
- **Data Types**: TypeScript interfaces define expected data structures

### Form Handling
- **React Hook Form**: Used for form state management and validation
- **Zod Schema**: Defines validation rules for form inputs
- **Form Submissions**: Typically handled by custom hooks that encapsulate form logic

## 7. UI Component Library

The application uses shadcn/ui, which provides a set of accessible, customizable components:
- **Button**: Various button styles for different actions
- **Card**: Container components for content sections
- **Dialog**: Modal dialogs for interactive forms
- **Tabs**: Tabbed interfaces for organizing content
- **Toast**: Notification system for user feedback

## 8. Styling Approach

The application uses Tailwind CSS with several key concepts:
- **Utility Classes**: Direct application of utility classes for styling
- **Component Classes**: Consistent class patterns for common UI elements
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark/Light Mode**: Support for theme switching

## 9. Code Conventions

### TypeScript
- Strong typing for props, state, and functions
- Interface definitions for complex data structures
- Type guards for runtime type checking when necessary

### Component Structure
- Functional components with React hooks
- Props destructuring for clarity
- Type definitions for props and state
- Props typing with interfaces for complex components

### Naming Conventions
- **PascalCase**: For component names
- **camelCase**: For variables, functions, and instances
- **kebab-case**: For CSS classes and file names
- **UPPER_SNAKE_CASE**: For constants

## 10. Adding New Features

When adding new features to the application, follow these guidelines:

1. **Create Component Files**:
   - Place components in the appropriate feature directory
   - Create small, focused components rather than large ones
   - Use index.ts files to export components from directories

2. **State Management**:
   - Use local state for component-specific state
   - Consider React Context for sharing state across components
   - Use React Query for server state

3. **Routing**:
   - Add new routes in App.tsx
   - Create a new page component in the pages directory
   - Link to the new page from relevant parts of the UI

4. **Styling**:
   - Use Tailwind CSS utility classes
   - Follow the existing design patterns
   - Ensure responsive design works on all screen sizes

5. **Animation**:
   - Use Framer Motion for animations
   - Follow existing animation patterns
   - Use the animation components in ui/animation/

## 11. Testing

The application uses Jest and React Testing Library for testing:
- **Unit Tests**: For testing individual components and functions
- **Integration Tests**: For testing component interactions
- **Mock Services**: For testing components that rely on API calls

## 12. Performance Considerations

- **Code Splitting**: The application uses dynamic imports for code splitting
- **Memoization**: React.memo and useMemo are used to prevent unnecessary re-renders
- **Lazy Loading**: Components and images are lazy-loaded when appropriate
- **Animation Performance**: Animations are optimized for performance

## 13. Troubleshooting Common Issues

### Build Errors
- Check for TypeScript errors in the code
- Ensure all dependencies are installed correctly
- Verify that import paths are correct

### Runtime Errors
- Check the browser console for error messages
- Verify that API endpoints are correctly configured
- Ensure that environment variables are set correctly

### UI Issues
- Verify that Tailwind CSS classes are applied correctly
- Check for responsive design issues on different screen sizes
- Ensure that animations are working as expected

## 14. Deployment

The application can be deployed using various methods:
- **Static Hosting**: The built application can be deployed to static hosting services
- **Containerization**: The application can be containerized using Docker
- **CI/CD**: Continuous integration and deployment can be set up using GitHub Actions

## 15. Contributing

When contributing to the application, follow these guidelines:
- Create a new branch for your feature or bugfix
- Follow the code conventions described above
- Write tests for new features
- Submit a pull request for review

## 16. Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/api/motion/)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)
