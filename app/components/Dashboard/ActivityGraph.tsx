"use client";

import React from "react";
import { FiActivity, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: "#e5e7eb",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index" as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false,
        color: "#e5e7eb",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
};

const activityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      type: "bar" as const,
      label: "Assignments",
      data: [12, 19, 15, 25, 22, 8, 5],
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3b82f6",
      borderWidth: 1,
    },
    {
      type: "bar" as const,
      label: "Quizzes",
      data: [8, 12, 10, 15, 18, 6, 3],
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "#10b981",
      borderWidth: 1,
    },
  ],
};

const engagementData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Course Engagement",
      data: [65, 78, 90, 81, 56, 55, 40],
      borderColor: "#8b5cf6",
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      fill: true,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const metrics = [
  {
    title: "Weekly Assignments",
    value: "87",
    change: "+12%",
    trend: "up",
    color: "text-blue-600",
  },
  {
    title: "Quiz Completion",
    value: "72",
    change: "+8%",
    trend: "up",
    color: "text-green-600",
  },
  {
    title: "Course Engagement",
    value: "65%",
    change: "-5%",
    trend: "down",
    color: "text-purple-600",
  },
];

export const ActivityGraph = () => {
  return (
    <div
      className="col-span-8 overflow-hidden rounded-lg bg-white shadow-sm border border-stone-200"
      suppressHydrationWarning
    >
      <div className="p-4 border-b border-stone-200">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-700">
          <FiActivity className="w-4 h-4 text-blue-600" />
          Academic Activity
        </h3>
      </div>
      <div className="p-4">
        {/* Metrics Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">{metric.title}</div>
              <div className="flex items-baseline gap-2">
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                <div
                  className={`text-sm flex items-center gap-1 ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <FiTrendingUp className="w-4 h-4" />
                  ) : (
                    <FiTrendingDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Assignments & Quizzes
            </h4>
            <div className="h-48">
              <Bar options={barOptions} data={activityData} />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Course Engagement
            </h4>
            <div className="h-48">
              <Line options={lineOptions} data={engagementData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
