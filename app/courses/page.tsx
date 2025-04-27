'use client';

import { useState } from 'react';
import { mockCourses } from '../data/mockData';
import { MainLayout } from '../components/Layout/MainLayout';

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const formatSchedule = (schedule: { days: string[]; time: string; location: string }) => {
    return `${schedule.days.join(', ')} ${schedule.time} (${schedule.location})`;
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !selectedCourse || course.id === selectedCourse;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-64 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
            />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="block w-48 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200 text-gray-900"
            >
              <option value="" className="text-gray-900">All Courses</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id} className="text-gray-900">
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{course.name}</h2>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-900">
                    {course.code}
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-700">{course.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Professor:</span>
                    <span className="ml-2">{course.professor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Credits:</span>
                    <span className="ml-2">{course.credits}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Schedule:</span>
                    <span className="ml-2">{formatSchedule(course.schedule)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <span className="font-medium">Semester:</span>
                    <span className="ml-2">{course.semester}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>Enrolled Students</span>
                    <span className="font-medium text-gray-900">
                      {course.students.length}
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ 
                        width: `${(course.students.length / 40) * 100}%`,
                        maxWidth: '100%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
} 