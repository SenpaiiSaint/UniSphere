'use client';

import React from 'react';
import { FiUpload, FiDownload, FiCalendar, FiAward, FiBook, FiUsers, FiFileText, FiHelpCircle } from 'react-icons/fi';

const actions = [
  {
    id: 'submit',
    title: 'Submit Assignment',
    icon: <FiUpload className="w-5 h-5" />,
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    href: '/student/assignments'
  },
  {
    id: 'download',
    title: 'Download Materials',
    icon: <FiDownload className="w-5 h-5" />,
    color: 'bg-green-50 text-green-600 hover:bg-green-100',
    href: '/student/materials'
  },
  {
    id: 'schedule',
    title: 'Schedule Meeting',
    icon: <FiCalendar className="w-5 h-5" />,
    color: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    href: '/student/schedule'
  },
  {
    id: 'grades',
    title: 'View Grades',
    icon: <FiAward className="w-5 h-5" />,
    color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
    href: '/student/grades'
  },
  {
    id: 'resources',
    title: 'Course Resources',
    icon: <FiBook className="w-5 h-5" />,
    color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100',
    href: '/student/resources'
  },
  {
    id: 'groups',
    title: 'Study Groups',
    icon: <FiUsers className="w-5 h-5" />,
    color: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    href: '/student/groups'
  },
  {
    id: 'documents',
    title: 'My Documents',
    icon: <FiFileText className="w-5 h-5" />,
    color: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
    href: '/student/documents'
  },
  {
    id: 'support',
    title: 'Get Help',
    icon: <FiHelpCircle className="w-5 h-5" />,
    color: 'bg-red-50 text-red-600 hover:bg-red-100',
    href: '/student/support'
  }
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${action.color}`}
          >
            {action.icon}
            <span className="mt-2 text-sm font-medium text-center">{action.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
} 