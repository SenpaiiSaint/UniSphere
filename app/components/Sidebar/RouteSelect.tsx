"use client";

import React, { useState } from "react";
import { motion } from "motion/react"
import {
  FiHome,
  FiActivity,
  FiBriefcase,
  FiShield,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";

type MenuItem = {
  title: string;
  Icon: IconType;
  subItems?: MenuItem[];
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    Icon: FiHome,
    subItems: [
      { title: "Overview", Icon: FiHome },
      { title: "Stats", Icon: FiActivity },
    ],
  },
  {
    title: "Workflows",
    Icon: FiActivity,
    subItems: [
      { title: "Automation", Icon: FiActivity },
      { title: "Tasks", Icon: FiBriefcase },
    ],
  },
  {
    title: "Business Insights",
    Icon: FiBriefcase,
    subItems: [
      {title: "Revenue Analytics", Icon: FiShield},
      { title: "ROI Analysis", Icon: FiSettings },
    ]
  },
  {
    title: "Security & System",
    Icon: FiShield,
    subItems: [
      { title: "Security", Icon: FiShield },
      { title: "System", Icon: FiSettings },
    ],
  },
  {
    title: "Settings",
    Icon: FiSettings,
  },
];

export const RouteSelect = () => {
  const [selectedRoute, setSelectedRoute] = useState<string>("Dashboard");
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedRoutes((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-1">
      {menuItems.map((item) => (
        <div key={item.title}>
          <Route
            title={item.title}
            Icon={item.Icon}
            selected={selectedRoute === item.title}
            hasSubItems={!!item.subItems}
            isExpanded={expandedRoutes.includes(item.title)}
            onSelect={() => setSelectedRoute(item.title)}
            onToggleExpand={() => toggleExpand(item.title)}
          />

          {item.subItems && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: expandedRoutes.includes(item.title) ? "auto" : 0, opacity: expandedRoutes.includes(item.title) ? 1 : 0 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="ml-4 space-y-1">
                {item.subItems.map((subItem) => (
                  <Route
                    key={subItem.title}
                    title={subItem.title}
                    Icon={subItem.Icon}
                    selected={selectedRoute === subItem.title}
                    hasSubItems={false}
                    isExpanded={false}
                    onSelect={() => setSelectedRoute(subItem.title)}
                    onToggleExpand={() => {}}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

type RouteProps = {
  selected: boolean;
  Icon: IconType;
  title: string;
  hasSubItems: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
};

const Route = ({
  selected,
  Icon,
  title,
  hasSubItems,
  isExpanded,
  onSelect,
  onToggleExpand,
}: RouteProps) => {
  return (
    <button
      onClick={() => {
        if (hasSubItems) {
          onToggleExpand();
        } else {
          onSelect();
        }
      }}
      className={`flex items-center justify-between gap-2 w-full rounded px-2 py-1.5 text-sm transition-colors
        ${
          selected
            ? "bg-white text-stone-950 shadow-md"
            : "bg-transparent text-stone-500 hover:bg-stone-200 hover:shadow-sm"
        }`}
    >
      <div className="flex items-center gap-2">
        <Icon className={selected ? "text-violet-500" : ""} />
        <span>{title}</span>
      </div>
      {hasSubItems && (
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs"
        >
          <FiChevronDown />
        </motion.span>
      )}
    </button>
  );
};
