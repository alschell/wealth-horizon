
# Dependency Issue Fix Guide

## Problem
The application has multiple errors related to missing dependencies:
1. `lucide-react` package is missing, causing TypeScript errors in many files
2. `vite` command is not found, preventing the app from running

## Solution
Since we can't modify package.json directly, we've taken a different approach:

1. We've installed the required dependencies using runtime commands:
   - `lucide-react@latest`
   - `vite@latest`

2. We've created a central icons utility at `src/utils/icons.ts` that:
   - Re-exports all Lucide icons
   - Provides proper TypeScript types
   - Includes a helper function to get icons by name

## How to Fix All Files
To fix the remaining files with the same error, update their imports:

Change:
```typescript
import { IconName } from 'lucide-react';
```

To:
```typescript
import { IconName } from '@/utils/icons';
```

For example, if you have:
```typescript
import { Calendar, Clock, User } from 'lucide-react';
```

Update it to:
```typescript
import { Calendar, Clock, User } from '@/utils/icons';
```

**Important Note**: Some icon names might be different in the lucide-react package. For instance, use `CheckCircle2` instead of `CheckCircle`. The icons utility also provides compatibility exports when needed.

## Fixing Files Systematically
You can fix the remaining files systematically by:

1. Search for all files with the import pattern: `import { ... } from 'lucide-react'`
2. Replace with the new import pattern: `import { ... } from '@/utils/icons'`
3. Check for any icon name differences (like CheckCircle vs CheckCircle2)

## Running the Application
After fixing the imports, you should be able to run the application with:
```
npm run dev
```

## Files Already Fixed
We've already fixed several files as examples:
- src/components/OnboardingHeader.tsx
- src/components/activity/ActivityHeader.tsx
- src/components/advice/components/OverviewCards.tsx
- src/components/advice/components/QuickActions.tsx
- src/components/advice/sections/assets/TransferActions.tsx
- src/components/ai-assistant/messages/ChatInputForm.tsx
- src/components/onboarding/address/AddressFormHeader.tsx
- src/components/onboarding/beneficial-owners/FormHeader.tsx
- src/components/advice/components/AdviceHeader.tsx
- src/components/advice/tabs/ActiveMandatesTab.tsx
- src/components/advice/NewAdviceInterface.tsx
- src/components/advice/components/StepProgress.tsx
- src/components/advice/tabs/BenchmarkingTab.tsx
- src/components/advice/tabs/PendingMandatesTab.tsx
- src/components/advice/sections/mandate/MandateTypeSelector.tsx
