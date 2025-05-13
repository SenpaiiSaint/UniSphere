"use client";

import { useState, useEffect } from "react";
import SecurityMonitoring from "../components/Security/SecurityMonitoring";
import ComplianceSettings from "../components/Security/ComplianceSettings";
import SimulationControls from "../components/Security/SimulationControls";
import { SimulationService } from "../services/simulationService";
import { SecurityAlert } from "../types/security";

export default function SecurityPage() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [simulationService, setSimulationService] =
    useState<SimulationService | null>(null);

  useEffect(() => {
    const service = new SimulationService((alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 100)); // Keep last 100 alerts
    });
    setSimulationService(service);

    return () => {
      service.stop();
    };
  }, []);

  const handleSimulationToggle = (isActive: boolean) => {
    if (simulationService) {
      if (isActive) {
        simulationService.start();
      } else {
        simulationService.stop();
      }
    }
  };

  const handleSpeedChange = (speed: "slow" | "normal" | "fast") => {
    if (simulationService) {
      simulationService.setSpeed(speed);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Security & Compliance</h1>
        <SimulationControls
          onToggle={handleSimulationToggle}
          onSpeedChange={handleSpeedChange}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <SecurityMonitoring alerts={alerts} />
        </div>
        <div>
          <ComplianceSettings />
        </div>
      </div>
    </div>
  );
}
