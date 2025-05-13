'use client';

import React from 'react';
import { FiBookOpen } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockRecommendations = [
  {
    id: 1,
    name: 'Advanced Algorithms',
    description: 'Build on your data structures knowledge with advanced algorithm design',
    matchScore: 95,
    prerequisites: ['Data Structures', 'Introduction to Computer Science'],
  },
  {
    id: 2,
    name: 'Database Systems',
    description: 'Learn about database design, implementation, and management',
    matchScore: 88,
    prerequisites: ['Web Development'],
  },
  {
    id: 3,
    name: 'Software Engineering',
    description: 'Study software development methodologies and best practices',
    matchScore: 82,
    prerequisites: ['Introduction to Computer Science'],
  },
];

export default function CourseRecommendations() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiBookOpen className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold">Recommended Courses</h2>
      </div>
      
      <div className="space-y-4">
        {mockRecommendations.map((course) => (
          <div key={course.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{course.name}</h3>
              <span className="text-sm font-medium text-purple-600">
                {course.matchScore}% Match
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{course.description}</p>
            <div className="text-xs text-gray-500">
              Prerequisites: {course.prerequisites.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 