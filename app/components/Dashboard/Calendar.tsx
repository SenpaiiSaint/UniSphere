"use client";

import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Sample events data
  const events = [
    { date: new Date(2024, 2, 15), title: "Science Fair", type: "academic" },
    { date: new Date(2024, 2, 18), title: "Parent Meeting", type: "meeting" },
    { date: new Date(2024, 2, 20), title: "Sports Day", type: "sports" },
    { date: new Date(2024, 2, 25), title: "Graduation", type: "ceremony" },
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-600";
      case "meeting":
        return "bg-green-100 text-green-600";
      case "sports":
        return "bg-yellow-100 text-yellow-600";
      case "ceremony":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
            suppressHydrationWarning
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg"
            suppressHydrationWarning
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          return (
            <div
              key={day.toString()}
              className={`p-2 min-h-[80px] border rounded-lg ${
                isToday(day) ? "border-blue-500" : "border-gray-200"
              } ${isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-50"}`}
            >
              <div className="text-sm font-medium mb-1">{format(day, "d")}</div>
              <div className="space-y-1">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`text-xs px-1 py-0.5 rounded ${getEventColor(
                      event.type
                    )} truncate`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-100"></div>
          <span className="text-xs">Academic</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-100"></div>
          <span className="text-xs">Meeting</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
          <span className="text-xs">Sports</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-purple-100"></div>
          <span className="text-xs">Ceremony</span>
        </div>
      </div>
    </div>
  );
};
