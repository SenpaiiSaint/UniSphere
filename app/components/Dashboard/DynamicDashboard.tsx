'use client';

import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./Dashboard').then(mod => mod.Dashboard), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
  ssr: false
});

export default function DynamicDashboard() {
  return <Dashboard />;
} 