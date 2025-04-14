
# Icon System Documentation

## Overview

Our application uses a centralized icon system to ensure consistency and maintainability. All icons are imported and re-exported from a single file: `src/utils/icons.ts`.

## Why We Use a Centralized Icon System

1. **Consistency**: Ensures all icons are imported from the same source
2. **Maintainability**: Makes it easier to update or replace the icon library in the future
3. **Type Safety**: Provides proper TypeScript typing for all icons
4. **Performance**: Simplifies tree-shaking and bundling

## How to Use Icons

### Basic Usage

Always import icons from `@/utils/icons` rather than directly from `lucide-react`:

```tsx
// Import from our centralized icon system
import { ArrowRight, Check, User } from '@/utils/icons';

// Use in your component
const MyComponent = () => {
  return (
    <div>
      <ArrowRight className="h-4 w-4" />
      <Check className="h-4 w-4 text-green-500" />
      <User className="h-4 w-4 text-blue-500" />
    </div>
  );
};
```

### Dynamic Icon Rendering

If you need to render icons dynamically based on a string name, use the `getIconByName` helper function:

```tsx
import { getIconByName } from '@/utils/icons';

const DynamicIcon = ({ iconName }) => {
  const IconComponent = getIconByName(iconName);
  return <IconComponent className="h-4 w-4" />;
};
```

### Fixing Icon Import Errors

If you encounter TypeScript errors related to icon imports, run the following script:

```bash
node scripts/fix-icon-imports.js
```

This script will automatically update icon imports across the codebase.

## Icon Properties

All icons accept the following properties:

- `size`: Number (default: 24) - Size of the icon in pixels
- `color`: String (default: 'currentColor') - Color of the icon
- `strokeWidth`: Number (default: 2) - Width of the stroke
- Standard HTML/SVG attributes such as `className`, `style`, etc.

Example:

```tsx
<ArrowRight 
  size={16}
  color="red"
  strokeWidth={1.5}
  className="my-custom-class"
/>
```

## Adding New Icons

If you need to add new icons to the system, update the `src/utils/icons.ts` file by adding them to the export list.
