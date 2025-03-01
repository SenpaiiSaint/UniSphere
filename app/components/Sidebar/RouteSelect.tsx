import React from "react";
import {
  FiHome,
  FiActivity,
  FiBriefcase,
  FiShield,
  FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" />
      <Route Icon={FiActivity} selected={false} title="Workflows & Automation" />
      <Route Icon={FiBriefcase} selected={false} title="Business Insights" />
      <Route Icon={FiShield} selected={false} title="Security & System" />
      <Route Icon={FiSettings} selected={false} title="Settings" />
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
}) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors
    ${
      selected
        ? "bg-white text-stone-950 shadow-md"
        : "bg-transparent text-stone-500 hover:bg-stone-200 hover:shadow-sm"
    }`}
    >
      <Icon className={selected ? "text-violet-500": ""}/>
      <span>{title}</span>
    </button>
  );
};
