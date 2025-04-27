'use client';

import { useState, useEffect } from 'react';
import { mockSettings } from '@/app/data/mockData';
import { MainLayout } from '../components/Layout/MainLayout';
import {
  BellIcon,
  AcademicCapIcon,
  PaintBrushIcon,
  ShieldCheckIcon,
  LanguageIcon,
  ClockIcon,
  Cog6ToothIcon,
  CheckIcon,
  XMarkIcon,
  UserIcon,
  DocumentTextIcon,
  ChartBarIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  CloudArrowUpIcon,
  CloudArrowDownIcon,
  TrashIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

type TabType = 'notifications' | 'grading' | 'appearance' | 'security' | 'language' | 'time' | 'profile' | 'data';

type NotificationType = {
  type: 'success' | 'error' | 'info';
  message: string;
  id: number;
};

type GradingSettingKey = keyof typeof mockSettings.grading;
type AppearanceSettingKey = keyof typeof mockSettings.appearance;

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings);
  const [activeTab, setActiveTab] = useState<TabType>('notifications');
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addNotification = (type: NotificationType['type'], message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { type, message, id }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleGradingChange = (key: GradingSettingKey, value: number | string | Record<string, number>) => {
    setSettings(prev => ({
      ...prev,
      grading: {
        ...prev.grading,
        [key]: value
      }
    }));
  };

  const handleAppearanceChange = (key: AppearanceSettingKey, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      addNotification('success', 'Settings saved successfully');
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      addNotification('error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      addNotification('error', 'Password must be at least 8 characters long');
      return;
    }
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowPasswordChangeForm(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      addNotification('success', 'Password updated successfully');
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        setIsSaving(false);
        addNotification('info', 'Account deletion request submitted');
      }, 1000);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'grading', label: 'Grading', icon: AcademicCapIcon },
    { id: 'appearance', label: 'Appearance', icon: PaintBrushIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'language', label: 'Language', icon: LanguageIcon },
    { id: 'time', label: 'Time & Date', icon: ClockIcon },
    { id: 'data', label: 'Data Management', icon: DocumentTextIcon }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {notifications.map(({ type, message, id }) => (
            <div
              key={id}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : type === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {type === 'success' ? (
                <CheckIcon className="h-5 w-5" />
              ) : type === 'error' ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <InformationCircleIcon className="h-5 w-5" />
              )}
              {message}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 truncate bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Settings
                </h1>
                <p className="text-gray-500 text-sm sm:text-base truncate">Manage your account preferences and settings</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Cog6ToothIcon className="h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                  <Cog6ToothIcon className="h-12 w-12 text-blue-600 animate-spin" />
                  <p className="text-gray-500">Loading settings...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Tabs */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <h2 className="text-lg font-semibold text-gray-900">Settings Menu</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`w-full flex items-center gap-3 p-4 text-sm font-medium transition-colors duration-200 ${
                              activeTab === tab.id
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      {/* Profile Tab */}
                      {activeTab === 'profile' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h4>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                  <input
                                    type="text"
                                    className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter your display name"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                  <input
                                    type="email"
                                    className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                    placeholder="Enter your email"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                  <textarea
                                    className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200 min-h-[100px]"
                                    placeholder="Tell us about yourself"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-4">Profile Picture</h4>
                              <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                  <UserIcon className="h-10 w-10 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
                                    <CloudArrowUpIcon className="h-5 w-5" />
                                    Upload New Photo
                                  </button>
                                  <p className="mt-2 text-xs text-gray-500">JPG, GIF or PNG. Max size of 2MB</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Notifications Tab */}
                      {activeTab === 'notifications' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(settings.notifications).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                              >
                                <div className="flex items-center gap-3">
                                  <BellIcon className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                                    </h4>
                                    <p className="text-xs text-gray-500">Receive alerts for {key} updates</p>
                                  </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => handleNotificationChange(key as keyof typeof settings.notifications)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grading Tab */}
                      {activeTab === 'grading' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Grading Settings</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Late Penalty (%)</label>
                              <input
                                type="number"
                                value={settings.grading.latePenalty}
                                onChange={(e) => handleGradingChange('latePenalty', parseInt(e.target.value))}
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                min="0"
                                max="100"
                              />
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Rounding</label>
                              <select
                                value={settings.grading.rounding}
                                onChange={(e) => handleGradingChange('rounding', e.target.value)}
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                              >
                                <option value="up">Round Up</option>
                                <option value="down">Round Down</option>
                                <option value="nearest">Round to Nearest</option>
                              </select>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Grade Scale</label>
                              <div className="space-y-3">
                                {Object.entries(settings.grading.gradeScale).map(([grade, cutoff]) => (
                                  <div key={grade} className="flex items-center gap-4">
                                    <span className="w-8 text-sm font-medium text-gray-900">{grade}:</span>
                                    <input
                                      type="number"
                                      value={cutoff}
                                      onChange={(e) => {
                                        const newScale = { ...settings.grading.gradeScale };
                                        newScale[grade] = parseInt(e.target.value);
                                        handleGradingChange('gradeScale', newScale);
                                      }}
                                      className="w-24 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2 px-3 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                      min="0"
                                      max="100"
                                    />
                                    <span className="text-sm text-gray-500">% and above</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Appearance Tab */}
                      {activeTab === 'appearance' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                              <select
                                value={settings.appearance.theme}
                                onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                              >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                              </select>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                              <div className="flex items-center gap-4">
                                <input
                                  type="range"
                                  value={settings.appearance.fontSize}
                                  onChange={(e) => handleAppearanceChange('fontSize', parseInt(e.target.value))}
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                  min="12"
                                  max="24"
                                />
                                <span className="text-sm text-gray-500 w-12 text-center">{settings.appearance.fontSize}px</span>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Density</label>
                              <select
                                value={settings.appearance.density}
                                onChange={(e) => handleAppearanceChange('density', e.target.value)}
                                className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                              >
                                <option value="comfortable">Comfortable</option>
                                <option value="compact">Compact</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Security Tab - Enhanced */}
                      {activeTab === 'security' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                              <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                              <div className="flex items-center gap-4">
                                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
                                  <ShieldCheckIcon className="h-5 w-5" />
                                  Enable 2FA
                                </button>
                                <span className="text-sm text-gray-500">Currently disabled</span>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Password</h4>
                              <p className="text-sm text-gray-500 mb-4">Change your account password</p>
                              {!showPasswordChangeForm ? (
                                <button
                                  onClick={() => setShowPasswordChangeForm(true)}
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                >
                                  Change Password
                                </button>
                              ) : (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <div className="relative">
                                      <input
                                        type={showPassword ? "text" : "password"}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                      />
                                      <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                      >
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                      </button>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      value={newPassword}
                                      onChange={(e) => setNewPassword(e.target.value)}
                                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      value={confirmPassword}
                                      onChange={(e) => setConfirmPassword(e.target.value)}
                                      className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                                    />
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <button
                                      onClick={handlePasswordChange}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                                    >
                                      <KeyIcon className="h-5 w-5" />
                                      Update Password
                                    </button>
                                    <button
                                      onClick={() => setShowPasswordChangeForm(false)}
                                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Active Sessions</h4>
                              <p className="text-sm text-gray-500 mb-4">Manage your active sessions across devices</p>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                      <ChartBarIcon className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">Windows 10 - Chrome</p>
                                      <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
                                    </div>
                                  </div>
                                  <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                                    <XMarkIcon className="h-5 w-5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Security Recommendations</h4>
                              <div className="space-y-4">
                                <div className="flex items-start gap-4 p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Enable Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your account</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-4 p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <KeyIcon className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">Update Password Regularly</p>
                                    <p className="text-xs text-gray-500 mt-1">Change your password every 90 days</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Language Tab */}
                      {activeTab === 'language' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Language Settings</h3>
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
                            <select className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200">
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Time & Date Tab */}
                      {activeTab === 'time' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Time & Date Settings</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                              <select className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200">
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time (EST)</option>
                                <option value="CST">Central Time (CST)</option>
                                <option value="PST">Pacific Time (PST)</option>
                              </select>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                              <select className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 px-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200">
                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Data Management Tab */}
                      {activeTab === 'data' && (
                        <div className="space-y-6">
                          <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                          <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Export Data</h4>
                              <p className="text-sm text-gray-500 mb-4">Download a copy of your data</p>
                              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
                                <CloudArrowDownIcon className="h-5 w-5" />
                                Export All Data
                              </button>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Import Data</h4>
                              <p className="text-sm text-gray-500 mb-4">Import your data from another source</p>
                              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200">
                                <CloudArrowUpIcon className="h-5 w-5" />
                                Import Data
                              </button>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Delete Account</h4>
                              <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data</p>
                              <button
                                onClick={handleDeleteAccount}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
                              >
                                <TrashIcon className="h-5 w-5" />
                                Delete Account
                              </button>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Data Usage</h4>
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">Storage Used</span>
                                  <span className="text-sm font-medium text-gray-900">2.5 GB / 10 GB</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                                <p className="text-xs text-gray-500">You have 7.5 GB of storage remaining</p>
                              </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Data Export History</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    <CloudArrowDownIcon className="h-5 w-5 text-gray-400" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">Full Data Export</p>
                                      <p className="text-xs text-gray-500">Completed 2 days ago</p>
                                    </div>
                                  </div>
                                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    Download
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 