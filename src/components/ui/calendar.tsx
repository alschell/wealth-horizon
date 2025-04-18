
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  weekStartsOn = 1, // Default to Monday
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 pointer-events-auto",
        month: "space-y-4 pointer-events-auto",
        caption: "flex justify-center pt-1 relative items-center pointer-events-auto",
        caption_label: "text-sm font-medium pointer-events-auto",
        nav: "space-x-1 flex items-center pointer-events-auto",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto"
        ),
        nav_button_previous: "absolute left-1 pointer-events-auto",
        nav_button_next: "absolute right-1 pointer-events-auto",
        table: "w-full border-collapse space-y-1 pointer-events-auto",
        head_row: "flex pointer-events-auto",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] pointer-events-auto",
        row: "flex w-full mt-2 pointer-events-auto",
        cell: "h-9 w-9 text-center text-sm p-0 relative pointer-events-auto [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 pointer-events-auto"
        ),
        day_range_end: "day-range-end pointer-events-auto",
        day_selected:
          "border-2 border-black bg-transparent text-black hover:bg-transparent hover:text-black focus:bg-transparent focus:text-black pointer-events-auto",
        day_today: "border border-accent bg-transparent text-accent-foreground pointer-events-auto",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-transparent aria-selected:text-muted-foreground aria-selected:opacity-30 pointer-events-auto",
        day_disabled: "text-muted-foreground opacity-50 pointer-events-auto",
        day_range_middle:
          "aria-selected:bg-transparent aria-selected:text-accent-foreground pointer-events-auto",
        day_hidden: "invisible pointer-events-auto",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 pointer-events-auto" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 pointer-events-auto" />,
      }}
      weekStartsOn={weekStartsOn}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
