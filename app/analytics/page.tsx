'use client';

import { AnalyticsDashboard } from '@/app/components/Analytics/AnalyticsDashboard';
import { StudentRiskDetector } from '@/app/components/Grading/StudentRiskDetector';
import { GradeInflationDetector } from '@/app/components/Grading/GradeInflationDetector';
import { mockGradeData } from '@/app/data/mockData';

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <AnalyticsDashboard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudentRiskDetector courseId="1" />
          <GradeInflationDetector courseId="1" historicalData={mockGradeData} />
        </div>
      </div>
    </div>
  );
} 