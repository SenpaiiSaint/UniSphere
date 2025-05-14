"use client";

import React from "react";
import { Bell, Calendar, BookOpen, Users } from "lucide-react";

export const RecentAnnouncements = () => {
  const announcements = [
    {
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      title: "Midterm Schedule",
      description:
        "Midterm exams will be held from March 15-20. Please prepare your students accordingly.",
      time: "2 hours ago",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-green-600" />,
      title: "New Course Material",
      description:
        "New lecture slides for Week 5 have been uploaded to the course portal.",
      time: "5 hours ago",
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Faculty Meeting",
      description:
        "Department meeting scheduled for Friday at 2:00 PM in Conference Room A.",
      time: "1 day ago",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Recent Announcements</h2>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="mt-1">{announcement.icon}</div>
              <div className="flex-1">
                <div className="font-medium">{announcement.title}</div>
                <div className="text-sm text-gray-600">
                  {announcement.description}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {announcement.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
        View All Announcements
      </button>
    </div>
  );
};
