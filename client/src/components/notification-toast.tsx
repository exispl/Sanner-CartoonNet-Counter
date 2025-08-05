import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ChevronDown } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
}

export function NotificationToast({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 2000 
}: NotificationToastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration / 1000);

  useEffect(() => {
    if (!isExpanded) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      const countdown = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            clearInterval(countdown);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(countdown);
      };
    }
  }, [duration, onClose, isExpanded]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className={`fixed top-4 right-4 ${getBackgroundColor()} text-white rounded-lg shadow-lg border border-white/20 max-w-sm z-50 transition-all duration-300`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium">
              {isExpanded ? message : message.substring(0, 50) + (message.length > 50 ? '...' : '')}
            </p>
            {!isExpanded && message.length > 50 && (
              <Button
                onClick={() => setIsExpanded(true)}
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 h-auto mt-1"
              >
                <ChevronDown className="w-3 h-3 mr-1" />
                Czytaj więcej
              </Button>
            )}
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 h-auto ml-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {!isExpanded && (
          <div className="mt-2">
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-white h-1 rounded-full transition-all duration-100"
                style={{ width: `${(timeLeft / (duration / 1000)) * 100}%` }}
              />
            </div>
          </div>
        )}
        
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-xs text-white/80">
              Powiadomienie zostało zatrzymane. Kliknij X aby zamknąć.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}