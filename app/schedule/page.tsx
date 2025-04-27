'use client';

import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { mockCourses } from '../data/mockData';
import { format } from 'date-fns';

export default function SchedulePage() {
  const [selectedView, setSelectedView] = useState('weekly');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCourse, setSelectedCourse] = useState('');

  const getWeekDates = () => {
    const start = new Date(currentWeek);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    return { start, end };
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const getDayCourses = (date: Date) => {
    return mockCourses.filter(course => {
      if (selectedCourse && course.id !== selectedCourse) return false;
      return course.schedule.days.some(day => 
        day.toLowerCase() === date.toLocaleDateString('default', { weekday: 'long' }).toLowerCase()
      );
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 truncate">Class Schedule</h1>
                <p className="text-gray-500 text-sm sm:text-base truncate">View and manage your course schedule</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <select
                  className="block w-full md:w-48 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 truncate text-gray-900"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="" className="text-gray-900">All Courses</option>
                  {mockCourses.map(course => (
                    <option key={course.id} value={course.id} className="text-gray-900">
                      {course.name}
                    </option>
                  ))}
                </select>
                <select
                  className="block w-full md:w-48 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 truncate text-gray-900"
                  value={selectedView}
                  onChange={(e) => setSelectedView(e.target.value)}
                >
                  <option value="weekly" className="text-gray-900">Weekly View</option>
                  <option value="monthly" className="text-gray-900">Monthly View</option>
                </select>
                <button
                  className="w-full md:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm font-medium whitespace-nowrap"
                  onClick={() => {
                    const now = new Date();
                    setCurrentWeek(now);
                    setCurrentMonth(now);
                  }}
                >
                  Today
                </button>
              </div>
            </div>

            {selectedView === 'weekly' ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentWeek);
                      newDate.setDate(newDate.getDate() - 7);
                      setCurrentWeek(newDate);
                    }}
                    className="p-2.5 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                  </button>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent truncate px-4">
                    {getWeekDates().start.toLocaleDateString()} - {getWeekDates().end.toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentWeek);
                      newDate.setDate(newDate.getDate() + 7);
                      setCurrentWeek(newDate);
                    }}
                    className="p-2.5 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
                  {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date(getWeekDates().start);
                    date.setDate(date.getDate() + index);
                    const dayCourses = getDayCourses(date);
                    return (
                      <div 
                        key={index} 
                        className={`border rounded-2xl p-4 transition-all duration-300 transform hover:scale-[1.02] ${
                          isToday(date) 
                            ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg' 
                            : 'hover:shadow-lg hover:border-gray-200 bg-white/80 backdrop-blur-sm'
                        }`}
                      >
                        <div className="font-bold text-gray-900 text-lg mb-1 truncate">
                          {format(date, 'EEE')}
                        </div>
                        <div className="text-sm text-gray-700 mb-4 truncate">
                          {format(date, 'MMM d')}
                        </div>
                        <div className="space-y-3">
                          {dayCourses.map(course => (
                            <div 
                              key={course.id} 
                              className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                            >
                              <div className="font-semibold text-gray-900 text-sm truncate">{course.name}</div>
                              <div className="text-sm text-gray-700 mt-1.5 truncate">
                                {course.schedule.time}
                              </div>
                              <div className="text-xs text-gray-600 mt-1.5 flex items-center truncate">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                                <span className="truncate">{course.schedule.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-2.5 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                  </button>
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent truncate px-4">
                    {getMonthName(currentMonth)}
                  </span>
                  <button
                    onClick={() => {
                      const newDate = new Date(currentMonth);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentMonth(newDate);
                    }}
                    className="p-2.5 hover:bg-gray-50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-700 py-3 bg-white/80 backdrop-blur-sm rounded-xl text-sm truncate">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-40" />
                  ))}
                  {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, index) => {
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
                    const dayCourses = getDayCourses(date);
                    return (
                      <div 
                        key={index} 
                        className={`border rounded-xl p-3 min-h-40 transition-all duration-300 transform hover:scale-[1.02] ${
                          isToday(date) 
                            ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg' 
                            : !isCurrentMonth(date) 
                              ? 'bg-gray-50/50 text-gray-400' 
                              : 'hover:shadow-lg hover:border-gray-200 bg-white/80 backdrop-blur-sm'
                        }`}
                      >
                        <div className="text-lg font-bold text-gray-900 mb-3 truncate">
                          {date.getDate()}
                        </div>
                        <div className="space-y-2">
                          {dayCourses.map(course => (
                            <div 
                              key={course.id} 
                              className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                            >
                              <div className="font-medium text-sm text-gray-900 truncate">
                                {course.name}
                              </div>
                              <div className="text-xs text-gray-600 truncate flex items-center mt-1">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 flex-shrink-0"></span>
                                <span className="truncate">{course.schedule.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 