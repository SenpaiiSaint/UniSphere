export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  professor: string;
  credits: number;
  semester: string;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  prerequisites: string[];
  syllabus: string;
  students: Student[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  major: string;
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';
  gpa: number;
  enrolledCourses: string[];
  attendance: Record<string, number>;
  grades: Record<string, number>;
  riskFactors: string[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  totalPoints: number;
  type: 'Homework' | 'Quiz' | 'Exam' | 'Project' | 'Lab';
  submissions: Submission[];
  rubric?: RubricItem[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
}

export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    announcement: boolean;
    grade: boolean;
    assignment: boolean;
  };
  grading: {
    latePenalty: number;
    rounding: 'up' | 'down' | 'nearest';
    gradeScale: Record<string, number>;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    fontSize: number;
    density: 'comfortable' | 'compact';
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  channels: ('email' | 'sms' | 'app')[];
}

export interface OfficeHour {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  slots: {
    id: string;
    studentName: string;
    status: 'booked' | 'available';
  }[];
}

export interface GradeData {
  year: string;
  averageGrade: number;
  studentCount: number;
}

export interface PerformanceData {
  date: string;
  averageGrade: number;
  attendanceRate: number;
  assignmentCompletion: number;
}

export interface CourseStats {
  totalStudents: number;
  averageGrade: number;
  attendanceRate: number;
  assignmentCompletion: number;
}

export interface Submission {
  id: string;
  studentName: string;
  assignmentName: string;
  dueDate: Date;
  submittedDate: Date;
  originalGrade: number;
  lateDays: number;
  penalty: number;
  finalGrade: number;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  studentName: string;
  grade: number;
  assignments: {
    id: string;
    title: string;
    grade: number;
    maxPoints: number;
    type: 'Homework' | 'Quiz' | 'Exam' | 'Project' | 'Lab';
  }[];
}

// Helper function to generate random grades and attendance
const generateRandomPerformance = () => {
  // Generate different ranges for each course
  const attendanceRange = Math.floor(Math.random() * 3); // 0-2
  const gradeRange = Math.floor(Math.random() * 3); // 0-2
  
  // Different base ranges for attendance
  const attendanceBases = [70, 80, 85]; // Lower, Medium, Higher
  const attendanceVariations = [20, 15, 10]; // More variation for lower ranges
  
  // Different base ranges for grades
  const gradeBases = [60, 70, 80]; // Lower, Medium, Higher
  const gradeVariations = [30, 25, 20]; // More variation for lower ranges

  return {
    attendance: Math.floor(Math.random() * attendanceVariations[attendanceRange]) + attendanceBases[attendanceRange],
    grade: Math.floor(Math.random() * gradeVariations[gradeRange]) + gradeBases[gradeRange],
    lateSubmissions: Math.floor(Math.random() * 5) // 0-4 late submissions
  };
};

// Generate students for all courses
const generateStudents = () => {
  const students: Student[] = [];
  const majors = ['Computer Science', 'Mathematics', 'Engineering', 'Physics', 'Biology'];
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
  
  // Generate 40 students to support the largest class size
  for (let i = 1; i <= 40; i++) {
    // Generate unique performance for each course
    const cs101Performance = generateRandomPerformance();
    const cs201Performance = generateRandomPerformance();
    const cs301Performance = generateRandomPerformance();
    const cs401Performance = generateRandomPerformance();
    const cs501Performance = generateRandomPerformance();
    
    // Generate random GPA with more variation
    const gpa = (Math.random() * 2.5 + 1.5).toFixed(2); // 1.5-4.0
    
    students.push({
      id: `S${i.toString().padStart(3, '0')}`,
      name: `Student ${i}`,
      email: `student${i}@university.edu`,
      studentId: `2024${i.toString().padStart(3, '0')}`,
      major: majors[Math.floor(Math.random() * majors.length)],
      year: years[Math.floor(Math.random() * years.length)],
      gpa: gpa,
      enrolledCourses: ['CS101', 'CS201', 'CS301', 'CS401', 'CS501'],
      attendance: {
        'CS101': cs101Performance.attendance,
        'CS201': cs201Performance.attendance,
        'CS301': cs301Performance.attendance,
        'CS401': cs401Performance.attendance,
        'CS501': cs501Performance.attendance
      },
      grades: {
        'CS101': cs101Performance.grade,
        'CS201': cs201Performance.grade,
        'CS301': cs301Performance.grade,
        'CS401': cs401Performance.grade,
        'CS501': cs501Performance.grade
      },
      riskFactors: [
        ...(cs101Performance.attendance < 85 ? ['Low attendance in CS101'] : []),
        ...(cs201Performance.attendance < 85 ? ['Low attendance in CS201'] : []),
        ...(cs301Performance.attendance < 85 ? ['Low attendance in CS301'] : []),
        ...(cs401Performance.attendance < 85 ? ['Low attendance in CS401'] : []),
        ...(cs501Performance.attendance < 85 ? ['Low attendance in CS501'] : []),
        ...(cs101Performance.lateSubmissions > 1 ? ['Frequent late submissions in CS101'] : []),
        ...(cs201Performance.lateSubmissions > 1 ? ['Frequent late submissions in CS201'] : []),
        ...(cs301Performance.lateSubmissions > 1 ? ['Frequent late submissions in CS301'] : []),
        ...(cs401Performance.lateSubmissions > 1 ? ['Frequent late submissions in CS401'] : []),
        ...(cs501Performance.lateSubmissions > 1 ? ['Frequent late submissions in CS501'] : [])
      ]
    });
  }
  
  return students;
};

export const mockStudents = generateStudents();

// Update mockSubmissions to include all students and courses
export const mockSubmissions: Submission[] = mockStudents.flatMap(student => [
  {
    id: `sub-${student.id}-1`,
    studentName: student.name,
    assignmentName: 'Programming Assignment 1',
    dueDate: new Date('2024-03-15'),
    submittedDate: new Date('2024-03-15'),
    originalGrade: student.grades['CS101'],
    lateDays: 0,
    penalty: 0,
    finalGrade: student.grades['CS101']
  },
  {
    id: `sub-${student.id}-2`,
    studentName: student.name,
    assignmentName: 'Data Structures Project',
    dueDate: new Date('2024-03-20'),
    submittedDate: new Date('2024-03-20'),
    originalGrade: student.grades['CS201'],
    lateDays: 0,
    penalty: 0,
    finalGrade: student.grades['CS201']
  },
  {
    id: `sub-${student.id}-3`,
    studentName: student.name,
    assignmentName: 'Algorithm Analysis',
    dueDate: new Date('2024-03-25'),
    submittedDate: new Date('2024-03-25'),
    originalGrade: student.grades['CS301'],
    lateDays: 0,
    penalty: 0,
    finalGrade: student.grades['CS301']
  },
  {
    id: `sub-${student.id}-4`,
    studentName: student.name,
    assignmentName: 'Database Design',
    dueDate: new Date('2024-03-30'),
    submittedDate: new Date('2024-03-30'),
    originalGrade: student.grades['CS401'],
    lateDays: 0,
    penalty: 0,
    finalGrade: student.grades['CS401']
  },
  {
    id: `sub-${student.id}-5`,
    studentName: student.name,
    assignmentName: 'Software Project',
    dueDate: new Date('2024-04-05'),
    submittedDate: new Date('2024-04-05'),
    originalGrade: student.grades['CS501'],
    lateDays: 0,
    penalty: 0,
    finalGrade: student.grades['CS501']
  }
]);

// Update mockAssignments to include all courses
export const mockAssignments: Assignment[] = [
  {
    id: 'A001',
    courseId: 'CS101',
    title: 'Programming Assignment 1',
    description: 'Implement a basic calculator in Python',
    dueDate: new Date('2024-03-15'),
    totalPoints: 100,
    type: 'Homework',
    submissions: mockSubmissions.filter(s => s.assignmentName === 'Programming Assignment 1'),
    rubric: [
      {
        category: 'Functionality',
        weight: 40,
        criteria: 'Program must correctly perform all basic arithmetic operations'
      },
      {
        category: 'Code Quality',
        weight: 30,
        criteria: 'Code should be well-documented and follow PEP 8 guidelines'
      },
      {
        category: 'Error Handling',
        weight: 30,
        criteria: 'Program should handle invalid inputs gracefully'
      }
    ]
  },
  {
    id: 'A002',
    courseId: 'CS201',
    title: 'Data Structures Project',
    description: 'Implement and analyze various data structures',
    dueDate: new Date('2024-03-20'),
    totalPoints: 100,
    type: 'Project',
    submissions: mockSubmissions.filter(s => s.assignmentName === 'Data Structures Project'),
    rubric: [
      {
        category: 'Implementation',
        weight: 50,
        criteria: 'Correct implementation of data structures'
      },
      {
        category: 'Analysis',
        weight: 30,
        criteria: 'Clear analysis of time and space complexity'
      },
      {
        category: 'Documentation',
        weight: 20,
        criteria: 'Comprehensive documentation and testing'
      }
    ]
  },
  {
    id: 'A003',
    courseId: 'CS301',
    title: 'Algorithm Analysis',
    description: 'Analysis of sorting and searching algorithms',
    dueDate: new Date('2024-03-25'),
    totalPoints: 100,
    type: 'Homework',
    submissions: mockSubmissions.filter(s => s.assignmentName === 'Algorithm Analysis'),
    rubric: [
      {
        category: 'Correctness',
        weight: 40,
        criteria: 'Accurate analysis of algorithms'
      },
      {
        category: 'Explanation',
        weight: 30,
        criteria: 'Clear explanation of methodology'
      },
      {
        category: 'Results',
        weight: 30,
        criteria: 'Well-presented results and conclusions'
      }
    ]
  },
  {
    id: 'A004',
    courseId: 'CS401',
    title: 'Database Design',
    description: 'Design and implement a relational database',
    dueDate: new Date('2024-03-30'),
    totalPoints: 100,
    type: 'Project',
    submissions: mockSubmissions.filter(s => s.assignmentName === 'Database Design'),
    rubric: [
      {
        category: 'Design',
        weight: 40,
        criteria: 'Proper database schema design'
      },
      {
        category: 'Implementation',
        weight: 40,
        criteria: 'Correct implementation of queries'
      },
      {
        category: 'Documentation',
        weight: 20,
        criteria: 'Clear documentation of design decisions'
      }
    ]
  },
  {
    id: 'A005',
    courseId: 'CS501',
    title: 'Software Project',
    description: 'Complete software development project',
    dueDate: new Date('2024-04-05'),
    totalPoints: 100,
    type: 'Project',
    submissions: mockSubmissions.filter(s => s.assignmentName === 'Software Project'),
    rubric: [
      {
        category: 'Functionality',
        weight: 40,
        criteria: 'Complete implementation of requirements'
      },
      {
        category: 'Code Quality',
        weight: 30,
        criteria: 'Clean, maintainable code'
      },
      {
        category: 'Testing',
        weight: 20,
        criteria: 'Comprehensive test coverage'
      },
      {
        category: 'Documentation',
        weight: 10,
        criteria: 'Clear project documentation'
      }
    ]
  }
];

export const mockCourses: Course[] = [
  {
    id: 'CS101',
    name: 'Introduction to Programming',
    code: 'CS101',
    description: 'Fundamental concepts of computer science and programming.',
    professor: 'Dr. Sarah Johnson',
    credits: 4,
    semester: 'Spring 2024',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '10:00 AM - 11:30 AM',
      location: 'Science Hall 101'
    },
    prerequisites: [],
    syllabus: '/syllabi/cs101.pdf',
    students: mockStudents.slice(0, 35) // Fixed at 35 students
  },
  {
    id: 'CS201',
    name: 'Data Structures',
    code: 'CS201',
    description: 'Study of fundamental data structures and algorithms with practical implementations.',
    professor: 'Dr. Emily Rodriguez',
    credits: 4,
    semester: 'Spring 2024',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '2:00 PM - 3:30 PM',
      location: 'Computer Science Building 301'
    },
    prerequisites: ['CS101'],
    syllabus: '/syllabi/cs201.pdf',
    students: mockStudents.slice(0, 28) // Fixed at 28 students
  },
  {
    id: 'CS301',
    name: 'Algorithms',
    code: 'CS301',
    description: 'Advanced study of algorithms and their applications in computer science.',
    professor: 'Dr. Michael Chen',
    credits: 4,
    semester: 'Spring 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '1:00 PM - 2:30 PM',
      location: 'Computer Science Building 205'
    },
    prerequisites: ['CS201'],
    syllabus: '/syllabi/cs301.pdf',
    students: mockStudents.slice(0, 23) // Fixed at 23 students
  },
  {
    id: 'CS401',
    name: 'Database Systems',
    code: 'CS401',
    description: 'Design and implementation of database systems and applications.',
    professor: 'Dr. James Wilson',
    credits: 4,
    semester: 'Spring 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '9:00 AM - 10:30 AM',
      location: 'Computer Science Building 401'
    },
    prerequisites: ['CS201'],
    syllabus: '/syllabi/cs401.pdf',
    students: mockStudents.slice(0, 20) // Fixed at 20 students
  },
  {
    id: 'CS501',
    name: 'Software Engineering',
    code: 'CS501',
    description: 'Principles and practices of software engineering and development.',
    professor: 'Dr. Patricia Smith',
    credits: 4,
    semester: 'Spring 2024',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '11:00 AM - 12:30 PM',
      location: 'Computer Science Building 501'
    },
    prerequisites: ['CS301', 'CS401'],
    syllabus: '/syllabi/cs501.pdf',
    students: mockStudents.slice(0, 17) // Fixed at 17 students
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    subject: 'Question about Assignment 3',
    content: 'Hi, I was wondering if you could clarify the requirements for the third section of Assignment 3. The instructions seem a bit unclear about the expected output format.',
    timestamp: new Date('2024-03-15T10:30:00'),
    read: true
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '1',
    subject: 'Group Project Update',
    content: 'Just wanted to let you know that I\'ve completed my part of the group project. You can find the updated files in our shared folder.',
    timestamp: new Date('2024-03-15T14:45:00'),
    read: false,
    attachments: ['project_update.pdf', 'presentation_slides.pptx']
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '4',
    subject: 'Meeting Request',
    content: 'Would you be available for a quick meeting tomorrow to discuss your progress in the course? I\'d like to review your recent assignments and provide some feedback.',
    timestamp: new Date('2024-03-14T16:20:00'),
    read: true
  },
  {
    id: '4',
    senderId: '4',
    receiverId: '3',
    subject: 'Late Submission Notice',
    content: 'This is a reminder that your submission for Assignment 2 was received after the deadline. Please review the late submission policy in the course syllabus.',
    timestamp: new Date('2024-03-14T09:15:00'),
    read: false
  },
  {
    id: '5',
    senderId: '1',
    receiverId: '5',
    subject: 'Course Material Update',
    content: 'I\'ve uploaded new study materials for next week\'s topics. Make sure to review them before the class.',
    timestamp: new Date('2024-03-13T11:00:00'),
    read: true,
    attachments: ['week8_materials.pdf', 'practice_exercises.docx']
  }
];

