'use client';

import React, { useState } from 'react';
import { FiClock, FiSettings } from 'react-icons/fi';

interface Submission {
  id: string;
  studentName: string;
  assignmentName: string;
  dueDate: string;
  submittedDate: string;
  originalGrade: number;
  lateDays: number;
  penalty: number;
  finalGrade: number;
}

interface LateSubmissionHandlerProps {
  submissions: Submission[];
  onUpdateGrade: (submissionId: string, finalGrade: number) => void;
}

export const LateSubmissionHandler = ({ submissions, onUpdateGrade }: LateSubmissionHandlerProps) => {
  const [penaltyRate, setPenaltyRate] = useState(10); // Default 10% per day
  const [showSettings, setShowSettings] = useState(false);

  const calculateLateDays = (dueDate: string, submittedDate: string) => {
    const due = new Date(dueDate);
    const submitted = new Date(submittedDate);
    const diffTime = submitted.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculatePenalty = (lateDays: number) => {
    return Math.min(100, lateDays * penaltyRate);
  };

  const calculateFinalGrade = (originalGrade: number, penalty: number) => {
    return Math.max(0, originalGrade - penalty);
  };

  const handleUpdateGrade = (submission: Submission) => {
    const lateDays = calculateLateDays(submission.dueDate, submission.submittedDate);
    const penalty = calculatePenalty(lateDays);
    const finalGrade = calculateFinalGrade(submission.originalGrade, penalty);
    onUpdateGrade(submission.id, finalGrade);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Late Submissions</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <FiSettings className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <label className="text-sm text-gray-600">Penalty Rate:</label>
            <input
              type="number"
              value={penaltyRate}
              onChange={(e) => setPenaltyRate(parseInt(e.target.value))}
              min="0"
              max="100"
              className="w-20 px-3 py-2 border rounded-lg"
            />
            <span className="text-sm text-gray-600">% per day</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {submissions.map(submission => {
          const lateDays = calculateLateDays(submission.dueDate, submission.submittedDate);
          const penalty = calculatePenalty(lateDays);
          const finalGrade = calculateFinalGrade(submission.originalGrade, penalty);

          return (
            <div key={submission.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-medium">{submission.studentName}</div>
                  <div className="text-sm text-gray-600">{submission.assignmentName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">{lateDays} days late</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="text-sm text-gray-600">Due Date</div>
                  <div className="font-medium">{new Date(submission.dueDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Submitted Date</div>
                  <div className="font-medium">{new Date(submission.submittedDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Original Grade</div>
                  <div className="font-medium">{submission.originalGrade}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Penalty</div>
                  <div className="font-medium text-red-600">-{penalty}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Final Grade</div>
                  <div className="font-medium">{finalGrade}%</div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => handleUpdateGrade(submission)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                  >
                    Apply Penalty
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 