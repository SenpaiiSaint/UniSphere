'use client';

import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiUpload, FiDownload, FiUsers } from 'react-icons/fi';
import { Course, Student, mockCourses } from '@/app/data/mockData';

export const CourseManagement = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'students'>('courses');
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    description: '',
    professor: '',
    credits: 0,
    semester: '',
    schedule: {
      days: [] as string[],
      time: '',
      location: ''
    },
    prerequisites: [] as string[],
    syllabus: '',
    students: [] as Student[]
  });

  const [courses, setCourses] = useState<Course[]>(mockCourses);

  const handleCreateCourse = () => {
    const course: Course = {
      id: `course-${courses.length + 1}`,
      ...newCourse,
      students: []
    };
    setCourses([...courses, course]);
    setShowCourseForm(false);
    setNewCourse({
      name: '',
      code: '',
      description: '',
      professor: '',
      credits: 0,
      semester: '',
      schedule: {
        days: [],
        time: '',
        location: ''
      },
      prerequisites: [],
      syllabus: '',
      students: []
    });
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse({
      name: course.name,
      code: course.code,
      description: course.description,
      professor: course.professor,
      credits: course.credits,
      semester: course.semester,
      schedule: course.schedule,
      prerequisites: course.prerequisites,
      syllabus: course.syllabus,
      students: course.students
    });
    setShowCourseForm(true);
  };

  const handleUpdateCourse = () => {
    if (!selectedCourse) return;
    const updatedCourses = courses.map(course =>
      course.id === selectedCourse.id
        ? { ...course, ...newCourse }
        : course
    );
    setCourses(updatedCourses);
    setShowCourseForm(false);
    setSelectedCourse(null);
    setNewCourse({
      name: '',
      code: '',
      description: '',
      professor: '',
      credits: 0,
      semester: '',
      schedule: {
        days: [],
        time: '',
        location: ''
      },
      prerequisites: [],
      syllabus: '',
      students: []
    });
  };

  const handleArchiveCourse = (courseId: string) => {
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, status: 'archived' }
        : course
    ));
  };

  const handleUploadStudents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV file upload
      console.log('Uploading students from CSV:', file.name);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'courses' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'students' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            Students
          </button>
        </div>
        {activeTab === 'courses' && (
          <button
            onClick={() => {
              setSelectedCourse(null);
              setShowCourseForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus className="w-4 h-4" />
            Add Course
          </button>
        )}
      </div>

      {showCourseForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {selectedCourse ? 'Edit Course' : 'Create New Course'}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Course Name</label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Course Code</label>
              <input
                type="text"
                value={newCourse.code}
                onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <input
                type="text"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Professor</label>
              <input
                type="text"
                value={newCourse.professor}
                onChange={(e) => setNewCourse({ ...newCourse, professor: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Credits</label>
              <input
                type="number"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Semester</label>
              <input
                type="text"
                value={newCourse.semester}
                onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Schedule</label>
              <input
                type="text"
                value={newCourse.schedule.time}
                onChange={(e) => setNewCourse({ ...newCourse, schedule: { ...newCourse.schedule, time: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <input
                type="text"
                value={newCourse.schedule.location}
                onChange={(e) => setNewCourse({ ...newCourse, schedule: { ...newCourse.schedule, location: e.target.value } })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Prerequisites</label>
              <input
                type="text"
                value={newCourse.prerequisites.join(', ')}
                onChange={(e) => setNewCourse({ ...newCourse, prerequisites: e.target.value.split(',').map(p => p.trim()) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Syllabus</label>
              <input
                type="text"
                value={newCourse.syllabus}
                onChange={(e) => setNewCourse({ ...newCourse, syllabus: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowCourseForm(false);
                setSelectedCourse(null);
              }}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={selectedCourse ? handleUpdateCourse : handleCreateCourse}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {selectedCourse ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'courses' ? (
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.code} - {course.semester}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleArchiveCourse(course.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{course.students.length} students</span>
                </div>
                <div className="flex gap-2">
                  {course.syllabus && (
                    <a
                      href={course.syllabus}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    >
                      View Syllabus
                    </a>
                  )}
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    Upload Syllabus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Student Roster</h3>
            <div className="flex gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer">
                <FiUpload className="w-4 h-4" />
                <span>Import CSV</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleUploadStudents}
                  className="hidden"
                />
              </label>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <FiDownload className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* students.map(student => (
              <div key={student.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    student.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {student.status}
                  </div>
                </div>
              </div>
            )) */}
          </div>
        </div>
      )}
    </div>
  );
}; 