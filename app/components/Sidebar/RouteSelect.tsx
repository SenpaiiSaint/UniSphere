"use client"

import React, { useState } from "react";
import {
  FiHome,
  FiActivity,
  FiBriefcase,
  FiShield,
  FiSettings,
} from "react-icons/fi";
import { IconType } from "react-icons";

type MenuItem = {
  title: string;
  Icon: IconType;
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", Icon: FiHome },
  { title: "Workflows & Automation", Icon: FiActivity },
  { title: "Business Insights", Icon: FiBriefcase },
  { title: "Security & System", Icon: FiShield },
  { title: "Settings", Icon: FiSettings },
];

export const RouteSelect = () => {
  // State to track the currently selected menu item
  const [selectedRoute, setSelectedRoute] = useState<string>("Dashboard");

  return (
    <div className="space-y-1">
      {menuItems.map((item) => (
        <Route
          key={item.title}
          title={item.title}
          Icon={item.Icon}
          selected={selectedRoute === item.title}
          onSelect={() => setSelectedRoute(item.title)}
        />
      ))}
    </div>
  );
};

type RouteProps = {
  selected: boolean;
  Icon: IconType;
  title: string;
  onSelect: () => void;
};

const Route = ({ selected, Icon, title, onSelect }: RouteProps) => {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors
        ${
          selected
            ? "bg-white text-stone-950 shadow-md"
            : "bg-transparent text-stone-500 hover:bg-stone-200 hover:shadow-sm"
        }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
