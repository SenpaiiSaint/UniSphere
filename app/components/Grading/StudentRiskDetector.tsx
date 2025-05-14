"use client";

import React, { useState } from "react";
import { FiAlertTriangle, FiUser, FiBook, FiClock } from "react-icons/fi";
import { Student, mockStudents } from "@/app/data/mockData";
import PageLayout from "@/app/components/Layout/PageLayout";

interface StudentRiskDetectorProps {
  courseId: string;
}

export const StudentRiskDetector = ({ courseId }: StudentRiskDetectorProps) => {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const [students] = useState<Student[]>(mockStudents);

  const calculateRiskLevel = (student: Student): "high" | "medium" | "low" => {
    let riskScore = 0;

    const courseGrade = Object.values(student.grades)[0] || 0;
    if (courseGrade < 60) riskScore += 3;
    else if (courseGrade < 70) riskScore += 2;
    else if (courseGrade < 80) riskScore += 1;

    const attendanceRate = Object.values(student.attendance)[0] || 0;
    if (attendanceRate < 70) riskScore += 3;
    else if (attendanceRate < 80) riskScore += 2;
    else if (attendanceRate < 90) riskScore += 1;

    const lateSubmissions = student.riskFactors.filter((f) =>
      f.includes("late")
    ).length;
    if (lateSubmissions > 5) riskScore += 3;
    else if (lateSubmissions > 3) riskScore += 2;
    else if (lateSubmissions > 1) riskScore += 1;

    if (riskScore >= 6) return "high";
    if (riskScore >= 3) return "medium";
    return "low";
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStudents = students.filter((student) => {
    const riskLevel = calculateRiskLevel(student);
    return selectedFilter === "all" || riskLevel === selectedFilter;
  });

  return (
    <PageLayout>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            At-Risk Students - Course {courseId}
          </h2>
          <select
            value={selectedFilter}
            onChange={(e) =>
              setSelectedFilter(
                e.target.value as "all" | "high" | "medium" | "low"
              )
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Students</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredStudents.map((student) => {
            const riskLevel = calculateRiskLevel(student);
            return (
              <div key={student.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${getRiskColor(
                      riskLevel
                    )}`}
                  >
                    {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}{" "}
                    Risk
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <FiBook className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Current Grade</div>
                      <div className="font-medium">
                        {Object.values(student.grades)[0] || 0}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Attendance</div>
                      <div className="font-medium">
                        {Object.values(student.attendance)[0] || 0}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">
                        Late Submissions
                      </div>
                      <div className="font-medium">
                        {
                          student.riskFactors.filter((f) => f.includes("late"))
                            .length
                        }
                      </div>
                    </div>
                  </div>
                </div>

                {student.riskFactors.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiAlertTriangle className="w-4 h-4" />
                      <span>Risk Factors:</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {student.riskFactors.map((factor, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};
