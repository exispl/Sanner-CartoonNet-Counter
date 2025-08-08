import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

export function ProjectDeadline() {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  // Deadline: 18.08.2025
  const deadlineDate = new Date('2025-08-18T23:59:59');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = deadlineDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        setDaysRemaining(days);
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setDaysRemaining(0);
        setTimeRemaining('PRZEKROCZONO!');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (daysRemaining > 60) return 'from-green-600 to-green-800';
    if (daysRemaining > 30) return 'from-yellow-600 to-yellow-800';
    if (daysRemaining > 7) return 'from-orange-600 to-orange-800';
    return 'from-red-600 to-red-800 animate-pulse';
  };

  const getStatusIcon = () => {
    if (daysRemaining > 30) return <Calendar className="h-4 w-4" />;
    if (daysRemaining > 7) return <Clock className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4 animate-bounce" />;
  };

  const getStatusText = () => {
    if (daysRemaining === 0) return 'TERMIN MINĄŁ!';
    if (daysRemaining === 1) return '1 dzień pozostał';
    if (daysRemaining < 7) return 'PILNE!';
    if (daysRemaining < 30) return 'Zbliża się termin';
    return 'Na czasie';
  };

  return (
    <Card className={`bg-gradient-to-br ${getStatusColor()} text-white border-0 cursor-pointer hover:scale-105 transition-transform`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ende: 18.08.25</CardTitle>
        {getStatusIcon()}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{daysRemaining}</span>
            <span className="text-sm">dni</span>
          </div>
          <div className="text-xs opacity-90">
            {timeRemaining} • {getStatusText()}
          </div>
          <div className="text-xs opacity-75 mt-2">
            Przewidywana data zakończenia projektu
          </div>
          {daysRemaining < 30 && (
            <div className="text-xs bg-white/20 rounded px-2 py-1 mt-2">
              ⚠️ Sprawdź harmonogram zadań
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}