'use client';

import React, { useState } from 'react';
import { FiSend, FiTrash2 } from 'react-icons/fi';
import { 
  Announcement, 
  OfficeHour, 
  Message, 
  mockAnnouncements, 
  mockOfficeHours, 
  mockMessages 
} from '@/app/data/mockData';

export const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'officeHours' | 'messages'>('announcements');
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', channels: [] as ('email' | 'sms' | 'app')[] });
  const [newOfficeHour, setNewOfficeHour] = useState({ day: '', startTime: '', endTime: '' });
  const [newMessage, setNewMessage] = useState('');

  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [officeHours, setOfficeHours] = useState<OfficeHour[]>(mockOfficeHours);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleCreateAnnouncement = () => {
    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({ title: '', content: '', channels: [] });
  };

  const handleCreateOfficeHour = () => {
    const slots = Array(4).fill(null).map((_, i) => ({
      id: (i + 1).toString(),
      studentName: '',
      status: 'available' as const
    }));

    const officeHour: OfficeHour = {
      id: Date.now().toString(),
      ...newOfficeHour,
      slots
    };
    setOfficeHours([...officeHours, officeHour]);
    setNewOfficeHour({ day: '', startTime: '', endTime: '' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const message: Message = {
      id: Date.now().toString(),
      senderId: '1', // Assuming teacher's ID is 1
      receiverId: '2', // Assuming student's ID is 2
      subject: 'New Message',
      content: newMessage,
      timestamp: new Date(),
      read: false
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'announcements' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          Announcements
        </button>
        <button
          onClick={() => setActiveTab('officeHours')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'officeHours' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          Office Hours
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'messages' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          Messages
        </button>
      </div>

      {activeTab === 'announcements' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Create Announcement</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Content"
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
              />
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAnnouncement.channels.includes('email')}
                    onChange={(e) => {
                      const channels = e.target.checked
                        ? [...newAnnouncement.channels, 'email' as const]
                        : newAnnouncement.channels.filter(c => c !== 'email');
                      setNewAnnouncement({ ...newAnnouncement, channels });
                    }}
                  />
                  Email
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAnnouncement.channels.includes('sms')}
                    onChange={(e) => {
                      const channels = e.target.checked
                        ? [...newAnnouncement.channels, 'sms' as const]
                        : newAnnouncement.channels.filter(c => c !== 'sms');
                      setNewAnnouncement({ ...newAnnouncement, channels });
                    }}
                  />
                  SMS
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newAnnouncement.channels.includes('app')}
                    onChange={(e) => {
                      const channels = e.target.checked
                        ? [...newAnnouncement.channels, 'app' as const]
                        : newAnnouncement.channels.filter(c => c !== 'app');
                      setNewAnnouncement({ ...newAnnouncement, channels });
                    }}
                  />
                  In-App
                </label>
              </div>
              <button
                onClick={handleCreateAnnouncement}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Announcement
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {announcements.map(announcement => (
              <div key={announcement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{announcement.title}</h4>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-600 mb-2">{announcement.content}</p>
                <div className="flex gap-2">
                  {announcement.channels.map(channel => (
                    <span key={channel} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'officeHours' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Add Office Hours</h3>
            <div className="grid grid-cols-3 gap-4">
              <select
                value={newOfficeHour.day}
                onChange={(e) => setNewOfficeHour({ ...newOfficeHour, day: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Select Day</option>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <input
                type="time"
                value={newOfficeHour.startTime}
                onChange={(e) => setNewOfficeHour({ ...newOfficeHour, startTime: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
              <input
                type="time"
                value={newOfficeHour.endTime}
                onChange={(e) => setNewOfficeHour({ ...newOfficeHour, endTime: e.target.value })}
                className="px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              onClick={handleCreateOfficeHour}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Office Hours
            </button>
          </div>

          <div className="space-y-4">
            {officeHours.map(officeHour => (
              <div key={officeHour.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{officeHour.day}</h4>
                    <p className="text-gray-600">
                      {officeHour.startTime} - {officeHour.endTime}
                    </p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {officeHour.slots.map(slot => (
                    <div
                      key={slot.id}
                      className={`p-3 rounded-lg ${
                        slot.status === 'booked' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      {slot.status === 'booked' ? (
                        <div>
                          <p className="font-medium">{slot.studentName}</p>
                          <p className="text-sm text-gray-600">Booked</p>
                        </div>
                      ) : (
                        <p className="text-gray-600">Available</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">New Message</h3>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FiSend className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`border rounded-lg p-4 ${
                  !message.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{message.senderId}</p>
                    <p className="text-sm text-gray-500">{message.timestamp.toLocaleString()}</p>
                  </div>
                  {!message.read && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                      New
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 