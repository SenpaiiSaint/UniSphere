'use client';

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiRepeat, FiUsers, FiBell, FiPlus } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockMeetings = [
  {
    id: 1,
    title: 'Data Structures Study Group',
    start: '2024-03-20T15:00:00',
    end: '2024-03-20T16:30:00',
    group: 'Data Structures Study Group',
    recurring: true,
    frequency: 'weekly',
    participants: ['Sarah Johnson', 'Michael Chen', 'Emma Davis'],
  },
  {
    id: 2,
    title: 'Web Dev Project Meeting',
    start: '2024-03-22T14:00:00',
    end: '2024-03-22T15:00:00',
    group: 'Web Dev Project Team',
    recurring: false,
    participants: ['John Smith', 'Lisa Wang'],
  },
];

const mockGroups = [
  { id: 1, name: 'Data Structures Study Group', members: 3 },
  { id: 2, name: 'Web Dev Project Team', members: 4 },
];

export default function StudyGroupCalendar() {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    start: '',
    end: '',
    group: '',
    recurring: false,
    frequency: 'weekly',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new meeting and send notifications
    alert('Meeting scheduled successfully! Notifications sent to participants.');
    setIsCreating(false);
    setNewMeeting({
      title: '',
      start: '',
      end: '',
      group: '',
      recurring: false,
      frequency: 'weekly',
    });
  };

  // Get meetings for the selected date
  const meetingsForDate = mockMeetings.filter(meeting => {
    const meetingDate = new Date(meeting.start);
    return meetingDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Study Group Calendar</h2>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          Schedule Meeting
        </button>
      </div>

      {isCreating ? (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meeting Title</label>
            <input
              type="text"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Study Group</label>
            <select
              value={newMeeting.group}
              onChange={(e) => setNewMeeting({ ...newMeeting, group: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select a group</option>
              {mockGroups.map(group => (
                <option key={group.id} value={group.name}>{group.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={newMeeting.start}
                onChange={(e) => setNewMeeting({ ...newMeeting, start: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="datetime-local"
                value={newMeeting.end}
                onChange={(e) => setNewMeeting({ ...newMeeting, end: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurring"
              checked={newMeeting.recurring}
              onChange={(e) => setNewMeeting({ ...newMeeting, recurring: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label htmlFor="recurring" className="text-sm font-medium">Recurring Meeting</label>
          </div>
          {newMeeting.recurring && (
            <div>
              <label className="block text-sm font-medium mb-1">Frequency</label>
              <select
                value={newMeeting.frequency}
                onChange={(e) => setNewMeeting({ ...newMeeting, frequency: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
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
              Schedule Meeting
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ←
            </button>
            <h3 className="text-lg font-medium">
              {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              →
            </button>
          </div>

          {/* Meetings List */}
          <div className="space-y-3">
            {meetingsForDate.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">{meeting.group}</p>
                  </div>
                  {meeting.recurring && (
                    <span className="flex items-center gap-1 text-sm text-blue-600">
                      <FiRepeat className="w-4 h-4" />
                      {meeting.frequency}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {new Date(meeting.start).toLocaleTimeString()} - {new Date(meeting.end).toLocaleTimeString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    {meeting.participants.length} participants
                  </span>
                </div>
              </div>
            ))}
            {meetingsForDate.length === 0 && (
              <div className="text-center py-4 text-sm text-gray-500">
                No meetings scheduled for this date
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 