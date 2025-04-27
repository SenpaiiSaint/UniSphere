'use client';

import React, { useState } from 'react';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';

interface AttendanceRecord {
  id: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  course: string;
  time: string;
}

export const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Sample attendance data
  const attendanceData: AttendanceRecord[] = [
    {
      id: '1',
      studentName: 'John Doe',
      date: '2024-03-15',
      status: 'present',
      course: 'Mathematics',
      time: '09:00 AM'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      date: '2024-03-15',
      status: 'late',
      course: 'Mathematics',
      time: '09:15 AM'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      date: '2024-03-15',
      status: 'absent',
      course: 'Mathematics',
      time: '09:00 AM'
    },
    {
      id: '4',
      studentName: 'Sarah Williams',
      date: '2024-03-15',
      status: 'present',
      course: 'Science',
      time: '10:30 AM'
    },
  ];

  const courses = ['all', 'Mathematics', 'Science', 'English', 'History'];

  const filteredData = attendanceData.filter(record => {
    const dateMatch = record.date === selectedDate;
    const courseMatch = selectedCourse === 'all' || record.course === selectedCourse;
    return dateMatch && courseMatch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <FiCheck className="w-4 h-4 text-green-500" />;
      case 'absent':
        return <FiX className="w-4 h-4 text-red-500" />;
      case 'late':
        return <FiClock className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-600';
      case 'absent':
        return 'bg-red-100 text-red-600';
      case 'late':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Attendance Records</h2>
        <div className="flex gap-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            {courses.map(course => (
              <option key={course} value={course}>
                {course === 'all' ? 'All Courses' : course}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Student</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Time</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(record => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-sm">{record.studentName}</td>
                <td className="py-3 px-4 text-sm">{record.course}</td>
                <td className="py-3 px-4 text-sm">{record.time}</td>
                <td className="py-3 px-4">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                    <span className="capitalize">{record.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-100"></div>
          <span className="text-xs">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-100"></div>
          <span className="text-xs">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
          <span className="text-xs">Late</span>
        </div>
      </div>
    </div>
  );
}; 