"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import "react-day-picker/dist/style.css"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full", className)}
      styles={{
        day: {
          borderRadius: '0px',
        },
        daySelected: {
          backgroundColor: '#374151', // dark gray
          color: 'white',
          borderRadius: '0px',
        },
        dayToday: {
          backgroundColor: '#F3F4F6', // light gray
          color: 'black',
        }
      }}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4 w-full",
        caption: "flex items-center justify-between px-2 py-2",
        caption_label: "text-lg font-semibold text-center flex-grow",
        nav: "flex items-center space-x-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
        ),
        nav_button_previous: "mr-auto",
        nav_button_next: "ml-auto",
        table: "w-full border-collapse",
        head_row: "flex border-b",
        head_cell: "text-gray-500 w-10 text-center font-normal text-[0.8rem] py-2",
        row: "flex w-full border-b",
        cell: "text-center text-sm p-0",
        day: cn(
          "h-10 w-10 p-0 font-normal hover:bg-gray-100 text-center",
          "focus:bg-gray-200 focus:outline-none"
        ),
        ...classNames,
      }}
      components={{
        Caption: ({ label }) => (
          <div className="flex items-center justify-between w-full">
            <button 
              type="button" 
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-lg font-semibold">{label}</span>
            <button 
              type="button" 
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
              )}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ),
        IconLeft: () => null,
        IconRight: () => null,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }