import { useState, useEffect } from 'react';

interface EarningsCounterProps {
  isRunning: boolean;
  totalBoxes: number;
}

export function EarningsCounter({ isRunning, totalBoxes }: EarningsCounterProps) {
  const [earnings, setEarnings] = useState(0);
  const [animatingCoins, setAnimatingCoins] = useState<number[]>([]);

  const hourlyRate = 35000; // EUR per hour
  const earningsPerSecond = hourlyRate / 3600;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setEarnings(prev => prev + earningsPerSecond);
      
      // Add animated coin occasionally
      if (Math.random() < 0.3) {
        const coinId = Date.now();
        setAnimatingCoins(prev => [...prev, coinId]);
        
        // Remove coin after animation
        setTimeout(() => {
          setAnimatingCoins(prev => prev.filter(id => id !== coinId));
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, earningsPerSecond]);

  const formatEarnings = (amount: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="relative bg-gradient-to-br from-money-dark to-money-gold rounded-2xl p-8 shadow-2xl border-4 border-money-light">
      {/* Animated coins */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {animatingCoins.map(coinId => (
          <div
            key={coinId}
            className="absolute text-3xl animate-money-drop"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: '10%'
            }}
          >
            💰
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl mr-4 animate-coin-spin">💎</span>
          <h3 className="text-2xl font-bold text-white">
            ZYSKI FIRMY
          </h3>
          <span className="text-6xl ml-4 animate-coin-spin">💎</span>
        </div>
        
        <div className="bg-white/20 rounded-xl p-6 mb-4 animate-counter-glow">
          <div className="text-lg text-money-light font-semibold mb-2">
            Zarabiamy co godzinę:
          </div>
          <div className="text-4xl font-bold text-white mb-4">
            💰 {formatEarnings(hourlyRate)}/h 💰
          </div>
          
          <div className="text-lg text-money-light font-semibold mb-2">
            Całkowite zyski tej sesji:
          </div>
          <div className="text-5xl font-bold text-white animate-earnings-pulse">
            🤑 {formatEarnings(earnings)} 🤑
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 text-money-light">
          <span className="text-2xl">📦</span>
          <span className="text-lg font-semibold">
            Kartony wyprodukowane: {totalBoxes}
          </span>
          <span className="text-2xl">📦</span>
        </div>

        <div className="mt-4 text-sm text-money-light/80">
          {isRunning ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="animate-pulse">💸</span>
              <span>PIENIĄDZE PŁYNĄ!</span>
              <span className="animate-pulse">💸</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>😴</span>
              <span>Maszyny zatrzymane - brak zarobków</span>
              <span>😴</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}