"use client";

import React, { useState } from "react";
import { ComplianceConfig } from "@/app/types/security";
import { FiShield, FiLock, FiFileText, FiCheckCircle } from "react-icons/fi";

// Mock compliance config (in a real app, this would come from an API)
const initialConfig: ComplianceConfig = {
  gdpr: {
    enabled: true,
    dataRetentionPeriod: 365,
    dataProcessingAgreement: true,
  },
  ferpa: {
    enabled: true,
    directoryInformationOptOut: true,
    educationalRecordsAccess: true,
  },
};

export default function ComplianceSettings() {
  const [config, setConfig] = useState<ComplianceConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
    alert("Compliance settings updated successfully");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <FiShield className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Compliance Settings</h2>
      </div>

      <div className="space-y-6">
        {/* GDPR Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <FiLock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-medium">GDPR Compliance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Enable GDPR Compliance</label>
                <p className="text-sm text-gray-500">
                  Enable GDPR data protection features
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.gdpr.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      gdpr: { ...config.gdpr, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                value={config.gdpr.dataRetentionPeriod}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    gdpr: {
                      ...config.gdpr,
                      dataRetentionPeriod: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
                max="3650"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Data Processing Agreement</label>
                <p className="text-sm text-gray-500">
                  Require data processing agreements
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.gdpr.dataProcessingAgreement}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      gdpr: {
                        ...config.gdpr,
                        dataProcessingAgreement: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* FERPA Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <FiFileText className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-medium">FERPA Compliance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Enable FERPA Compliance</label>
                <p className="text-sm text-gray-500">
                  Enable FERPA student privacy features
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.ferpa.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      ferpa: { ...config.ferpa, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">
                  Directory Information Opt-Out
                </label>
                <p className="text-sm text-gray-500">
                  Allow students to opt out of directory information
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.ferpa.directoryInformationOptOut}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      ferpa: {
                        ...config.ferpa,
                        directoryInformationOptOut: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">
                  Educational Records Access
                </label>
                <p className="text-sm text-gray-500">
                  Enable student access to educational records
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.ferpa.educationalRecordsAccess}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      ferpa: {
                        ...config.ferpa,
                        educationalRecordsAccess: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <FiCheckCircle className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FiCheckCircle className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
