import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Gross Revenue" 
        value="$100,000,000" 
        pillText="10%" 
        trend="up" 
        period="From Jan 1st - Marc 3rd" 
        />
      <Card 
      title="Avg Order" 
      value="$10,000" 
      pillText="10%" 
      trend="up" 
      period="From Jan 1st - Marc 3rd" 
      />
      
      <Card 
      title="Trailing Year" 
      value="$500,000,000" 
      pillText="10%" 
      trend="down" 
      period="Previous 365 Days" 
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
   }: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return <div className="col-span-4 p-4 rounded border border-stone-300">
    <div className="flex mb-8 items-start justify-between">
        <div>
            <h3 className="text-stone-500 mb-2 text-sm">
                {title}
            </h3>
            <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
            {pillText}
        </span>
    </div>
  </div>;
};
