'use client';

import React, { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiClock, FiAlertCircle } from 'react-icons/fi';
import { enrollmentService, type Course, type WaitlistEntry, type EnrollmentAnalytics } from '@/app/services/enrollmentService';
import EnrollmentAnalyticsComponent from './EnrollmentAnalytics';

// Mock data
const mockCourses: Course[] = [
  {
    id: 'CS101',
    name: 'Introduction to Computer Science',
    capacity: 30,
    enrolled: 28,
    waitlist: 5,
    prerequisites: ['None'],
    campus: 'Main Campus'
  },
  {
    id: 'CS201',
    name: 'Data Structures',
    capacity: 25,
    enrolled: 25,
    waitlist: 8,
    prerequisites: ['CS101'],
    campus: 'Main Campus'
  }
];

// Mock data for testing
const mockAnalytics: EnrollmentAnalytics = {
  totalEnrolled: 150,
  totalWaitlisted: 25,
  enrollmentTrend: [
    { date: '2024-03-01', enrolled: 120, waitlisted: 15 },
    { date: '2024-03-08', enrolled: 135, waitlisted: 20 },
    { date: '2024-03-15', enrolled: 150, waitlisted: 25 }
  ],
  courseDistribution: [
    { courseId: 'CS101', enrolled: 28, capacity: 30 },
    { courseId: 'CS201', enrolled: 25, capacity: 25 },
    { courseId: 'CS301', enrolled: 20, capacity: 25 }
  ]
};

export const EnrollmentManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [analytics, setAnalytics] = useState<EnrollmentAnalytics>(mockAnalytics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCourse) {
      loadWaitlist(selectedCourse.id);
      loadAnalytics(selectedCourse.id);
    }
  }, [selectedCourse]);

  const loadWaitlist = async (courseId: string) => {
    try {
      setLoading(true);
      const waitlistData = await enrollmentService.getWaitlist(courseId);
      setWaitlist(waitlistData);
    } catch (err) {
      setError('Failed to load waitlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async (courseId: string) => {
    try {
      setLoading(true);
      const analyticsData = await enrollmentService.getEnrollmentAnalytics(courseId);
      setAnalytics(analyticsData);
    } catch (err) {
      setError('Failed to load analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    setSelectedCourse(course || null);
    setError(null);
  };

  const handleAddToWaitlist = async (studentId: string, priority: 'high' | 'medium' | 'low') => {
    if (!selectedCourse) return;
    
    try {
      setLoading(true);
      const success = await enrollmentService.addToWaitlist(selectedCourse.id, studentId, priority);
      if (success) {
        await loadWaitlist(selectedCourse.id);
      }
    } catch (err) {
      setError('Failed to add student to waitlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWaitlist = async (studentId: string) => {
    if (!selectedCourse) return;
    
    try {
      setLoading(true);
      const success = await enrollmentService.removeFromWaitlist(selectedCourse.id, studentId);
      if (success) {
        await loadWaitlist(selectedCourse.id);
      }
    } catch (err) {
      setError('Failed to remove student from waitlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getEnrollmentStatus = (course: Course) => {
    const percentage = (course.enrolled / course.capacity) * 100;
    if (percentage >= 100) return 'Full';
    if (percentage >= 80) return 'Almost Full';
    return 'Available';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Enrollment Management</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Course Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Course
          </label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => handleCourseSelect(e.target.value)}
          >
            <option value="">Select a course...</option>
            {mockCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name} ({course.id})
              </option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="space-y-6">
            {/* Enrollment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiUsers className="text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Enrolled</p>
                    <p className="text-lg font-semibold">
                      {selectedCourse.enrolled}/{selectedCourse.capacity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiClock className="text-yellow-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Waitlist</p>
                    <p className="text-lg font-semibold">{selectedCourse.waitlist}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <FiBook className="text-green-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-semibold">
                      {getEnrollmentStatus(selectedCourse)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Course Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Campus:</span> {selectedCourse.campus}</p>
                <p><span className="font-medium">Prerequisites:</span> {selectedCourse.prerequisites.join(', ')}</p>
              </div>
            </div>

            {/* Waitlist Management */}
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => setShowWaitlist(!showWaitlist)}
              >
                {showWaitlist ? 'Hide Waitlist' : 'Show Waitlist'}
              </button>

              {showWaitlist && (
                <div className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Priority
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Added
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {waitlist.map((entry) => (
                          <tr key={entry.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {entry.studentName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                entry.priority === 'high' ? 'bg-red-100 text-red-800' :
                                entry.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {entry.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {entry.timestamp}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button
                                onClick={() => handleRemoveFromWaitlist(entry.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Analytics Section */}
      {selectedCourse && (
        <EnrollmentAnalyticsComponent analytics={analytics} />
      )}
    </div>
  );
}; 