import { useState, useEffect } from 'react';
import { Timer, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerProgressBarProps {
  isActive: boolean;
}

export function TimerProgressBar({ isActive }: TimerProgressBarProps) {
  const [selectedDuration, setSelectedDuration] = useState<1 | 2 | 3>(1); // hours
  const [remainingTime, setRemainingTime] = useState(0); // seconds
  const [timerActive, setTimerActive] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const totalSeconds = selectedDuration * 3600; // hours to seconds
  const progress = timerActive ? ((totalSeconds - remainingTime) / totalSeconds) * 100 : 0;

  useEffect(() => {
    if (timerActive && isActive && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            setIsBlinking(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, isActive, remainingTime]);

  useEffect(() => {
    if (isBlinking) {
      const timeout = setTimeout(() => {
        setIsBlinking(false);
      }, 15000); // 15 seconds of blinking
      return () => clearTimeout(timeout);
    }
  }, [isBlinking]);

  const startTimer = () => {
    setRemainingTime(totalSeconds);
    setTimerActive(true);
    setIsBlinking(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setRemainingTime(0);
    setIsBlinking(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (isBlinking) {
      return 'from-pink-500 to-red-500 animate-pulse';
    }
    const ratio = progress / 100;
    if (ratio < 0.5) {
      return 'from-cyan-400 to-cyan-500';
    } else if (ratio < 0.8) {
      return 'from-yellow-400 to-orange-500';
    } else {
      return 'from-orange-500 to-red-500';
    }
  };

  return (
    <div className="bg-white/10 rounded-xl p-4 border-2 border-white/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">Czas sesji</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map(duration => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration as 1 | 2 | 3)}
              className={`px-2 py-1 text-xs rounded ${
                selectedDuration === duration
                  ? 'bg-machine-blue text-white'
                  : 'bg-white/20 text-white/70 hover:bg-white/30'
              }`}
            >
              {duration}H
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden mb-3">
        <div
          className={`absolute left-0 top-0 h-full bg-gradient-to-r transition-all duration-500 ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Time display and controls */}
      <div className="flex items-center justify-between">
        <div className={`text-lg font-mono font-bold ${
          isBlinking ? 'text-red-400 animate-pulse' : 'text-white'
        }`}>
          {formatTime(remainingTime)}
        </div>
        <div className="flex gap-2">
          {!timerActive && remainingTime === 0 && (
            <Button
              onClick={startTimer}
              size="sm"
              className="bg-machine-green hover:bg-machine-green/80 text-white"
            >
              Start
            </Button>
          )}
          {(timerActive || remainingTime > 0 || isBlinking) && (
            <Button
              onClick={resetTimer}
              size="sm"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}