'use client'

import React from "react";
import { FiTrendingDown, FiTrendingUp, FiBook, FiUsers, FiFileText, FiAward } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Active Courses"
        value="4"
        icon={<FiBook className="w-5 h-5 text-blue-600" />}
        pillText="+1"
        trend="up"
        period="This Semester"
      />
      <Card
        title="Total Students"
        value="120"
        icon={<FiUsers className="w-5 h-5 text-green-600" />}
        pillText="+15"
        trend="up"
        period="Across All Courses"
      />
      <Card
        title="Pending Assignments"
        value="8"
        icon={<FiFileText className="w-5 h-5 text-yellow-600" />}
        pillText="-2"
        trend="down"
        period="To Be Graded"
      />
      <Card
        title="Average Grade"
        value="B+"
        icon={<FiAward className="w-5 h-5 text-purple-600" />}
        pillText="+5%"
        trend="up"
        period="Current Semester"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  icon,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-3 p-4 rounded-lg bg-white shadow-sm border border-stone-200">
      <div className="flex mb-4 items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-opacity-10">
            {icon}
          </div>
          <div>
            <h3 className="text-stone-500 text-sm font-medium">
              {title}
            </h3>
            <p className="text-2xl font-semibold mt-1">{value}</p>
          </div>
        </div>

        <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded-full ${
          trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {trend === "up" ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
          {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
