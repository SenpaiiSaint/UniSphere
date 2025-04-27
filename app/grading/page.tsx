'use client';

import { RubricGrading } from '@/app/components/Grading/RubricGrading';
import { LateSubmissionHandler } from '@/app/components/Grading/LateSubmissionHandler';
import { mockSubmissions } from '@/app/data/mockData';

export default function GradingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Grading Tools</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Rubric Grading</h2>
          <RubricGrading onSave={(rubric) => {
            console.log('Saving rubric:', rubric);
          }} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Late Submissions</h2>
          <LateSubmissionHandler 
            submissions={mockSubmissions.map(sub => ({
              ...sub,
              dueDate: sub.dueDate.toISOString(),
              submittedDate: sub.submittedDate.toISOString()
            }))}
            onUpdateGrade={(id, grade) => {
              console.log(`Updating grade for submission ${id} to ${grade}`);
            }}
          />
        </div>
      </div>
    </div>
  );
} 