
# Icons Usage Guide

## Importing Icons

All icons should be imported from `@/utils/icons` rather than directly from `lucide-react`.

```tsx
// INCORRECT - Don't do this:
import { ArrowRight } from 'lucide-react';

// CORRECT - Do this instead:
import { ArrowRight } from '@/utils/icons';
```

This ensures consistent usage across the application and makes it easier to update icons in the future.

## Available Icons

All icons from `lucide-react` are available through the `@/utils/icons` module.

## Helper Function

If you need to dynamically render an icon by name, use the `getIconByName` function:

```tsx
import { getIconByName } from '@/utils/icons';

// Later in your component:
const IconComponent = getIconByName('ArrowRight');
return <IconComponent />;
```

## How To Fix Icon Import Errors

If you're seeing errors like `Cannot find module 'lucide-react'`, you need to update your imports:

1. Remove all direct imports from 'lucide-react'
2. Replace them with imports from '@/utils/icons'
3. Run the application to ensure the fixes worked

Example:
```tsx
// Before:
import { ArrowUp, ChevronDown } from 'lucide-react';

// After:
import { ArrowUp, ChevronDown } from '@/utils/icons';
```
