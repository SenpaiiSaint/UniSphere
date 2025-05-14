"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FiMessageSquare,
  FiPaperclip,
  FiSend,
  FiThumbsUp,
  FiStar,
} from "react-icons/fi";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
  likes: number;
  isStarred?: boolean;
}

// Mock data - in a real app, this would come from an API
const mockMessages: Message[] = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hey everyone! I found a great resource for the upcoming exam.",
    timestamp: "2024-03-19T14:30:00",
    attachments: [{ name: "Study Guide.pdf", type: "pdf", size: "2.4MB" }],
    likes: 3,
    isStarred: true,
  },
  {
    id: 2,
    sender: "Michael Chen",
    content: "Thanks for sharing! This will be really helpful.",
    timestamp: "2024-03-19T14:35:00",
    likes: 1,
  },
  {
    id: 3,
    sender: "Emma Davis",
    content: "I've created a practice quiz for us to review together.",
    timestamp: "2024-03-19T14:40:00",
    attachments: [{ name: "Practice Quiz.docx", type: "doc", size: "1.8MB" }],
    likes: 2,
  },
];

const mockGroups = [
  { id: 1, name: "Data Structures Study Group", members: 3 },
  { id: 2, name: "Web Dev Project Team", members: 4 },
];

export default function StudyGroupChat() {
  const [selectedGroup, setSelectedGroup] = useState(mockGroups[0].name);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;

    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
      attachments: attachments.map((file) => ({
        name: file.name,
        type: file.type.split("/")[1],
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      })),
      likes: 0,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleLike = (messageId: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const handleStar = (messageId: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiMessageSquare className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Study Group Chat</h2>
        </div>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {mockGroups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-2">
        {messages.map((message) => (
          <div key={message.id} className="border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{message.sender}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStar(message.id)}
                  className={`p-1 rounded-full ${
                    message.isStarred ? "text-yellow-500" : "text-gray-400"
                  } hover:bg-gray-100`}
                >
                  <FiStar className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleLike(message.id)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100"
                >
                  <FiThumbsUp className="w-4 h-4" />
                </button>
                {message.likes > 0 && (
                  <span className="text-sm text-gray-500">{message.likes}</span>
                )}
              </div>
            </div>
            <p className="text-sm mb-2">{message.content}</p>
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-2">
                {message.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded"
                  >
                    <FiPaperclip className="w-4 h-4" />
                    <span>{attachment.name}</span>
                    <span className="text-gray-500">({attachment.size})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded"
              >
                <FiPaperclip className="w-4 h-4" />
                <span>{file.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setAttachments(attachments.filter((_, i) => i !== index))
                  }
                  className="text-gray-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="p-2 text-gray-400 hover:text-blue-600 cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <FiPaperclip className="w-5 h-5" />
          </label>
          <button
            type="submit"
            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
