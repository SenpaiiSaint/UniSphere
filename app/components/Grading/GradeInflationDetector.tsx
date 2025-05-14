"use client";

import React, { useState } from "react";
import { FiAlertTriangle, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

interface GradeData {
  year: string;
  averageGrade: number;
  studentCount: number;
}

interface GradeInflationDetectorProps {
  courseId: string;
  historicalData: GradeData[];
}

export const GradeInflationDetector = ({
  historicalData,
}: GradeInflationDetectorProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const calculateTrend = (data: GradeData[]) => {
    if (data.length < 2) return null;

    const firstYear = data[0].averageGrade;
    const lastYear = data[data.length - 1].averageGrade;
    const difference = lastYear - firstYear;
    const percentageChange = (difference / firstYear) * 100;

    return {
      trend: difference > 0 ? "inflation" : "deflation",
      percentage: Math.abs(percentageChange),
      significant: Math.abs(percentageChange) > 5,
    };
  };

  const suggestNormalization = (data: GradeData[]) => {
    const trend = calculateTrend(data);
    if (!trend) return null;

    if (trend.trend === "inflation" && trend.significant) {
      return {
        action: "decrease",
        suggestedCurve: data.map((d) => ({
          year: d.year,
          adjustedGrade: Math.max(
            0,
            d.averageGrade - (trend.percentage / 100) * d.averageGrade
          ),
        })),
      };
    } else if (trend.trend === "deflation" && trend.significant) {
      return {
        action: "increase",
        suggestedCurve: data.map((d) => ({
          year: d.year,
          adjustedGrade: Math.min(
            100,
            d.averageGrade + (trend.percentage / 100) * d.averageGrade
          ),
        })),
      };
    }
    return null;
  };

  const trend = calculateTrend(historicalData);
  const normalization = suggestNormalization(historicalData);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Grade Trend Analysis</h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      {trend && (
        <div className="mb-4">
          <div
            className={`flex items-center gap-2 p-3 rounded-lg ${
              trend.trend === "inflation"
                ? "bg-yellow-50 text-yellow-800"
                : "bg-blue-50 text-blue-800"
            }`}
          >
            {trend.trend === "inflation" ? (
              <FiTrendingUp className="w-5 h-5" />
            ) : (
              <FiTrendingDown className="w-5 h-5" />
            )}
            <span>
              {trend.trend === "inflation"
                ? "Grade Inflation"
                : "Grade Deflation"}{" "}
              Detected
            </span>
            <span className="font-medium">
              ({trend.percentage.toFixed(1)}%{" "}
              {trend.trend === "inflation" ? "increase" : "decrease"})
            </span>
          </div>
        </div>
      )}

      {normalization && (
        <div className="mb-4">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 text-purple-800">
            <FiAlertTriangle className="w-5 h-5" />
            <span>Suggested Grade Normalization</span>
          </div>
          {showDetails && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Proposed Adjustments:</h3>
              <div className="space-y-2">
                {normalization.suggestedCurve.map((adjustment, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{adjustment.year}:</span>
                    <span>
                      {adjustment.adjustedGrade.toFixed(1)} (adjusted from{" "}
                      {historicalData[index].averageGrade.toFixed(1)})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showDetails && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Historical Data</h3>
          <div className="space-y-2">
            {historicalData.map((data, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{data.year}:</span>
                <span>
                  {data.averageGrade.toFixed(1)} (n={data.studentCount})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