export const mockSettings: Settings = {
  notifications: {
    email: true,
    push: true,
    sms: false,
    announcement: true,
    grade: true,
    assignment: true
  },
  grading: {
    latePenalty: 10,
    rounding: 'nearest',
    gradeScale: {
      'A': 90,
      'B': 80,
      'C': 70,
      'D': 60,
      'F': 0
    }
  },
  appearance: {
    theme: 'light',
    fontSize: 16,
    density: 'comfortable'
  }
};

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Midterm Exam Schedule',
    content: 'The midterm exam will be held on March 25th at 9:00 AM.',
    date: '2024-03-15',
    channels: ['email', 'app']
  },
  {
    id: '2',
    title: 'Assignment Extension',
    content: 'The deadline for Assignment 3 has been extended to March 20th.',
    date: '2024-03-10',
    channels: ['email', 'sms', 'app']
  }
];

export const mockOfficeHours: OfficeHour[] = [
  {
    id: '1',
    day: 'Monday',
    startTime: '14:00',
    endTime: '16:00',
    slots: [
      { id: '1', studentName: 'John Doe', status: 'booked' },
      { id: '2', studentName: '', status: 'available' }
    ]
  }
];

export const mockGradeData: GradeData[] = [
  { year: '2021', averageGrade: 75, studentCount: 40 },
  { year: '2022', averageGrade: 78, studentCount: 42 },
  { year: '2023', averageGrade: 82, studentCount: 45 },
  { year: '2024', averageGrade: 85, studentCount: 45 }
];

