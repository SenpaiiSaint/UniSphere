"use client";

import React from "react";
import { FiBook } from "react-icons/fi";

// Mock data - in a real app, this would come from an API
const mockRecommendations = [
  {
    id: 1,
    name: "Advanced Algorithms",
    description:
      "Build on your data structures knowledge with advanced algorithm design",
    matchScore: 95,
    prerequisites: ["Data Structures", "Introduction to Computer Science"],
  },
  {
    id: 2,
    name: "Database Systems",
    description: "Learn about database design, implementation, and management",
    matchScore: 88,
    prerequisites: ["Web Development"],
  },
  {
    id: 3,
    name: "Software Engineering",
    description: "Study software development methodologies and best practices",
    matchScore: 82,
    prerequisites: ["Introduction to Computer Science"],
  },
];

export default function CourseRecommendations() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <FiBook className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Recommended Courses</h2>
      </div>
      <div className="space-y-3">
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Data Structures</h3>
          <p className="text-sm text-gray-600">CS 201 • 3 Credits</p>
        </div>
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium">Web Development</h3>
          <p className="text-sm text-gray-600">CS 301 • 4 Credits</p>
        </div>
      </div>
    </div>
  );
}
