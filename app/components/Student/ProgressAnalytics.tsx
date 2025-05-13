'use client';

import React, { useState } from 'react';
import { FiTrendingUp, FiTrendingDown, FiAward, FiCalendar } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockSemesterData = [
  {
    semester: 'Fall 2023',
    gpa: 3.75,
    credits: 15,
    attendance: 92,
    courses: [
      { name: 'Data Structures', grade: 'A', credits: 3 },
      { name: 'Web Development', grade: 'A-', credits: 3 },
      { name: 'Database Systems', grade: 'B+', credits: 3 },
      { name: 'Software Engineering', grade: 'A', credits: 3 },
      { name: 'Computer Networks', grade: 'A-', credits: 3 },
    ],
  },
  {
    semester: 'Spring 2024',
    gpa: 3.85,
    credits: 12,
    attendance: 95,
    courses: [
      { name: 'Advanced Algorithms', grade: 'A', credits: 3 },
      { name: 'Cloud Computing', grade: 'A-', credits: 3 },
      { name: 'Mobile Development', grade: 'A', credits: 3 },
      { name: 'AI Fundamentals', grade: 'A', credits: 3 },
    ],
  },
];

const mockTrends = {
  gpa: [3.2, 3.4, 3.6, 3.75, 3.85],
  attendance: [85, 88, 90, 92, 95],
  credits: [12, 15, 15, 15, 12],
};

export default function ProgressAnalytics() {
  const [selectedSemester, setSelectedSemester] = useState(mockSemesterData[0].semester);
  const currentSemester = mockSemesterData.find(s => s.semester === selectedSemester);

  const calculateGPAChange = () => {
    const currentIndex = mockSemesterData.findIndex(s => s.semester === selectedSemester);
    if (currentIndex === 0) return 0;
    const previousGPA = mockSemesterData[currentIndex - 1].gpa;
    return ((currentSemester?.gpa || 0) - previousGPA).toFixed(2);
  };

  const gpaChange = calculateGPAChange();
  const isGPAImproving = parseFloat(gpaChange) > 0;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiTrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Progress Analytics</h2>
        </div>
        <select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {mockSemesterData.map(semester => (
            <option key={semester.semester} value={semester.semester}>
              {semester.semester}
            </option>
          ))}
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">GPA</h3>
            <span className={`flex items-center gap-1 text-sm ${
              isGPAImproving ? 'text-green-600' : 'text-red-600'
            }`}>
              {isGPAImproving ? <FiTrendingUp /> : <FiTrendingDown />}
              {gpaChange}
            </span>
          </div>
          <p className="text-2xl font-semibold">{currentSemester?.gpa}</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Credits</h3>
            <FiAward className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-semibold">{currentSemester?.credits}</p>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
            <FiCalendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-semibold">{currentSemester?.attendance}%</p>
        </div>
      </div>

      {/* Course Performance */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Course Performance</h3>
        <div className="space-y-3">
          {currentSemester?.courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{course.name}</h4>
                  <p className="text-sm text-gray-500">{course.credits} credits</p>
                </div>
                <span className="text-lg font-semibold">{course.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Trends */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3">Progress Trends</h3>
        <div className="space-y-4">
          {/* GPA Trend */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">GPA Trend</h4>
              <span className="text-sm text-gray-500">Last 5 semesters</span>
            </div>
            <div className="h-24 flex items-end gap-2">
              {mockTrends.gpa.map((gpa, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-100 rounded-t"
                  style={{
                    height: `${(gpa / 4) * 100}%`,
                    backgroundColor: gpa === currentSemester?.gpa ? '#2563eb' : '#dbeafe',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Attendance Trend */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Attendance Trend</h4>
              <span className="text-sm text-gray-500">Last 5 semesters</span>
            </div>
            <div className="h-24 flex items-end gap-2">
              {mockTrends.attendance.map((attendance, index) => (
                <div
                  key={index}
                  className="flex-1 bg-green-100 rounded-t"
                  style={{
                    height: `${attendance}%`,
                    backgroundColor: attendance === currentSemester?.attendance ? '#16a34a' : '#dcfce7',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 