'use client';

import React, { useState } from 'react';
import { FiHelpCircle, FiPlus, FiMessageSquare } from 'react-icons/fi';

// Mock data - in a real app, this would come from an API
const mockTickets = [
  {
    id: 1,
    title: 'Course Registration Issue',
    status: 'open',
    lastUpdated: '2024-03-15',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Grade Appeal Request',
    status: 'in-progress',
    lastUpdated: '2024-03-10',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Scholarship Application',
    status: 'resolved',
    lastUpdated: '2024-03-01',
    priority: 'low',
  },
];

export default function SupportTickets() {
  const [isCreating, setIsCreating] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the ticket to an API
    alert('Support ticket submitted successfully!');
    setIsCreating(false);
    setNewTicket({ title: '', description: '', priority: 'medium' });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiHelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Support Tickets</h2>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FiPlus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {isCreating ? (
        <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={newTicket.title}
              onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newTicket.description}
              onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={newTicket.priority}
              onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
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
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {mockTickets.map((ticket) => (
            <div key={ticket.id} className="border rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <FiMessageSquare className="w-4 h-4 text-gray-400" />
                  <h3 className="font-medium">{ticket.title}</h3>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'open'
                      ? 'bg-red-100 text-red-800'
                      : ticket.status === 'in-progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Priority: {ticket.priority}</span>
                <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 