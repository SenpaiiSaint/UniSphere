"use client";

import React from "react";
import { FiTrendingUp } from "react-icons/fi";

export default function AcademicProgress() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <FiTrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Academic Progress</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current GPA</span>
          <span className="font-semibold">3.8</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Credits Completed</span>
          <span className="font-semibold">45/120</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Attendance Rate</span>
          <span className="font-semibold">95%</span>
        </div>
      </div>
    </div>
  );
}
