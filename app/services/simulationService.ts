import { SecurityAlert } from "../types/security";

// Mock data generators
const generateRandomIP = () => {
  return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}`;
};

const generateRandomUser = () => {
  const users = ["user123", "admin456", "student789", "teacher101"];
  return users[Math.floor(Math.random() * users.length)];
};

const generateRandomResource = () => {
  const resources = ["students", "courses", "grades", "assignments", "system"];
  return resources[Math.floor(Math.random() * resources.length)];
};

// Simulation event types
const eventTypes = [
  "login_attempt",
  "permission_violation",
  "data_access",
  "system_event",
] as const;

const severityLevels = ["low", "medium", "high", "critical"] as const;

const statusTypes = ["active", "investigating", "resolved"] as const;

// Generate a random security alert
export const generateSecurityAlert = (): SecurityAlert => {
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const severity =
    severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const status = statusTypes[Math.floor(Math.random() * statusTypes.length)];

  let message = "";
  let details: Record<string, any> = {};

  switch (type) {
    case "login_attempt":
      message = "Multiple failed login attempts detected";
      details = {
        attempts: Math.floor(Math.random() * 10) + 1,
        ipAddress: generateRandomIP(),
        username: generateRandomUser(),
      };
      break;
    case "permission_violation":
      message = "Unauthorized access attempt detected";
      details = {
        userId: generateRandomUser(),
        resource: generateRandomResource(),
        action: ["read", "write", "delete"][Math.floor(Math.random() * 3)],
      };
      break;
    case "data_access":
      message = "Sensitive data access detected";
      details = {
        userId: generateRandomUser(),
        resource: generateRandomResource(),
        timestamp: new Date().toISOString(),
      };
      break;
    case "system_event":
      message = "System configuration change detected";
      details = {
        changedBy: generateRandomUser(),
        changeType: ["settings", "permissions", "configuration"][
          Math.floor(Math.random() * 3)
        ],
        timestamp: new Date().toISOString(),
      };
      break;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    severity,
    message,
    timestamp: new Date(),
    status,
    details,
  };
};

// Simulation service
export class SimulationService {
  private interval: NodeJS.Timeout | null = null;
  private speed: "slow" | "normal" | "fast" = "normal";
  private isRunning = false;
  private onAlert: (alert: SecurityAlert) => void;

  constructor(onAlert: (alert: SecurityAlert) => void) {
    this.onAlert = onAlert;
  }

  private getIntervalTime() {
    switch (this.speed) {
      case "slow":
        return 5000;
      case "normal":
        return 2000;
      case "fast":
        return 500;
      default:
        return 2000;
    }
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.interval = setInterval(() => {
      const alert = generateSecurityAlert();
      this.onAlert(alert);
    }, this.getIntervalTime());
  }

  stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  setSpeed(speed: "slow" | "normal" | "fast") {
    this.speed = speed;
    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  isActive() {
    return this.isRunning;
  }
}
