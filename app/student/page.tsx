'use client';

import React from 'react';
import { FiBook, FiTrendingUp, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';
import StudentDashboard from '../components/Student/StudentDashboard';
import CourseRecommendations from '../components/Student/CourseRecommendations';
import AcademicProgress from '../components/Student/AcademicProgress';
import SupportTickets from '../components/Student/SupportTickets';

export default function StudentPortal() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Portal</h1>
        <p className="text-gray-600 mt-2">Welcome to your personalized academic dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Dashboard */}
        <div className="lg:col-span-2">
          <StudentDashboard />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <CourseRecommendations />
          <AcademicProgress />
          <SupportTickets />
        </div>
      </div>
    </div>
  );
} 