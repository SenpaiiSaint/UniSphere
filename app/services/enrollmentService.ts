// Types
export interface Course {
  id: string;
  name: string;
  capacity: number;
  enrolled: number;
  waitlist: number;
  prerequisites: string[];
  campus: string;
}

export interface WaitlistEntry {
  id: string;
  studentName: string;
  position: number;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

export interface EnrollmentAnalytics {
  totalEnrolled: number;
  totalWaitlisted: number;
  enrollmentTrend: {
    date: string;
    enrolled: number;
    waitlisted: number;
  }[];
  courseDistribution: {
    courseId: string;
    enrolled: number;
    capacity: number;
  }[];
}

// Mock data
const mockCourses: Course[] = [
  {
    id: 'CS101',
    name: 'Introduction to Computer Science',
    capacity: 30,
    enrolled: 28,
    waitlist: 5,
    prerequisites: ['None'],
    campus: 'Main Campus'
  },
  {
    id: 'CS201',
    name: 'Data Structures',
    capacity: 25,
    enrolled: 25,
    waitlist: 8,
    prerequisites: ['CS101'],
    campus: 'Main Campus'
  },
  {
    id: 'CS301',
    name: 'Algorithms',
    capacity: 25,
    enrolled: 20,
    waitlist: 3,
    prerequisites: ['CS201'],
    campus: 'Main Campus'
  }
];

const mockWaitlists: Record<string, WaitlistEntry[]> = {
  'CS101': [
    {
      id: '1',
      studentName: 'John Doe',
      position: 1,
      priority: 'high',
      timestamp: '2024-03-15'
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      position: 2,
      priority: 'medium',
      timestamp: '2024-03-16'
    }
  ],
  'CS201': [
    {
      id: '3',
      studentName: 'Bob Johnson',
      position: 1,
      priority: 'high',
      timestamp: '2024-03-14'
    }
  ]
};

const mockAnalytics: Record<string, EnrollmentAnalytics> = {
  'CS101': {
    totalEnrolled: 28,
    totalWaitlisted: 5,
    enrollmentTrend: [
      { date: '2024-03-01', enrolled: 25, waitlisted: 3 },
      { date: '2024-03-08', enrolled: 27, waitlisted: 4 },
      { date: '2024-03-15', enrolled: 28, waitlisted: 5 }
    ],
    courseDistribution: [
      { courseId: 'CS101', enrolled: 28, capacity: 30 },
      { courseId: 'CS201', enrolled: 25, capacity: 25 },
      { courseId: 'CS301', enrolled: 20, capacity: 25 }
    ]
  },
  'CS201': {
    totalEnrolled: 25,
    totalWaitlisted: 8,
    enrollmentTrend: [
      { date: '2024-03-01', enrolled: 20, waitlisted: 5 },
      { date: '2024-03-08', enrolled: 23, waitlisted: 7 },
      { date: '2024-03-15', enrolled: 25, waitlisted: 8 }
    ],
    courseDistribution: [
      { courseId: 'CS101', enrolled: 28, capacity: 30 },
      { courseId: 'CS201', enrolled: 25, capacity: 25 },
      { courseId: 'CS301', enrolled: 20, capacity: 25 }
    ]
  }
};

class EnrollmentService {
  // Waitlist Management
  async getWaitlist(courseId: string): Promise<WaitlistEntry[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockWaitlists[courseId] || [];
  }

  async addToWaitlist(courseId: string, studentId: string, priority: 'high' | 'medium' | 'low'): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;

    const waitlist = mockWaitlists[courseId] || [];
    const newEntry: WaitlistEntry = {
      id: Date.now().toString(),
      studentName: `Student ${studentId}`,
      position: waitlist.length + 1,
      priority,
      timestamp: new Date().toISOString().split('T')[0]
    };

    mockWaitlists[courseId] = [...waitlist, newEntry];
    course.waitlist = waitlist.length + 1;
    return true;
  }

  async removeFromWaitlist(courseId: string, studentId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;

    const waitlist = mockWaitlists[courseId] || [];
    const updatedWaitlist = waitlist.filter(entry => entry.id !== studentId);
    mockWaitlists[courseId] = updatedWaitlist;
    course.waitlist = updatedWaitlist.length;
    return true;
  }

  // Course Capacity Management
  async updateCourseCapacity(courseId: string, newCapacity: number): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;

    course.capacity = newCapacity;
    return true;
  }

  async getCourseCapacity(courseId: string): Promise<number> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === courseId);
    return course?.capacity || 0;
  }

  // Prerequisite Validation
  async validatePrerequisites(courseId: string, studentId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;

    // Mock validation - in a real app, this would check the student's transcript
    return course.prerequisites[0] === 'None' || Math.random() > 0.5;
  }

  // Cross-campus Enrollment
  async checkCrossCampusAvailability(courseId: string, targetCampus: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.random() > 0.3; // 70% chance of availability
  }

  async requestCrossCampusEnrollment(courseId: string, studentId: string, targetCampus: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return Math.random() > 0.2; // 80% chance of success
  }

  // Batch Enrollment Processing
  async processBatchEnrollment(courseId: string, studentIds: string[]): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) return false;

    // Mock batch processing
    const successCount = studentIds.filter(() => Math.random() > 0.2).length;
    course.enrolled += successCount;
    return successCount > 0;
  }

  // Enrollment Analytics
  async getEnrollmentAnalytics(courseId: string): Promise<EnrollmentAnalytics> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAnalytics[courseId] || {
      totalEnrolled: 0,
      totalWaitlisted: 0,
      enrollmentTrend: [],
      courseDistribution: []
    };
  }

  // Course Optimization
  async optimizeCourseSchedule(courseId: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return Math.random() > 0.1; // 90% chance of success
  }
}

export const enrollmentService = new EnrollmentService(); 