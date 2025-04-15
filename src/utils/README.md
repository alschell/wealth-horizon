
# Icon Utility

This utility provides a consistent way to use icons throughout the application.

## How to Use

### Basic Usage

Import the `Icon` component from the utils and use it with the icon name:

```tsx
import { Icon } from "@/utils/icons";

// In your component
return (
  <div>
    <Icon name="ArrowLeft" className="h-4 w-4" />
    Back to Dashboard
  </div>
);
```

### Direct Import

For better performance and type safety, you can import icons directly:

```tsx
import { ArrowLeft, Check, User } from "@/utils/icons";

// In your component
return (
  <div>
    <ArrowLeft className="h-4 w-4" />
    <Check className="h-4 w-4 text-green-500" />
    <User size={24} />
  </div>
);
```

### Updating PageHeaderCard and Other Components

Components like PageHeaderCard now accept icon names as strings:

```tsx
<PageHeaderCard
  icon="History" 
  title="Activity History"
  description="View your activity history"
  iconColor="text-gray-700"
  iconBgColor="bg-gray-100"
/>
```

## Adding New Icons

If a new icon is needed, add it to the re-exports in `src/utils/icons.tsx`.

## Troubleshooting

If you encounter an icon that doesn't exist in the lucide-react library, the `Icon` component will display a fallback. Check the console for warnings about missing icons.
