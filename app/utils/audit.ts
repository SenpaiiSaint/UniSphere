import { AuditLog } from "../types/security";

// Mock audit log storage (in a real app, this would be a database)
let auditLogs: AuditLog[] = [];

export const auditLogger = {
  log: async (log: Omit<AuditLog, "id" | "timestamp">) => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      ...log,
    };

    auditLogs.push(newLog);

    // In a real app, you would also:
    // 1. Store the log in a database
    // 2. Send to a logging service
    // 3. Trigger alerts for sensitive actions

    return newLog;
  },

  getLogs: async (filters?: Partial<AuditLog>) => {
    let filteredLogs = [...auditLogs];

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        filteredLogs = filteredLogs.filter(
          (log) => log[key as keyof AuditLog] === value
        );
      });
    }

    return filteredLogs;
  },

  // Mock function to simulate log retention policy
  cleanupOldLogs: async (retentionDays: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    auditLogs = auditLogs.filter((log) => log.timestamp > cutoffDate);
  },
};

// Helper function to create audit log entries
export const createAuditLog = async (
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  request: Request,
  details: Record<string, any> = {}
) => {
  const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return auditLogger.log({
    userId,
    action,
    resource,
    resourceId,
    ipAddress,
    userAgent,
    details,
  });
};
