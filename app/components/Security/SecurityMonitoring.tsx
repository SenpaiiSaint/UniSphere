"use client";

import React, { useState } from "react";
import { SecurityAlert } from "@/app/types/security";
import { FiAlertCircle, FiClock, FiFilter } from "react-icons/fi";

interface SecurityMonitoringProps {
  alerts: SecurityAlert[];
}

export default function SecurityMonitoring({
  alerts,
}: SecurityMonitoringProps) {
  const [filter, setFilter] = useState<
    "all" | "critical" | "high" | "medium" | "low"
  >("all");

  const filteredAlerts = alerts.filter(
    (alert) => filter === "all" || alert.severity === filter
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <FiAlertCircle className="text-blue-500" />
          Security Monitoring
        </h2>
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No alerts to display
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      alert.status
                    )}`}
                  >
                    {alert.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <FiClock className="w-4 h-4" />
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <h3 className="font-medium mb-2">{alert.message}</h3>
              <div className="text-sm text-gray-600">
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(alert.details, null, 2)}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
