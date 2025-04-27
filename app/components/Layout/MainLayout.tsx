'use client';

import { useState } from 'react';
import { Sidebar } from '../Navigation/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      <main className={`${isCollapsed ? 'pl-16' : 'pl-64'} transition-all duration-300 min-h-screen`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
} 