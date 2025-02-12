import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function Calendar() {
  const currentDate = new Date();
  const days = Array.from({ length: 35 }, (_, i) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i - currentDate.getDay() + 1
    );
    return date;
  });

  return (
    <Card className="bg-white backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-black" />
            <CardTitle className="text-xl font-semibold tracking-wide">
              {format(currentDate, "MMMM yyyy")}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-3 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-sm font-semibold text-slate-400">
              {day}
            </div>
          ))}
          {days.map((date, i) => {
            const isToday = format(date, "MM-dd") === format(currentDate, "MM-dd");
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
              <div
                key={i}
                className={`p-3 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 
                  ${
                    isToday
                      ? "bg-gradient-to-br from-purple-500 text-white to-indigo-500 shadow-md shadow-purple-600/40 scale-110"
                      : "hover:bg-white/10"
                  } 
                  ${isCurrentMonth ? "" : "text-slate-500"}
                `}
              >
                {format(date, "d")}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
