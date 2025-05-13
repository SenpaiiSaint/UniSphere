export type UserRole = "student" | "teacher" | "admin" | "system_admin";

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: "create" | "read" | "update" | "delete";
}

export interface Role {
  id: string;
  name: UserRole;
  permissions: Permission[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

export interface SecurityAlert {
  id: string;
  type:
    | "login_attempt"
    | "permission_violation"
    | "data_access"
    | "system_event";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  timestamp: Date;
  status: "active" | "resolved" | "investigating";
  details: Record<string, any>;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  iterations: number;
}

export interface ComplianceConfig {
  gdpr: {
    enabled: boolean;
    dataRetentionPeriod: number; // in days
    dataProcessingAgreement: boolean;
  };
  ferpa: {
    enabled: boolean;
    directoryInformationOptOut: boolean;
    educationalRecordsAccess: boolean;
  };
}
