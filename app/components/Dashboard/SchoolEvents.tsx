"use client";

import React from "react";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";

export const SchoolEvents = () => {
  const events = [
    {
      title: "Science Fair",
      date: "March 15, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Main Auditorium",
      type: "Academic",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Parent-Teacher Conference",
      date: "March 18, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "Conference Room A",
      type: "Meeting",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Sports Day",
      date: "March 20, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "School Ground",
      type: "Sports",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Graduation Ceremony",
      date: "March 25, 2024",
      time: "10:00 AM - 12:00 PM",
      location: "Main Hall",
      type: "Ceremony",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <FiCalendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Upcoming Events</h2>
      </div>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${event.color}`}
                  >
                    {event.type}
                  </span>
                  <h3 className="font-medium">{event.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
        View All Events
      </button>
    </div>
  );
};
