'use client';

import React from 'react';
import { FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockProgress = {
  overallGPA: 3.75,
  creditsCompleted: 75,
  creditsRequired: 120,
  requirements: [
    {
      id: 1,
      name: 'Core Courses',
      completed: 8,
      required: 10,
      status: 'in-progress',
    },
    {
      id: 2,
      name: 'Electives',
      completed: 4,
      required: 6,
      status: 'in-progress',
    },
    {
      id: 3,
      name: 'General Education',
      completed: 6,
      required: 6,
      status: 'completed',
    },
  ],
};

export default function AcademicProgress() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiTrendingUp className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold">Academic Progress</h2>
      </div>

      <div className="space-y-4">
        {/* Overall Progress */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600">
              {mockProgress.creditsCompleted}/{mockProgress.creditsRequired} Credits
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{
                width: `${(mockProgress.creditsCompleted / mockProgress.creditsRequired) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* GPA */}
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Current GPA</span>
            <span className="text-lg font-semibold text-green-600">{mockProgress.overallGPA}</span>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          {mockProgress.requirements.map((req) => (
            <div key={req.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  {req.status === 'completed' ? (
                    <FiCheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <FiAlertCircle className="w-4 h-4 text-yellow-600" />
                  )}
                  <span className="text-sm font-medium">{req.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {req.completed}/{req.required}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    req.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'
                  }`}
                  style={{ width: `${(req.completed / req.required) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 