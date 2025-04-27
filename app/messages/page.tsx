'use client';

import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { mockMessages } from '../data/mockData';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  PaperClipIcon,
  CheckIcon,
  ClockIcon,
  EnvelopeIcon,
  TrashIcon,
  ArchiveBoxIcon,
  ArrowPathIcon,
  StarIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const filters = [
    { id: 'all', label: 'All Messages', count: mockMessages.length },
    { id: 'unread', label: 'Unread', count: mockMessages.filter(m => !m.read).length },
    { id: 'read', label: 'Read', count: mockMessages.filter(m => m.read).length },
    { id: 'attachments', label: 'With Attachments', count: mockMessages.filter(m => (m.attachments?.length ?? 0) > 0).length }
  ];

  const getFilteredMessages = () => {
    return mockMessages.filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          message.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === 'all' ||
                          (selectedFilter === 'unread' && !message.read) ||
                          (selectedFilter === 'read' && message.read) ||
                          (selectedFilter === 'attachments' && (message.attachments?.length ?? 0) > 0);

      return matchesSearch && matchesFilter;
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getMessageStatus = (read: boolean, timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const isRecent = now.getTime() - messageDate.getTime() < 24 * 60 * 60 * 1000;

    if (!read) return { icon: <EnvelopeIcon className="h-4 w-4 text-blue-500" />, label: 'Unread' };
    if (isRecent) return { icon: <ClockIcon className="h-4 w-4 text-gray-500" />, label: 'Recent' };
    return { icon: <CheckIcon className="h-4 w-4 text-green-500" />, label: 'Read' };
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent.trim()) return;
    
    // In a real app, this would send the reply to a server
    console.log('Sending reply:', {
      to: mockMessages.find(m => m.id === selectedMessage)?.senderId,
      content: replyContent,
      attachments: attachments
    });

    // Reset the reply form
    setReplyContent('');
    setAttachments([]);
    setIsReplying(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 truncate bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Messages
                </h1>
                <p className="text-gray-500 text-sm sm:text-base truncate">View and manage your messages</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="block w-full md:w-64 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 pl-10 pr-4 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="flex items-center gap-2">
                  <FunnelIcon className="h-5 w-5 text-gray-400" />
                  <select
                    className="block w-full md:w-48 rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm py-2.5 transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                  >
                    {filters.map(filter => (
                      <option key={filter.id} value={filter.id}>
                        {filter.label} ({filter.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Inbox</h2>
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-white transition-colors duration-200"
                      onClick={() => setIsLoading(!isLoading)}
                    >
                      <ArrowPathIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                  {getFilteredMessages().map(message => (
                    <div
                      key={message.id}
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        selectedMessage === message.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedMessage(message.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium truncate ${
                              !message.read ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                              {message.subject}
                            </span>
                            {(message.attachments?.length ?? 0) > 0 && (
                              <PaperClipIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 truncate">
                            {message.content}
                          </p>
                        </div>
                        <div className="ml-4 flex flex-col items-end">
                          <span className="text-xs text-gray-500">
                            {formatDate(message.timestamp)}
                          </span>
                          <div className="mt-1 flex items-center gap-1">
                            {getMessageStatus(message.read, message.timestamp).icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Detail */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {selectedMessage ? (
                  <>
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {mockMessages.find(m => m.id === selectedMessage)?.subject}
                        </h2>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-yellow-500 rounded-lg hover:bg-white transition-colors duration-200">
                            <StarIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-white transition-colors duration-200">
                            <ArchiveBoxIcon className="h-5 w-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors duration-200">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {mockMessages.find(m => m.id === selectedMessage)?.content}
                        </p>
                      </div>
                      {mockMessages.find(m => m.id === selectedMessage)?.attachments && (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">Attachments</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {mockMessages.find(m => m.id === selectedMessage)?.attachments?.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                              >
                                <PaperClipIcon className="h-5 w-5 text-gray-400" />
                                <span className="text-sm text-gray-900 truncate">{attachment}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reply Section */}
                      <div className="mt-8 border-t border-gray-100 pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-medium text-gray-900">Reply</h3>
                          <button
                            onClick={() => setIsReplying(!isReplying)}
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          >
                            {isReplying ? 'Cancel' : 'New Reply'}
                          </button>
                        </div>

                        {isReplying && (
                          <div className="space-y-4">
                            <textarea
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              placeholder="Type your reply..."
                              className="w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-white/80 backdrop-blur-sm p-4 min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-200"
                            />
                            
                            {/* File Upload */}
                            <div className="flex items-center gap-4">
                              <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                                <PaperClipIcon className="h-5 w-5" />
                                <span>Attach files</span>
                                <input
                                  type="file"
                                  multiple
                                  className="hidden"
                                  onChange={handleFileUpload}
                                />
                              </label>
                              {attachments.length > 0 && (
                                <span className="text-sm text-gray-500">
                                  {attachments.length} file{attachments.length !== 1 ? 's' : ''} attached
                                </span>
                              )}
                            </div>

                            {/* Attached Files Preview */}
                            {attachments.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {attachments.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                  >
                                    <div className="flex items-center gap-3">
                                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                                      <span className="text-sm text-gray-900 truncate">
                                        {file.name}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                                    >
                                      <TrashIcon className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Send Button */}
                            <div className="flex justify-end">
                              <button
                                onClick={handleReply}
                                disabled={!replyContent.trim()}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <PaperAirplaneIcon className="h-5 w-5" />
                                Send Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="relative">
                        <EnvelopeIcon className="h-12 w-12 text-gray-400 mx-auto" />
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="mt-4 text-sm font-medium text-gray-900">No message selected</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a message from the list to view its details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 