'use client';

import React, { useState } from 'react';
import { FiTarget, FiAward, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockGoals = [
  {
    id: 1,
    title: 'Maintain 3.5 GPA',
    target: 3.5,
    current: 3.75,
    type: 'gpa',
    status: 'achieved',
  },
  {
    id: 2,
    title: 'Complete 30 Credits',
    target: 30,
    current: 25,
    type: 'credits',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'Attend 90% of Classes',
    target: 90,
    current: 95,
    type: 'attendance',
    status: 'achieved',
  },
];

const mockAchievements = [
  {
    id: 1,
    title: 'Perfect Attendance',
    description: 'Attended all classes for a month',
    icon: <FiCheckCircle className="w-6 h-6 text-green-600" />,
    date: '2024-03-01',
  },
  {
    id: 2,
    title: 'Dean\'s List',
    description: 'Achieved GPA above 3.5',
    icon: <FiAward className="w-6 h-6 text-blue-600" />,
    date: '2024-02-15',
  },
  {
    id: 3,
    title: 'Early Bird',
    description: 'Submitted 5 assignments before deadline',
    icon: <FiTrendingUp className="w-6 h-6 text-purple-600" />,
    date: '2024-03-10',
  },
];

export default function ProgressTracking() {
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    type: 'gpa',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new goal
    alert('Goal created successfully!');
    setIsAddingGoal(false);
    setNewGoal({ title: '', target: '', type: 'gpa' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiTarget className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Progress Tracking</h2>
        </div>
        <button
          onClick={() => setIsAddingGoal(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiTarget className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {isAddingGoal ? (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
          <div>
            <label className="block text-sm font-medium mb-1">Goal Title</label>
            <input
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target Value</label>
            <input
              type="number"
              value={newGoal.target}
              onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Goal Type</label>
            <select
              value={newGoal.type}
              onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="gpa">GPA</option>
              <option value="credits">Credits</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingGoal(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Goal
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Goals Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Your Goals</h3>
            <div className="space-y-4">
              {mockGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{goal.title}</h4>
                      <p className="text-sm text-gray-500">
                        Target: {goal.target} {goal.type === 'gpa' ? 'GPA' : goal.type === 'credits' ? 'Credits' : '%'}
                      </p>
                    </div>
                    {goal.status === 'achieved' ? (
                      <FiCheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <FiAlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        goal.status === 'achieved' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}
                      style={{
                        width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Current: {goal.current} {goal.type === 'gpa' ? 'GPA' : goal.type === 'credits' ? 'Credits' : '%'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockAchievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">{achievement.icon}</div>
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-gray-500">{achievement.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Earned: {new Date(achievement.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 