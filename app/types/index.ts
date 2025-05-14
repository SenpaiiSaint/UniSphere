// Core Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "completed" | "upcoming";
  students: string[];
  assignments: string[];
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  points: number;
  type: "homework" | "quiz" | "exam" | "project" | "lab";
  status: "draft" | "published" | "graded";
  submissions: Submission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: Attachment[];
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  status: "submitted" | "graded" | "late";
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  grade: number;
  feedback?: string;
  gradedBy: string;
  gradedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachments: Attachment[];
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface Schedule {
  id: string;
  courseId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  location: string;
  type: "lecture" | "lab" | "office-hours";
}

// Settings Types
export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    announcements: boolean;
    grades: boolean;
    assignments: boolean;
  };
  grading: {
    latePenalty: number;
    rounding: "up" | "down" | "nearest";
    gradeScale: Record<string, number>;
  };
  appearance: {
    theme: "light" | "dark" | "system";
    fontSize: number;
    density: "comfortable" | "compact";
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form Types
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// UI Types
export interface Toast {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    background: string;
    text: string;
    border: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
}
