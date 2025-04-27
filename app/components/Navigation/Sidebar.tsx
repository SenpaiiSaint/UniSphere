"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiPlus,
  FiMessageCircle,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import {
  SunIcon,
  MoonIcon,
  ClockIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import { AccountToggle } from "./AccountToggle";
import { Button } from "../UI/Button";

export type MenuItem = {
  title: string;
  Icon: IconType;
  path: string;
  badge?: number;
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", Icon: FiHome, path: "/" },
  { title: "Courses", Icon: FiBook, path: "/courses", badge: 2 },
  { title: "Students", Icon: FiUsers, path: "/students" },
  { title: "Schedule", Icon: FiCalendar, path: "/schedule", badge: 1 },
  { title: "Assignments", Icon: FiFileText, path: "/assignments", badge: 3 },
  { title: "Grades", Icon: FiBarChart2, path: "/grades" },
  { title: "Messages", Icon: FiMail, path: "/messages", badge: 5 },
  { title: "Settings", Icon: FiSettings, path: "/settings" },
];

const quickActions = [
  { icon: FiPlus, label: "New Assignment", action: () => {} },
  { icon: FiCalendar, label: "Schedule Class", action: () => {} },
  { icon: FiMessageCircle, label: "Send Announcement", action: () => {} },
];

const recentActivity = [
  { title: "CS101 Homework Due", time: "2h ago" },
  { title: "New Course Material", time: "5h ago" },
];

const shortcuts = [
  { key: "⌘K", action: "Open Command Menu" },
  { key: "⌘N", action: "New Assignment" },
  { key: "⌘S", action: "Save Changes" },
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    if (!mounted) return;

    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowShortcuts((v) => !v);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 bg-white
        border-r border-gray-200
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
          {!isCollapsed && (
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              University Portal
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapse(!isCollapsed)}
            className="p-1.5"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FiChevronsRight className="w-5 h-5 text-gray-500" />
            ) : (
              <FiChevronsLeft className="w-5 h-5 text-gray-500" />
            )}
          </Button>
        </div>

        {/* Account Toggle */}
        <div className="px-4 py-4 border-b border-gray-200">
          <AccountToggle />
        </div>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Quick Actions
            </h2>
            <div className="space-y-1.5">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.action}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <action.icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.title}
                href={item.path}
                className={`
                  flex items-center transition-all duration-200 ${
                    isCollapsed ? "justify-center px-2" : "px-4"
                  } py-2.5 text-sm font-medium rounded-lg mx-2 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
                `}
              >
                <item.Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                {!isCollapsed && (
                  <>
                    <span className="ml-3">{item.title}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Recent Activity */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <ClockIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{act.title}</p>
                    <p className="text-xs text-gray-500">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-500">Online</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } theme`}
            >
              {theme === "light" ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {!isCollapsed && (
              <button
                onClick={() => setShowShortcuts(true)}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                <CommandLineIcon className="w-4 h-4" />
                <span>Shortcuts</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h2>
            <div className="space-y-3">
              {shortcuts.map((shortcut, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-600">{shortcut.action}</span>
                  <kbd className="px-2.5 py-1 bg-gray-100 rounded-lg text-sm font-medium">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
