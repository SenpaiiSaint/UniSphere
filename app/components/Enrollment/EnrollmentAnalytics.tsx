"use client";

import React from "react";
import { FiTrendingUp, FiUsers, FiAlertCircle } from "react-icons/fi";
import { type EnrollmentAnalytics } from "@/app/services/enrollmentService";

interface Props {
  analytics: EnrollmentAnalytics;
}

export default function EnrollmentAnalyticsComponent({ analytics }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Enrollment Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FiUsers className="text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Total Enrolled</p>
              <p className="text-lg font-semibold">{analytics.totalEnrolled}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FiAlertCircle className="text-yellow-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Total Waitlisted</p>
              <p className="text-lg font-semibold">
                {analytics.totalWaitlisted}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <FiTrendingUp className="text-green-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600">Enrollment Rate</p>
              <p className="text-lg font-semibold">
                {(
                  (analytics.totalEnrolled /
                    (analytics.totalEnrolled + analytics.totalWaitlisted)) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Distribution */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Course Distribution</h3>
        <div className="space-y-4">
          {analytics.courseDistribution.map((course) => (
            <div key={course.courseId} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{course.courseId}</span>
                <span className="text-sm text-gray-600">
                  {course.enrolled}/{course.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(course.enrolled / course.capacity) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Trend */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Enrollment Trend</h3>
        <div className="space-y-2">
          {analytics.enrollmentTrend.map((trend, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <span className="text-sm text-gray-600">{trend.date}</span>
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Enrolled:{" "}
                  <span className="font-medium">{trend.enrolled}</span>
                </span>
                <span className="text-sm">
                  Waitlisted:{" "}
                  <span className="font-medium">{trend.waitlisted}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
