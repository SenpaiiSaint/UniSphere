"use client";

import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import { FiBook } from "react-icons/fi";

type CourseData = {
  name: string;
  value: number;
  color: string;
  enrollment: number;
  avgGrade: string;
};

const courseData: CourseData[] = [
  {
    name: "CS101",
    value: 35,
    color: "text-blue-400",
    enrollment: 35,
    avgGrade: "B+",
  },
  {
    name: "CS201",
    value: 28,
    color: "text-green-400",
    enrollment: 28,
    avgGrade: "A-",
  },
  {
    name: "CS301",
    value: 25,
    color: "text-purple-400",
    enrollment: 25,
    avgGrade: "B",
  },
  {
    name: "CS401",
    value: 20,
    color: "text-yellow-400",
    enrollment: 20,
    avgGrade: "A",
  },
  {
    name: "CS501",
    value: 12,
    color: "text-red-400",
    enrollment: 12,
    avgGrade: "B+",
  },
];

export function CourseDistributionChart() {
  const radius = Math.round(Math.PI * 100);
  const gap = 0.02;

  const pieLayout = pie<CourseData>()
    .value((d) => d.value)
    .padAngle(gap);

  const arcGenerator = arc<PieArcDatum<CourseData>>()
    .innerRadius(20)
    .outerRadius(radius)
    .cornerRadius(8);

  const labelRadius = Math.round(radius * 0.8);
  const arcLabel = arc<PieArcDatum<CourseData>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(courseData);

  const computeAngle = (d: PieArcDatum<CourseData>) =>
    Math.round(((d.endAngle - d.startAngle) * 180) / Math.PI);

  const MIN_ANGLE = 20;

  return (
    <div className="p-6">
      <div className="relative max-w-[16rem] mx-auto">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className="overflow-visible"
        >
          {arcs.map((d, i) => {
            const labelCentroid = arcLabel.centroid(d);
            const arcCentroid = arcGenerator.centroid(d);
            if (!labelCentroid || !arcCentroid) return null;
            const [labelX, labelY] = labelCentroid.map(Math.round);
            const [arcX, arcY] = arcCentroid.map(Math.round);
            const LINE_LENGTH = 1.35;
            return (
              <g key={`line-${i}`} className="pointer-events-none">
                <line
                  x1={arcX}
                  y1={arcY}
                  x2={Math.round(labelX * LINE_LENGTH)}
                  y2={Math.round(labelY * LINE_LENGTH)}
                  stroke="currentColor"
                  className={d.data.color}
                  strokeWidth={4}
                />
              </g>
            );
          })}

          {arcs.map((d: PieArcDatum<CourseData>, i) => {
            const pathData = arcGenerator(d);
            if (!pathData) return null;
            return (
              <path
                key={i}
                fill="currentColor"
                d={pathData}
                className={`${d.data.color}`}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 pointer-events-none">
          {arcs.map((d: PieArcDatum<CourseData>, i) => {
            const labelCentroid = arcLabel.centroid(d);
            if (!labelCentroid) return null;
            const [x, y] = labelCentroid;
            const CENTER_PCT = 50;
            const courseLeft = `${CENTER_PCT + (x / radius) * 40}%`;
            const courseTop = `${CENTER_PCT + (y / radius) * 40}%`;
            const valueLeft = `${CENTER_PCT + (x / radius) * 74}%`;
            const valueTop = `${CENTER_PCT + (y / radius) * 72}%`;
            const angle = computeAngle(d);
            return (
              <div key={i}>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: valueLeft, top: valueTop }}
                >
                  {d.data.enrollment}
                </div>
                {angle >= MIN_ANGLE && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{
                      left: courseLeft,
                      top: courseTop,
                    }}
                  >
                    <div className="text-xs font-medium">{d.data.name}</div>
                    <div className="text-xs text-gray-500">
                      {d.data.avgGrade}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const UsageRadar = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded-lg bg-white shadow-sm border border-stone-200">
      <div className="p-4 border-b border-stone-200">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-700">
          <FiBook className="w-4 h-4 text-blue-600" />
          Course Distribution
        </h3>
      </div>
      <CourseDistributionChart />
      <div className="p-4 border-t border-stone-200">
        <div className="grid grid-cols-5 gap-2">
          {courseData.map((course) => (
            <div key={course.name} className="text-center">
              <div className="text-sm font-medium">{course.name}</div>
              <div className="text-xs text-gray-500">
                {course.enrollment} students
              </div>
              <div
                className="text-xs font-medium"
                style={{ color: course.color.replace("text-", "") }}
              >
                {course.avgGrade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
