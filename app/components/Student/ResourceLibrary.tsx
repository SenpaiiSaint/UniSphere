"use client";

import React, { useState } from "react";
import {
  FiBook,
  FiSearch,
  FiDownload,
  FiEye,
  FiFile,
  FiVideo,
  FiBookOpen,
} from "react-icons/fi";

// Mock data - in a real app, this would come from an API
const mockResources = [
  {
    id: 1,
    title: "Data Structures Lecture Notes",
    type: "document",
    course: "Data Structures",
    uploadDate: "2024-03-15",
    downloads: 45,
    icon: <FiFile className="w-5 h-5 text-blue-600" />,
  },
  {
    id: 2,
    title: "Web Development Tutorial",
    type: "video",
    course: "Web Development",
    uploadDate: "2024-03-14",
    downloads: 32,
    icon: <FiVideo className="w-5 h-5 text-red-600" />,
  },
  {
    id: 3,
    title: "Introduction to Algorithms",
    type: "book",
    course: "Data Structures",
    uploadDate: "2024-03-13",
    downloads: 28,
    icon: <FiBookOpen className="w-5 h-5 text-green-600" />,
  },
  {
    id: 4,
    title: "HTML/CSS Cheat Sheet",
    type: "document",
    course: "Web Development",
    uploadDate: "2024-03-12",
    downloads: 56,
    icon: <FiFile className="w-5 h-5 text-blue-600" />,
  },
];

const courses = [
  "All Courses",
  "Data Structures",
  "Web Development",
  "Introduction to Computer Science",
];
const resourceTypes = ["All Types", "Document", "Video", "Book"];

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCourse =
      selectedCourse === "All Courses" || resource.course === selectedCourse;
    const matchesType =
      selectedType === "All Types" ||
      resource.type === selectedType.toLowerCase();
    return matchesSearch && matchesCourse && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-3">
        <FiBook className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Resource Library</h2>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3 mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FiSearch className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="flex-1 px-2 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-[120px] px-2 pr-0.5 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {resourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="border rounded-lg p-3">
            <div className="flex items-start justify-between mb-1.5">
              <div className="flex items-start gap-2 min-w-0">
                {resource.icon}
                <div className="min-w-0">
                  <h3 className="font-medium text-sm truncate">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-gray-500">{resource.course}</p>
                </div>
              </div>
              <div className="flex gap-1.5 ml-2 flex-shrink-0">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FiEye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <FiDownload className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                Uploaded: {new Date(resource.uploadDate).toLocaleDateString()}
              </span>
              <span>{resource.downloads} downloads</span>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-4 text-sm text-gray-500">
          No resources found matching your criteria
        </div>
      )}
    </div>
  );
}
