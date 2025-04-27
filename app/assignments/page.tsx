'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { mockCourses } from '../data/mockData';
import { mockAssignments } from '../data/mockAssignments';
import { MainLayout } from '../components/Layout/MainLayout';
import { 
  BookOpen, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  Award,
  FileArchive,
  Search,
  Filter
} from 'lucide-react';

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'points'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAssignments = mockAssignments
    .filter(assignment => {
      const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = !selectedCourse || assignment.courseId === selectedCourse;
      const matchesType = !selectedType || assignment.type.toLowerCase() === selectedType.toLowerCase();
      const matchesStatus = !selectedStatus || assignment.status === selectedStatus;
      return matchesSearch && matchesCourse && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return sortOrder === 'asc' 
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      } else {
        return sortOrder === 'asc' 
          ? a.points - b.points
          : b.points - a.points;
      }
    });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'quiz':
        return <FileText className="w-5 h-5 text-purple-500" />;
      case 'project':
        return <FileArchive className="w-5 h-5 text-green-500" />;
      case 'exam':
        return <Award className="w-5 h-5 text-red-500" />;
      case 'lab':
        return <FileText className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Courses</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="homework">Homework</option>
              <option value="quiz">Quiz</option>
              <option value="project">Project</option>
              <option value="exam">Exam</option>
              <option value="lab">Lab</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>

            <button
              onClick={() => {
                setSortBy(sortBy === 'dueDate' ? 'points' : 'dueDate');
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Filter className="w-4 h-4" />
              Sort by: {sortBy === 'dueDate' ? 'Due Date' : 'Points'}
              {sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredAssignments.map((assignment) => {
            const course = mockCourses.find(c => c.id === assignment.courseId);
            return (
              <div
                key={assignment.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {getTypeIcon(assignment.type)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">{course?.name}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            Due: {formatDate(assignment.dueDate)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Award className="w-4 h-4 mr-1" />
                            {assignment.points} points
                          </div>
                          {getStatusBadge(assignment.status)}
                        </div>
                      </div>
                    </div>
                    {assignment.submission?.grade && (
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          {assignment.submission.grade}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{assignment.description}</p>
                  </div>

                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Attachments</h3>
                      <div className="flex flex-wrap gap-2">
                        {assignment.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-gray-50 text-gray-700 hover:bg-gray-100"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {attachment.name}
                            <span className="ml-2 text-xs text-gray-500">({attachment.size})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {assignment.submission?.feedback && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Feedback</h3>
                      <p className="text-sm text-gray-600">{assignment.submission.feedback}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
} 