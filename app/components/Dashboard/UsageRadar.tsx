"use client";

import React from "react";
import { pie, arc, PieArcDatum } from "d3";
import { FiEye } from "react-icons/fi";

type DataItem = {
  name: string;
  value: number;
  logo: string;
  color: string;
};

const data: DataItem[] = [
  {
    name: "Apple",
    value: 731,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/1001/1001_494D5A_F7F7F7.svg",
    color: "text-pink-400",
  },
  {
    name: "Mercedes",
    value: 631,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/1206/1206_2F3350_F7F7F7.svg",
    color: "text-purple-400",
  },
  {
    name: "Palantir",
    value: 331,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/7991/7991_2C2C2C_F7F7F7.svg",
    color: "text-indigo-400",
  },
  {
    name: "Google",
    value: 232,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/1002/1002_3183FF_F7F7F7.svg",
    color: "text-sky-400",
  },
  {
    name: "Tesla",
    value: 101,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/1007/1007_F7F7F7_2C2C2C.svg",
    color: "text-lime-400",
  },
  {
    name: "Meta",
    value: 42,
    logo: "https://etoro-cdn.etorostatic.com/market-avatars/1008/1008_F7F7F7_2C2C2C.svg",
    color: "text-amber-400",
  },
];

export function FunnelChart() {
  // Chart dimensions
  const radius = Math.PI * 100;
  const gap = 0.02; // Gap between slices

  // Create the pie layout and arc generators
  const pieLayout = pie<DataItem>()
    .value((d) => d.value)
    .padAngle(gap);

  const arcGenerator = arc<PieArcDatum<DataItem>>()
    .innerRadius(20)
    .outerRadius(radius)
    .cornerRadius(8);

  const labelRadius = radius * 0.8;
  const arcLabel = arc<PieArcDatum<DataItem>>()
    .innerRadius(labelRadius)
    .outerRadius(labelRadius);

  const arcs = pieLayout(data);

  // Compute angle for a given arc (in degrees)
  const computeAngle = (d: PieArcDatum<DataItem>) =>
    ((d.endAngle - d.startAngle) * 180) / Math.PI;

  // Minimum angle to display the label elements
  const MIN_ANGLE = 20;

  return (
    <div className="p-6">
      <div className="relative max-w-[16rem] mx-auto">
        <svg
          viewBox={`-${radius} -${radius} ${radius * 2} ${radius * 2}`}
          className="overflow-visible"
        >
          {/* Connecting lines */}
          {arcs.map((d, i) => {
            const labelCentroid = arcLabel.centroid(d);
            const arcCentroid = arcGenerator.centroid(d);
            if (!labelCentroid || !arcCentroid) return null;
            const [labelX, labelY] = labelCentroid;
            const [arcX, arcY] = arcCentroid;
            const LINE_LENGTH = 1.35;
            return (
              <g key={`line-${i}`} className="pointer-events-none">
                <line
                  x1={arcX}
                  y1={arcY}
                  x2={labelX * LINE_LENGTH}
                  y2={labelY * LINE_LENGTH}
                  stroke="currentColor"
                  className={d.data.color}
                  strokeWidth={4}
                />
              </g>
            );
          })}

          {/* Slices */}
          {arcs.map((d: PieArcDatum<DataItem>, i) => {
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

        {/* Labels as absolutely positioned divs */}
        <div className="absolute inset-0 pointer-events-none">
          {arcs.map((d: PieArcDatum<DataItem>, i) => {
            const labelCentroid = arcLabel.centroid(d);
            if (!labelCentroid) return null;
            const [x, y] = labelCentroid;
            const CENTER_PCT = 50;
            const logoLeft = `${CENTER_PCT + (x / radius) * 40}%`;
            const logoTop = `${CENTER_PCT + (y / radius) * 40}%`;
            const valueLeft = `${CENTER_PCT + (x / radius) * 74}%`;
            const valueTop = `${CENTER_PCT + (y / radius) * 72}%`;
            const angle = computeAngle(d);
            return (
              <div key={i}>
                <div
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                  style={{ left: valueLeft, top: valueTop }}
                >
                  {d.data.value}
                </div>
                {angle >= MIN_ANGLE && (
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: logoLeft,
                      top: logoTop,
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  >
                    <img src={d.data.logo} alt={d.data.name} />
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
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiEye /> Usage
        </h3>
      </div>
      <FunnelChart />
    </div>
  );
};
