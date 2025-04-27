'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Toast } from './Toast';
import { Toast as ToastType } from '@/app/types';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface ToastContextType {
  addToast: (toast: Omit<ToastType, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const idCounter = useRef(0);

  const addToast = useCallback((toast: Omit<ToastType, 'id'>) => {
    const id = `toast-${idCounter.current++}`;
    setToasts(prev => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
} 