import React from 'react';
import { EnrollmentManagement } from '../components/Enrollment/EnrollmentManagement';

export default function EnrollmentPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Enrollment Management</h1>
        <EnrollmentManagement />
      </div>
    </div>
  );
} 