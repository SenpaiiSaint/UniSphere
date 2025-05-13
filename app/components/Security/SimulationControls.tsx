"use client";

import React, { useState } from "react";
import {
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiSettings,
  FiAlertTriangle,
} from "react-icons/fi";

interface SimulationControlsProps {
  onToggle: (enabled: boolean) => void;
  onSpeedChange: (speed: "slow" | "normal" | "fast") => void;
}

export default function SimulationControls({
  onToggle,
  onSpeedChange,
}: SimulationControlsProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState<
    "slow" | "normal" | "fast"
  >("normal");
  const [showSettings, setShowSettings] = useState(false);

  const handleSimulationToggle = () => {
    const newState = !isSimulating;
    setIsSimulating(newState);
    onToggle(newState);
  };

  const handleSpeedChange = (speed: "slow" | "normal" | "fast") => {
    setSimulationSpeed(speed);
    onSpeedChange(speed);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiAlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="font-medium">Simulation Mode</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isSimulating
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {isSimulating ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <FiSettings className="w-5 h-5" />
          </button>

          <button
            onClick={handleSimulationToggle}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isSimulating
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {isSimulating ? (
              <>
                <FiPause className="w-4 h-4" />
                Stop Simulation
              </>
            ) : (
              <>
                <FiPlay className="w-4 h-4" />
                Start Simulation
              </>
            )}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Simulation Speed
              </label>
              <div className="flex gap-2">
                {(["slow", "normal", "fast"] as const).map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      simulationSpeed === speed
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiRefreshCw className="w-4 h-4" />
              <span>
                {simulationSpeed === "slow" &&
                  "Generating events every 5 seconds"}
                {simulationSpeed === "normal" &&
                  "Generating events every 2 seconds"}
                {simulationSpeed === "fast" &&
                  "Generating events every 0.5 seconds"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