export const mockPerformanceData: PerformanceData[] = [
  { date: '2024-03-01', averageGrade: 85, attendanceRate: 92, assignmentCompletion: 88 },
  { date: '2024-03-08', averageGrade: 82, attendanceRate: 90, assignmentCompletion: 85 },
  { date: '2024-03-15', averageGrade: 88, attendanceRate: 95, assignmentCompletion: 90 }
];

export const mockCourseStats: CourseStats = {
  totalStudents: 45,
  averageGrade: 85,
  attendanceRate: 92,
  assignmentCompletion: 88
};

// Generate mock grade data
const generateMockGrades = (): Grade[] => {
  const grades: Grade[] = [];
  const courseIds = mockCourses.map(course => course.id);
  
  mockStudents.forEach(student => {
    courseIds.forEach(courseId => {
      const course = mockCourses.find(c => c.id === courseId);
      if (!course) return;

      // Generate random grade between 60 and 100
      const finalGrade = Math.floor(Math.random() * 41) + 60;
      
      // Generate assignment grades
      const assignments = [
        {
          id: `hw-${student.id}-${courseId}-1`,
          title: 'Programming Assignment 1',
          grade: Math.floor(Math.random() * 11) + 90,
          maxPoints: 100,
          type: 'Homework' as const
        },
        {
          id: `quiz-${student.id}-${courseId}-1`,
          title: 'Midterm Quiz',
          grade: Math.floor(Math.random() * 16) + 85,
          maxPoints: 100,
          type: 'Quiz' as const
        },
        {
          id: `exam-${student.id}-${courseId}-1`,
          title: 'Final Exam',
          grade: Math.floor(Math.random() * 21) + 80,
          maxPoints: 100,
          type: 'Exam' as const
        },
        {
          id: `project-${student.id}-${courseId}-1`,
          title: 'Course Project',
          grade: Math.floor(Math.random() * 11) + 90,
          maxPoints: 100,
          type: 'Project' as const
        },
        {
          id: `lab-${student.id}-${courseId}-1`,
          title: 'Lab Assignment 1',
          grade: Math.floor(Math.random() * 11) + 90,
          maxPoints: 100,
          type: 'Lab' as const
        }
      ];

      grades.push({
        id: `grade-${student.id}-${courseId}`,
        studentId: student.id,
        courseId: courseId,
        studentName: student.name,
        grade: finalGrade,
        assignments: assignments
      });
    });
  });

  return grades;
};

export const mockGrades = generateMockGrades(); 