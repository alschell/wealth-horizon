
import React from 'react';
import { 
  Select as BaseSelect, 
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
  SelectGroup as BaseSelectGroup,
  SelectLabel as BaseSelectLabel,
  SelectSeparator as BaseSelectSeparator,
  SelectScrollUpButton as BaseSelectScrollUpButton,
  SelectScrollDownButton as BaseSelectScrollDownButton,
} from './select';

import {
  Tabs as BaseTabs,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
  TabsContent as BaseTabsContent
} from './tabs';

import {
  ScrollArea as BaseScrollArea
} from './scroll-area';

import {
  Popover as BasePopover,
  PopoverContent as BasePopoverContent,
  PopoverTrigger as BasePopoverTrigger
} from './popover';

// Enhanced Select components that support children prop
export const Select = BaseSelect;

export const SelectTrigger: React.FC<React.ComponentProps<typeof BaseSelectTrigger> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseSelectTrigger {...props}>{children}</BaseSelectTrigger>
);

export const SelectValue = BaseSelectValue;

export const SelectContent: React.FC<React.ComponentProps<typeof BaseSelectContent> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseSelectContent {...props}>{children}</BaseSelectContent>
);

export const SelectItem: React.FC<React.ComponentProps<typeof BaseSelectItem> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseSelectItem {...props}>{children}</BaseSelectItem>
);

export const SelectGroup = BaseSelectGroup;
export const SelectLabel = BaseSelectLabel;
export const SelectSeparator = BaseSelectSeparator;
export const SelectScrollUpButton = BaseSelectScrollUpButton;
export const SelectScrollDownButton = BaseSelectScrollDownButton;

// Enhanced Tabs components that support children prop
export const Tabs: React.FC<React.ComponentProps<typeof BaseTabs> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseTabs {...props}>{children}</BaseTabs>
);

export const TabsList: React.FC<React.ComponentProps<typeof BaseTabsList> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseTabsList {...props}>{children}</BaseTabsList>
);

export const TabsTrigger: React.FC<React.ComponentProps<typeof BaseTabsTrigger> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseTabsTrigger {...props}>{children}</BaseTabsTrigger>
);

export const TabsContent: React.FC<React.ComponentProps<typeof BaseTabsContent> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseTabsContent {...props}>{children}</BaseTabsContent>
);

// Enhanced ScrollArea component that supports children prop
export const ScrollArea: React.FC<React.ComponentProps<typeof BaseScrollArea> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BaseScrollArea {...props}>{children}</BaseScrollArea>
);

// Enhanced Popover components that support children prop
export const Popover = BasePopover;

export const PopoverTrigger: React.FC<React.ComponentProps<typeof BasePopoverTrigger> & {
  children: React.ReactNode
}> = ({ children, ...props }) => (
  <BasePopoverTrigger {...props}>{children}</BasePopoverTrigger>
);

export const PopoverContent = BasePopoverContent;
