"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CoursePerformance {
  courseCode: string;
  courseName: string;
  totalStudents: number;
  averageGrade: number;
  gradeDistribution: {
    a: number;
    b: number;
    c: number;
    d: number;
    f: number;
  };
  attendance: number;
  lateSubmissions: number;
  trend: "up" | "down" | "stable";
}

const mockCoursePerformance: CoursePerformance[] = [
  {
    courseCode: "CS101",
    courseName: "Introduction to Programming",
    totalStudents: 45,
    averageGrade: 82,
    gradeDistribution: { a: 15, b: 18, c: 8, d: 3, f: 1 },
    attendance: 92,
    lateSubmissions: 12,
    trend: "up",
  },
  {
    courseCode: "CS201",
    courseName: "Data Structures",
    totalStudents: 38,
    averageGrade: 78,
    gradeDistribution: { a: 12, b: 15, c: 7, d: 3, f: 1 },
    attendance: 88,
    lateSubmissions: 8,
    trend: "stable",
  },
  {
    courseCode: "CS301",
    courseName: "Algorithms",
    totalStudents: 35,
    averageGrade: 75,
    gradeDistribution: { a: 10, b: 14, c: 7, d: 3, f: 1 },
    attendance: 85,
    lateSubmissions: 15,
    trend: "down",
  },
  {
    courseCode: "CS401",
    courseName: "Database Systems",
    totalStudents: 32,
    averageGrade: 80,
    gradeDistribution: { a: 13, b: 12, c: 5, d: 1, f: 1 },
    attendance: 90,
    lateSubmissions: 5,
    trend: "up",
  },
  {
    courseCode: "CS501",
    courseName: "Software Engineering",
    totalStudents: 30,
    averageGrade: 85,
    gradeDistribution: { a: 14, b: 11, c: 4, d: 1, f: 0 },
    attendance: 94,
    lateSubmissions: 3,
    trend: "up",
  },
];

export const StudentPerformance = () => {
  const [selectedCourse, setSelectedCourse] = useState<CoursePerformance>(
    mockCoursePerformance[0]
  );

  const pieData = {
    labels: ["A Grades", "B Grades", "C Grades", "D Grades", "F Grades"],
    datasets: [
      {
        data: [
          selectedCourse.gradeDistribution.a,
          selectedCourse.gradeDistribution.b,
          selectedCourse.gradeDistribution.c,
          selectedCourse.gradeDistribution.d,
          selectedCourse.gradeDistribution.f,
        ],
        backgroundColor: [
          "#22c55e", // green for A
          "#3b82f6", // blue for B
          "#f59e0b", // yellow for C
          "#ef4444", // red for D
          "#6b7280", // gray for F
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"pie">) {
            const total = selectedCourse.totalStudents;
            const value = context.raw as number;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Course Performance Overview</h2>
        </div>
        <select
          value={selectedCourse.courseCode}
          onChange={(e) => {
            const course = mockCoursePerformance.find(
              (c) => c.courseCode === e.target.value
            );
            if (course) setSelectedCourse(course);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        >
          {mockCoursePerformance.map((course) => (
            <option key={course.courseCode} value={course.courseCode}>
              {course.courseCode} - {course.courseName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80">
          <Pie options={options} data={pieData} />
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">
                  {selectedCourse.courseCode}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedCourse.courseName}
                </p>
              </div>
              {selectedCourse.trend === "up" ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : selectedCourse.trend === "down" ? (
                <TrendingDown className="w-5 h-5 text-red-500" />
              ) : (
                <div className="w-5 h-5 text-gray-400">—</div>
              )}
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Students</span>
                    <span className="font-medium">
                      {selectedCourse.totalStudents}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Average Grade</span>
                    <span className="font-medium">
                      {selectedCourse.averageGrade}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Attendance Rate</span>
                    <span className="font-medium">
                      {selectedCourse.attendance}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Late Submissions</span>
                    <span className="font-medium">
                      {selectedCourse.lateSubmissions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
