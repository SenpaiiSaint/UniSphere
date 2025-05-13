'use client';

import React, { useState, useEffect } from 'react';
import { FiSettings, FiEye, FiEyeOff } from 'react-icons/fi';

interface Widget {
  id: string;
  title: string;
  defaultVisible: boolean;
}

const widgets: Widget[] = [
  { id: 'quickActions', title: 'Quick Actions', defaultVisible: true },
  { id: 'currentCourses', title: 'Current Courses', defaultVisible: true },
  { id: 'upcomingEvents', title: 'Upcoming Events', defaultVisible: true },
  { id: 'alerts', title: 'Important Alerts', defaultVisible: true },
  { id: 'courseRecommendations', title: 'Course Recommendations', defaultVisible: true },
  { id: 'academicProgress', title: 'Academic Progress', defaultVisible: true },
  { id: 'supportTickets', title: 'Support Tickets', defaultVisible: true },
];

export default function DashboardSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedPreferences = localStorage.getItem('dashboardPreferences');
    if (savedPreferences) {
      setVisibleWidgets(JSON.parse(savedPreferences));
    } else {
      // Set default visibility
      const defaultVisibility = widgets.reduce((acc, widget) => ({
        ...acc,
        [widget.id]: widget.defaultVisible
      }), {});
      setVisibleWidgets(defaultVisibility);
    }
  }, []);

  const toggleWidget = (widgetId: string) => {
    const newVisibility = {
      ...visibleWidgets,
      [widgetId]: !visibleWidgets[widgetId]
    };
    setVisibleWidgets(newVisibility);
    localStorage.setItem('dashboardPreferences', JSON.stringify(newVisibility));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-stone-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
      >
        <FiSettings className="w-4 h-4" />
        <span>Customize Dashboard</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-stone-200 p-4 z-10">
          <h3 className="text-sm font-medium mb-3">Visible Widgets</h3>
          <div className="space-y-2">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg"
              >
                <span className="text-sm">{widget.title}</span>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className="p-1 hover:bg-stone-100 rounded"
                >
                  {visibleWidgets[widget.id] ? (
                    <FiEye className="w-4 h-4 text-blue-600" />
                  ) : (
                    <FiEyeOff className="w-4 h-4 text-stone-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 