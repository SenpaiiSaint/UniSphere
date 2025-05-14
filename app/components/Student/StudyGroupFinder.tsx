"use client";

import React, { useState } from "react";
import { FiUsers, FiPlus, FiCalendar, FiMessageSquare } from "react-icons/fi";

// Mock data - in a real app, this would come from an API
const mockStudents = [
  {
    id: 1,
    name: "Sarah Johnson",
    courses: ["Data Structures", "Web Development"],
    availability: "Weekday evenings",
  },
  {
    id: 2,
    name: "Michael Chen",
    courses: ["Data Structures", "Introduction to Computer Science"],
    availability: "Weekends",
  },
  {
    id: 3,
    name: "Emma Davis",
    courses: ["Web Development", "Introduction to Computer Science"],
    availability: "Weekday afternoons",
  },
];

const mockGroups = [
  {
    id: 1,
    name: "Data Structures Study Group",
    members: 3,
    nextMeeting: "2024-03-20T15:00",
    course: "Data Structures",
  },
  {
    id: 2,
    name: "Web Dev Project Team",
    members: 4,
    nextMeeting: "2024-03-22T14:00",
    course: "Web Development",
  },
];

export default function StudyGroupFinder() {
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: "",
    course: "",
    meetingTime: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new study group
    alert("Study group created successfully!");
    setIsCreating(false);
    setNewGroup({ name: "", course: "", meetingTime: "", description: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Study Groups</h2>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          Create Group
        </button>
      </div>

      {isCreating ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border rounded-lg p-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Group Name</label>
            <input
              type="text"
              value={newGroup.name}
              onChange={(e) =>
                setNewGroup({ ...newGroup, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              value={newGroup.course}
              onChange={(e) =>
                setNewGroup({ ...newGroup, course: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select a course</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Web Development">Web Development</option>
              <option value="Introduction to Computer Science">
                Introduction to Computer Science
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Meeting Time
            </label>
            <input
              type="datetime-local"
              value={newGroup.meetingTime}
              onChange={(e) =>
                setNewGroup({ ...newGroup, meetingTime: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={newGroup.description}
              onChange={(e) =>
                setNewGroup({ ...newGroup, description: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Group
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Existing Groups */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Your Study Groups
            </h3>
            <div className="space-y-3">
              {mockGroups.map((group) => (
                <div key={group.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{group.name}</h4>
                      <p className="text-sm text-gray-500">{group.course}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {group.members} members
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4" />
                    <span>
                      Next meeting:{" "}
                      {new Date(group.nextMeeting).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Study Partners */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">
              Potential Study Partners
            </h3>
            <div className="space-y-3">
              {mockStudents.map((student) => (
                <div key={student.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-gray-500">
                        Available: {student.availability}
                      </p>
                    </div>
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <FiMessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Shared courses: {student.courses.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
