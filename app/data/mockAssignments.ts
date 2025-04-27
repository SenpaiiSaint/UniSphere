export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'homework' | 'quiz' | 'project' | 'exam' | 'lab';
  dueDate: string;
  points: number;
  status: 'upcoming' | 'submitted' | 'graded';
  submission?: {
    date: string;
    file?: string;
    feedback?: string;
    grade?: number;
  };
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
}

export const mockAssignments: Assignment[] = [
  {
    id: 'hw1',
    courseId: 'CS101',
    title: 'Python Programming Basics',
    description: 'Complete the Python programming exercises covering variables, loops, and functions. Implement a simple calculator and a text-based game.',
    type: 'homework',
    dueDate: '2024-04-15',
    points: 100,
    status: 'upcoming',
    attachments: [
      {
        name: 'assignment1.pdf',
        type: 'PDF',
        size: '2.5MB'
      }
    ]
  },
  {
    id: 'hw2',
    courseId: 'CS201',
    title: 'Data Structures Implementation',
    description: 'Implement and test the following data structures: Linked List, Stack, and Queue. Include time complexity analysis and unit tests.',
    type: 'homework',
    dueDate: '2024-04-18',
    points: 150,
    status: 'submitted',
    submission: {
      date: '2024-04-17',
      file: 'data_structures.zip'
    }
  },
  {
    id: 'quiz1',
    courseId: 'CS101',
    title: 'Python Fundamentals Quiz',
    description: 'Quiz covering Python syntax, data types, and basic programming concepts. Includes multiple choice and coding questions.',
    type: 'quiz',
    dueDate: '2024-04-20',
    points: 50,
    status: 'upcoming',
    attachments: [
      {
        name: 'quiz_guidelines.pdf',
        type: 'PDF',
        size: '1.2MB'
      }
    ]
  },
  {
    id: 'quiz2',
    courseId: 'CS201',
    title: 'Data Structures Quiz',
    description: 'Online quiz covering data structures, their implementations, and time complexity analysis. Includes diagram-based questions.',
    type: 'quiz',
    dueDate: '2024-04-22',
    points: 75,
    status: 'graded',
    submission: {
      date: '2024-04-21',
      grade: 70,
      feedback: 'Good understanding of data structures. Review hash table implementations for next time.'
    }
  },
  {
    id: 'proj1',
    courseId: 'CS301',
    title: 'Web Application Development',
    description: 'Create a full-stack web application using React, Node.js, and MongoDB. Include user authentication and CRUD operations.',
    type: 'project',
    dueDate: '2024-04-25',
    points: 200,
    status: 'submitted',
    submission: {
      date: '2024-04-24',
      file: 'web_app.zip'
    },
    attachments: [
      {
        name: 'project_requirements.pdf',
        type: 'PDF',
        size: '3.1MB'
      },
      {
        name: 'api_documentation.pdf',
        type: 'PDF',
        size: '2.4MB'
      }
    ]
  },
  {
    id: 'proj2',
    courseId: 'CS401',
    title: 'Machine Learning Project',
    description: 'Implement a neural network from scratch to solve a classification problem. Include data preprocessing, model training, and evaluation.',
    type: 'project',
    dueDate: '2024-04-28',
    points: 250,
    status: 'upcoming',
    attachments: [
      {
        name: 'project_guidelines.pdf',
        type: 'PDF',
        size: '2.8MB'
      },
      {
        name: 'dataset.zip',
        type: 'ZIP',
        size: '15.2MB'
      }
    ]
  },
  {
    id: 'lab1',
    courseId: 'CS301',
    title: 'Algorithm Analysis Lab',
    description: 'Analyze and compare sorting algorithms performance. Implement and test bubble sort, merge sort, and quick sort.',
    type: 'lab',
    dueDate: '2024-04-18',
    points: 100,
    status: 'graded',
    submission: {
      date: '2024-04-17',
      file: 'lab_report.pdf',
      feedback: 'Excellent analysis of algorithm complexity. Well documented code.',
      grade: 95
    },
    attachments: [
      {
        name: 'lab_manual.pdf',
        type: 'PDF',
        size: '1.8MB'
      }
    ]
  },
  {
    id: 'lab2',
    courseId: 'CS401',
    title: 'Machine Learning Lab',
    description: 'Implement a neural network from scratch. Include training, testing, and visualization of results.',
    type: 'lab',
    dueDate: '2024-04-20',
    points: 100,
    status: 'upcoming',
    attachments: [
      {
        name: 'lab_manual.pdf',
        type: 'PDF',
        size: '3.5MB'
      },
      {
        name: 'dataset.zip',
        type: 'ZIP',
        size: '15.2MB'
      }
    ]
  },
  {
    id: 'exam1',
    courseId: 'CS201',
    title: 'Data Structures Midterm',
    description: 'Comprehensive exam covering arrays, linked lists, trees, and graphs. Includes implementation and analysis questions.',
    type: 'exam',
    dueDate: '2024-04-30',
    points: 300,
    status: 'upcoming',
    attachments: [
      {
        name: 'exam_guidelines.pdf',
        type: 'PDF',
        size: '1.8MB'
      },
      {
        name: 'practice_problems.pdf',
        type: 'PDF',
        size: '2.3MB'
      }
    ]
  },
  {
    id: 'exam2',
    courseId: 'CS301',
    title: 'Algorithms Final',
    description: 'Final examination covering sorting, searching, graph algorithms, and dynamic programming. Show all work for partial credit.',
    type: 'exam',
    dueDate: '2024-05-10',
    points: 400,
    status: 'upcoming',
    attachments: [
      {
        name: 'exam_syllabus.pdf',
        type: 'PDF',
        size: '1.5MB'
      }
    ]
  },
  {
    id: 'hw3',
    courseId: 'CS301',
    title: 'Algorithm Analysis',
    description: 'Analyze the time complexity of various sorting algorithms and implement them in Python. Compare their performance on different input sizes.',
    type: 'homework',
    dueDate: '2024-04-22',
    points: 120,
    status: 'upcoming',
    attachments: [
      {
        name: 'algorithm_analysis.pdf',
        type: 'PDF',
        size: '1.8MB'
      }
    ]
  },
  {
    id: 'quiz3',
    courseId: 'CS301',
    title: 'Algorithm Complexity Quiz',
    description: 'Quiz covering Big O notation, time complexity analysis, and algorithm optimization techniques.',
    type: 'quiz',
    dueDate: '2024-04-25',
    points: 60,
    status: 'upcoming',
    attachments: [
      {
        name: 'complexity_notes.pdf',
        type: 'PDF',
        size: '1.2MB'
      }
    ]
  },
  {
    id: 'proj3',
    courseId: 'CS401',
    title: 'Database Design Project',
    description: 'Design and implement a relational database for a university management system. Include ER diagrams, normalization, and SQL queries.',
    type: 'project',
    dueDate: '2024-05-01',
    points: 200,
    status: 'upcoming',
    attachments: [
      {
        name: 'project_requirements.pdf',
        type: 'PDF',
        size: '2.5MB'
      },
      {
        name: 'sample_data.sql',
        type: 'SQL',
        size: '1.1MB'
      }
    ]
  },
  {
    id: 'lab3',
    courseId: 'CS201',
    title: 'Binary Search Tree Lab',
    description: 'Implement a binary search tree with insertion, deletion, and traversal operations. Include unit tests and performance analysis.',
    type: 'lab',
    dueDate: '2024-04-28',
    points: 100,
    status: 'upcoming',
    attachments: [
      {
        name: 'lab_manual.pdf',
        type: 'PDF',
        size: '1.5MB'
      }
    ]
  },
  {
    id: 'exam3',
    courseId: 'CS401',
    title: 'Database Systems Final',
    description: 'Comprehensive exam covering database design, SQL, normalization, and transaction management.',
    type: 'exam',
    dueDate: '2024-05-15',
    points: 300,
    status: 'upcoming',
    attachments: [
      {
        name: 'exam_guidelines.pdf',
        type: 'PDF',
        size: '1.8MB'
      },
      {
        name: 'practice_questions.pdf',
        type: 'PDF',
        size: '2.1MB'
      }
    ]
  }
]; 