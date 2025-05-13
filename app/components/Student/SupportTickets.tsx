'use client';

import React from 'react';
import { FiHelpCircle, FiPlus } from 'react-icons/fi';

export default function SupportTickets() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiHelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Support Tickets</h2>
        </div>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <FiPlus className="w-4 h-4" />
          New Ticket
        </button>
      </div>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">No active support tickets</p>
      </div>
    </div>
  );
} 