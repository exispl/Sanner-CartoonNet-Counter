import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  submessage?: string;
  visible: boolean;
  onHide: () => void;
}

export function NotificationToast({ message, type, submessage, visible, onHide }: ToastProps) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info
  };

  const colors = {
    success: 'bg-machine-green',
    warning: 'bg-machine-amber',
    error: 'bg-machine-red',
    info: 'bg-machine-blue'
  };

  const Icon = icons[type];

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm w-full bg-white border border-industrial-200 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colors[type]}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-industrial-800">{message}</p>
            {submessage && (
              <p className="text-sm text-industrial-500 mt-1">{submessage}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onHide}
              className="bg-white rounded-md inline-flex text-industrial-400 hover:text-industrial-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
