"use client";

import React, { useState, lazy, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiTrendingUp,
  FiHelpCircle,
  FiBell,
  FiSearch,
} from "react-icons/fi";
import DashboardSettings from "../components/Student/DashboardSettings";
import LazySection from "../components/Student/LazySection";

// Lazy load components
const QuickActions = lazy(() => import("../components/Student/QuickActions"));
const StudentDashboard = lazy(
  () => import("../components/Student/StudentDashboard")
);
const StudyGroupFinder = lazy(
  () => import("../components/Student/StudyGroupFinder")
);
const StudyGroupCalendar = lazy(
  () => import("../components/Student/StudyGroupCalendar")
);
const StudyGroupChat = lazy(
  () => import("../components/Student/StudyGroupChat")
);
const ResourceLibrary = lazy(
  () => import("../components/Student/ResourceLibrary")
);
const ProgressTracking = lazy(
  () => import("../components/Student/ProgressTracking")
);
const ProgressAnalytics = lazy(
  () => import("../components/Student/ProgressAnalytics")
);
const CourseRecommendations = lazy(
  () => import("../components/Student/CourseRecommendations")
);
const AcademicProgress = lazy(
  () => import("../components/Student/AcademicProgress")
);
const SupportTickets = lazy(
  () => import("../components/Student/SupportTickets")
);

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Tab configuration
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "study", label: "Study Groups", icon: FiUsers },
  { id: "resources", label: "Resources", icon: FiBook },
  { id: "progress", label: "Progress", icon: FiTrendingUp },
  { id: "support", label: "Support", icon: FiHelpCircle },
];

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState({
    quickActions: true,
    studyGroups: false,
    resources: false,
    progress: false,
  });
  const [showWelcome, setShowWelcome] = useState(true);

  type SectionKey = keyof typeof expandedSections;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Welcome Toast */}
      {showWelcome && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-blue-600">
            <h3 className="font-semibold text-gray-900">Welcome back!</h3>
            <p className="text-sm text-gray-600">
              You have 2 upcoming study sessions today.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Student Portal
              </h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <FiBell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <DashboardSettings />
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex space-x-2 p-4 border-t border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                    : "text-gray-600 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Classes</p>
                <p className="text-2xl font-semibold">3</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiBook className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Study Groups</p>
                <p className="text-2xl font-semibold">2</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FiUsers className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Assignments Due</p>
                <p className="text-2xl font-semibold">4</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Support Tickets</p>
                <p className="text-2xl font-semibold">1</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiHelpCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="transition-all duration-300 ease-in-out">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <LazySection>
                    <QuickActions />
                  </LazySection>
                  <LazySection>
                    <StudentDashboard />
                  </LazySection>
                </div>
                <div className="space-y-8">
                  <LazySection>
                    <CourseRecommendations />
                  </LazySection>
                  <LazySection>
                    <AcademicProgress />
                  </LazySection>
                </div>
              </div>
            </div>
          )}

          {/* Study Groups Tab */}
          {activeTab === "study" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <LazySection>
                  <StudyGroupFinder />
                </LazySection>
                <LazySection>
                  <StudyGroupCalendar />
                </LazySection>
              </div>
              <LazySection>
                <StudyGroupChat />
              </LazySection>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <div className="space-y-8">
              <LazySection>
                <ResourceLibrary />
              </LazySection>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div className="space-y-8">
              <LazySection>
                <ProgressTracking />
              </LazySection>
              <LazySection>
                <ProgressAnalytics />
              </LazySection>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === "support" && (
            <div className="space-y-8">
              <LazySection>
                <SupportTickets />
              </LazySection>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
