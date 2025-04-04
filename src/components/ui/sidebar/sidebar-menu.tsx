
import * as React from "react"
import { cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn(
      "flex min-w-0 flex-col gap-1 py-0.5 text-sidebar-foreground",
      className
    )}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonStyles = cva(
  [
    "inline-flex h-9 w-full items-center justify-start gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium text-sidebar-foreground outline-none ring-sidebar-ring transition-colors focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:text-sidebar-foreground [&>svg]:size-5 [&>svg]:shrink-0",
    "group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:min-w-0 group-data-[collapsible=icon]:min-h-0 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:rounded-full group-data-[collapsible=icon]:[&>span]:hidden",
  ],
  {
    variants: {
      isActive: {
        true: "bg-sidebar-accent text-sidebar-accent-foreground data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent",
        false: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
)

export const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string
  }
>(({ asChild = false, isActive, tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            data-sidebar="menu-button"
            data-active={isActive}
            className={cn(sidebarMenuButtonStyles({ isActive, className }))}
            {...props}
          />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={20}
          className="group-data-[collapsible=icon]:block hidden"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-active={isActive}
      className={cn(sidebarMenuButtonStyles({ isActive, className }))}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
