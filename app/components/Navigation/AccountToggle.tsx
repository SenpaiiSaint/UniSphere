"use client";

import React from "react";
import { FiUser } from "react-icons/fi";

export const AccountToggle = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900 flex items-center justify-center">
        <FiUser className="w-4 h-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-900 truncate">
          Dr. Sarah Johnson
        </div>
        <div className="text-xs font-medium text-gray-700 truncate">
          Computer Science
        </div>
      </div>
    </div>
  );
};
