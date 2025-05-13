'use client';

import React from 'react';
import { FiBook, FiTrendingUp, FiCalendar, FiAlertCircle } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockData = {
  currentCourses: [
    { id: 1, name: 'Introduction to Computer Science', progress: 75, nextAssignment: 'Final Project' },
    { id: 2, name: 'Data Structures', progress: 60, nextAssignment: 'Midterm Exam' },
    { id: 3, name: 'Web Development', progress: 90, nextAssignment: 'Group Project' },
  ],
  upcomingEvents: [
    { id: 1, title: 'Final Project Due', date: '2024-05-15', course: 'Web Development' },
    { id: 2, title: 'Midterm Exam', date: '2024-04-20', course: 'Data Structures' },
    { id: 3, title: 'Group Presentation', date: '2024-04-25', course: 'Introduction to Computer Science' },
  ],
  alerts: [
    { id: 1, message: 'Your Data Structures assignment is due in 2 days', type: 'warning' },
    { id: 2, message: 'You have a new grade posted for Web Development', type: 'info' },
  ],
};

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Current Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiBook className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Current Courses</h2>
        </div>
        <div className="space-y-4">
          {mockData.currentCourses.map((course) => (
            <div key={course.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{course.name}</h3>
                <span className="text-sm text-gray-500">Next: {course.nextAssignment}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Progress: {course.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiCalendar className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
        </div>
        <div className="space-y-3">
          {mockData.upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.course}</p>
              </div>
              <span className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <FiAlertCircle className="w-5 h-5 text-yellow-600" />
          <h2 className="text-xl font-semibold">Important Alerts</h2>
        </div>
        <div className="space-y-3">
          {mockData.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' : 'bg-blue-50 text-blue-800'
              }`}
            >
              {alert.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 