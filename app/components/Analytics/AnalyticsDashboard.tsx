"use client";

import React, { useState } from "react";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiBook,
  FiCalendar,
} from "react-icons/fi";
import {
  PerformanceData,
  CourseStats,
  mockPerformanceData,
  mockCourseStats,
} from "@/app/data/mockData";

export const AnalyticsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "week" | "month" | "semester"
  >("month");
  const [performanceData] = useState<PerformanceData[]>(mockPerformanceData);
  const [courseStats] = useState<CourseStats>(mockCourseStats);

  const calculateTrend = (data: PerformanceData[]) => {
    if (data.length < 2) return null;

    const first = data[0];
    const last = data[data.length - 1];

    return {
      grade:
        ((last.averageGrade - first.averageGrade) / first.averageGrade) * 100,
      attendance:
        ((last.attendanceRate - first.attendanceRate) / first.attendanceRate) *
        100,
      completion:
        ((last.assignmentCompletion - first.assignmentCompletion) /
          first.assignmentCompletion) *
        100,
    };
  };

  const trend = calculateTrend(performanceData);

  const getTrendIcon = (value: number) => {
    if (value > 0) return <FiTrendingUp className="w-5 h-5 text-green-500" />;
    if (value < 0) return <FiTrendingDown className="w-5 h-5 text-red-500" />;
    return null;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <select
          value={selectedTimeframe}
          onChange={(e) =>
            setSelectedTimeframe(
              e.target.value as "week" | "month" | "semester"
            )
          }
          className="px-4 py-2 border rounded-lg"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="semester">This Semester</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <FiUsers className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-600">Total Students</span>
          </div>
          <div className="text-2xl font-semibold">
            {courseStats.totalStudents}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <FiBook className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-600">Average Grade</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">
              {courseStats.averageGrade}%
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 ${getTrendColor(
                  trend.grade
                )}`}
              >
                {getTrendIcon(trend.grade)}
                <span className="text-sm">
                  {Math.abs(trend.grade).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <FiCalendar className="w-6 h-6 text-yellow-600" />
            <span className="text-sm text-yellow-600">Attendance Rate</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">
              {courseStats.attendanceRate}%
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 ${getTrendColor(
                  trend.attendance
                )}`}
              >
                {getTrendIcon(trend.attendance)}
                <span className="text-sm">
                  {Math.abs(trend.attendance).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <FiBook className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-purple-600">
              Assignment Completion
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-semibold">
              {courseStats.assignmentCompletion}%
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 ${getTrendColor(
                  trend.completion
                )}`}
              >
                {getTrendIcon(trend.completion)}
                <span className="text-sm">
                  {Math.abs(trend.completion).toFixed(1)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {performanceData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm text-gray-500">
                  {new Date(data.date).toLocaleDateString()}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-xs text-gray-500">Grade</div>
                    <div className="font-medium">{data.averageGrade}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Attendance</div>
                    <div className="font-medium">{data.attendanceRate}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Completion</div>
                    <div className="font-medium">
                      {data.assignmentCompletion}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-4">Key Insights</h3>
          <div className="space-y-4">
            {trend && (
              <>
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend.grade)}
                  <span className={getTrendColor(trend.grade)}>
                    {trend.grade > 0 ? "Improving" : "Declining"} average grades
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend.attendance)}
                  <span className={getTrendColor(trend.attendance)}>
                    {trend.attendance > 0 ? "Increasing" : "Decreasing"}{" "}
                    attendance rates
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend.completion)}
                  <span className={getTrendColor(trend.completion)}>
                    {trend.completion > 0 ? "Higher" : "Lower"} assignment
                    completion rates
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
