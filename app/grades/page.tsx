'use client';

import { useState } from 'react';
import { mockCourses, mockGrades } from '../data/mockData';
import { MainLayout } from '../components/Layout/MainLayout';
import { ChevronDownIcon, ChevronUpIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function GradesPage() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sortField, setSortField] = useState<'studentName' | 'grade'>('studentName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null);

  const handleSort = (field: 'studentName' | 'grade') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getFilteredGrades = () => {
    return mockGrades.filter(grade => 
      !selectedCourse || grade.courseId === selectedCourse
    );
  };

  const getSortedGrades = () => {
    const grades = getFilteredGrades();
    return grades.sort((a, b) => {
      if (sortField === 'studentName') {
        return sortOrder === 'asc' 
          ? a.studentName.localeCompare(b.studentName)
          : b.studentName.localeCompare(a.studentName);
      } else {
        return sortOrder === 'asc' 
          ? a.grade - b.grade
          : b.grade - a.grade;
      }
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeStatus = (grade: number) => {
    if (grade >= 90) return 'Excellent';
    if (grade >= 80) return 'Good';
    if (grade >= 70) return 'Satisfactory';
    return 'Needs Improvement';
  };

  const getStatusColor = (grade: number) => {
    if (grade >= 90) return 'bg-green-100 text-green-800';
    if (grade >= 80) return 'bg-blue-100 text-blue-800';
    if (grade >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getAssignmentTypeColor = (type: string) => {
    switch (type) {
      case 'Homework': return 'bg-blue-100 text-blue-800';
      case 'Quiz': return 'bg-purple-100 text-purple-800';
      case 'Exam': return 'bg-red-100 text-red-800';
      case 'Project': return 'bg-green-100 text-green-800';
      case 'Lab': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const grades = getFilteredGrades();
  const averageGrade = grades.length 
    ? Math.round(grades.reduce((acc, curr) => acc + curr.grade, 0) / grades.length)
    : 0;

  const passingRate = grades.length
    ? Math.round((grades.filter(g => g.grade >= 70).length / grades.length) * 100)
    : 0;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 truncate">Grades Overview</h1>
                <p className="text-gray-500 text-sm sm:text-base truncate">View and manage student grades</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <select
                  className="block w-full md:w-48 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 truncate"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">All Courses</option>
                  {mockCourses?.map(course => (
                    <option key={course.id} value={course.id} className="truncate">
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Average Grade</h3>
                  <ChartBarIcon className="h-5 w-5 text-blue-500" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {averageGrade}%
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Passing Rate</h3>
                  <ChartBarIcon className="h-5 w-5 text-green-500" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {passingRate}%
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                  <ChartBarIcon className="h-5 w-5 text-purple-500" />
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">{grades.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => handleSort('studentName')}
                        >
                          <div className="flex items-center gap-2">
                            Student
                            {sortField === 'studentName' && (
                              sortOrder === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                          onClick={() => handleSort('grade')}
                        >
                          <div className="flex items-center gap-2">
                            Grade
                            {sortField === 'grade' && (
                              sortOrder === 'asc' ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getSortedGrades().map((grade) => (
                        <React.Fragment key={grade.id}>
                          <tr className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {grade.studentName.charAt(0)}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900 truncate">{grade.studentName}</div>
                                  <div className="text-sm text-gray-500 truncate">{grade.studentId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className={`text-sm font-semibold ${getGradeColor(grade.grade)}`}>
                                {grade.grade}%
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(grade.grade)}`}>
                                  {getGradeStatus(grade.grade)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => setExpandedStudent(expandedStudent === grade.id ? null : grade.id)}
                                className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                              >
                                {expandedStudent === grade.id ? 'Hide Details' : 'Show Details'}
                              </button>
                            </td>
                          </tr>
                          {expandedStudent === grade.id && (
                            <tr className="bg-gray-50">
                              <td colSpan={4} className="px-6 py-4">
                                <div className="space-y-4">
                                  <h4 className="text-sm font-medium text-gray-900">Assignment Details</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {grade.assignments.map((assignment) => (
                                      <div key={`${grade.id}-${assignment.id}`} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAssignmentTypeColor(assignment.type)}`}>
                                            {assignment.type}
                                          </span>
                                          <span className="text-sm font-medium text-gray-900">
                                            {assignment.grade}/{assignment.maxPoints}
                                          </span>
                                        </div>
                                        <h5 className="text-sm font-medium text-gray-900 mb-1 truncate">
                                          {assignment.title}
                                        </h5>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                          <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{ width: `${(assignment.grade / assignment.maxPoints) * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 