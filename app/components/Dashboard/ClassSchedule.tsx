"use client";

import React from "react";
import { Calendar } from "lucide-react";

export const ClassSchedule = () => {
  const schedule = [
    {
      day: "Monday",
      time: "9:00 AM - 10:30 AM",
      course: "CS101 - Introduction to Programming",
      room: "Room 101",
    },
    {
      day: "Monday",
      time: "11:00 AM - 12:30 PM",
      course: "CS201 - Data Structures",
      room: "Room 203",
    },
    {
      day: "Wednesday",
      time: "9:00 AM - 10:30 AM",
      course: "CS101 - Introduction to Programming",
      room: "Room 101",
    },
    {
      day: "Wednesday",
      time: "11:00 AM - 12:30 PM",
      course: "CS201 - Data Structures",
      room: "Room 203",
    },
    {
      day: "Friday",
      time: "9:00 AM - 10:30 AM",
      course: "CS101 - Introduction to Programming",
      room: "Room 101",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Class Schedule</h2>
      </div>
      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 text-sm font-medium text-gray-600">
                {item.day}
              </div>
              <div className="w-32 text-sm">{item.time}</div>
              <div className="flex-1">
                <div className="font-medium">{item.course}</div>
                <div className="text-sm text-gray-500">{item.room}</div>
              </div>
            </div>
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
