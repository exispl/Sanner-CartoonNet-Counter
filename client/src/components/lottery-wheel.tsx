import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Euro } from 'lucide-react';

interface Prize {
  name: string;
  color: string;
  probability: number;
  emoji: string;
}

interface LotteryWheelProps {
  currentUser?: string;
}

export function LotteryWheel({ currentUser = 'SoG1917' }: LotteryWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'accelerating' | 'spinning' | 'decelerating'>('idle');

  const prizes: Prize[] = [
    { name: 'Pizza', color: '#ff6b6b', probability: 0.15, emoji: '🍕' },
    { name: '5 EUR', color: '#4ecdc4', probability: 0.10, emoji: '💰' },
    { name: 'Masaż', color: '#45b7d1', probability: 0.10, emoji: '💆' },
    { name: 'Dzień wolny', color: '#96ceb4', probability: 0.10, emoji: '🏖️' },
    { name: 'Dzień urlopu', color: '#feca57', probability: 0.05, emoji: '🌴' },
    { name: 'Nic', color: '#95a5a6', probability: 0.50, emoji: '😐' }
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    
    // Check if user has enough balance
    const userBalance = localStorage.getItem(`balance_${currentUser}`);
    const balance = userBalance ? parseFloat(userBalance) : 10;
    
    if (balance < 1) {
      alert('Nie masz wystarczająco środków! Potrzebujesz 1 EUR do zakręcenia.');
      return;
    }
    
    // Deduct cost
    const updateBalance = (window as any)[`updateBalance_${currentUser}`];
    if (updateBalance) updateBalance(-1);
    
    spinWheel();
  };

  const handleMouseDown = () => {
    if (isSpinning) return;
    
    setHandlePressed(true);
    holdTimeRef.current = 0;
    
    spinIntervalRef.current = setInterval(() => {
      holdTimeRef.current += 100;
      const intensity = Math.min(3, 1 + (holdTimeRef.current / 1000)); // Max 3x intensity after 2 seconds
      setSpinIntensity(intensity);
    }, 100);
  };

  const handleMouseUp = () => {
    if (!handlePressed) return;
    
    setHandlePressed(false);
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }
    
    spinWheel();
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    setAnimationPhase('accelerating');
    
    // Determine prize based on probability
    const random = Math.random();
    let cumulativeProbability = 0;
    let selectedPrize = prizes[prizes.length - 1]; // Default to "Nic"
    
    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        selectedPrize = prize;
        break;
      }
    }
    
    // Calculate final rotation
    const totalRotations = 8 + Math.random() * 5; // 8-13 full rotations  
    const prizeAngle = prizes.findIndex(p => p.name === selectedPrize.name) * (360 / prizes.length);
    const finalRotation = (totalRotations * 360) + (360 - prizeAngle);
    
    // Animate phases
    setTimeout(() => setAnimationPhase('spinning'), 800);
    setTimeout(() => setAnimationPhase('decelerating'), 2200);
    
    setRotation(finalRotation);
    
    // Stop spinning and show result
    setTimeout(() => {
      setIsSpinning(false);
      setAnimationPhase('idle');
      setResult(`Wygrywasz: ${selectedPrize.name} ${selectedPrize.emoji}`);
      
      // Update user balance if won money
      if (selectedPrize.name.includes('EUR')) {
        const amount = parseFloat(selectedPrize.name);
        const updateBalance = (window as any)[`updateBalance_${currentUser}`];
        if (updateBalance) updateBalance(amount);
      }
    }, 4000);
  };



  return (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-4 border-2 border-purple-500/30 shadow-lg">
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-white">🎰 Loteria Pracownicza</h3>
        <div className="text-xs text-purple-200">Koszt zakręcenia: 1 EUR</div>
      </div>
      
      <div className="flex items-center space-x-6">
        {/* Wheel */}
        <div className="relative w-40 h-40">
          <div 
            className={`w-full h-full rounded-full border-4 border-white/30 ${
              isSpinning 
                ? animationPhase === 'decelerating'
                  ? 'transition-transform duration-[1800ms] ease-out' 
                  : 'transition-transform duration-[3000ms] ease-in-out'
                : 'transition-transform duration-500 ease-out'
            }`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                ${prizes.map((prize, index) => 
                  `${prize.color} ${(index / prizes.length) * 360}deg ${((index + 1) / prizes.length) * 360}deg`
                ).join(', ')}
              )`
            }}
          >
            {/* Prize segments */}
            {prizes.map((prize, index) => {
              const angle = (index * 360) / prizes.length;
              return (
                <div
                  key={prize.name}
                  className="absolute w-full h-full flex items-center justify-center text-white font-bold text-xs"
                  style={{
                    transform: `rotate(${angle + 180 / prizes.length}deg)`,
                    clipPath: `polygon(50% 50%, 0% 0%, ${100 / prizes.length}% 0%)`
                  }}
                >
                  <div className="transform -rotate-90">
                    <div>{prize.emoji}</div>
                    <div className="text-[8px]">{prize.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
            <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
          </div>
          
        </div>

        {/* Spin Button */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white text-xs font-medium">Zakręć kołem</div>
          <Button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white border-2 border-red-800 px-6 py-3 rounded-lg font-bold transition-all ${
              isSpinning ? 'opacity-50 cursor-not-allowed animate-pulse' : 'hover:scale-105 active:scale-95'
            }`}
          >
            {isSpinning ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Kręci...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Euro className="h-4 w-4" />
                <span>Zakręć (1€)</span>
              </div>
            )}
          </Button>
          <div className="text-white text-xs text-center max-w-32">
            {animationPhase === 'accelerating' && 'Rozpędzanie...'}
            {animationPhase === 'spinning' && 'Pełna prędkość!'}
            {animationPhase === 'decelerating' && 'Zwalnia...'}
            {animationPhase === 'idle' && !isSpinning && 'Kliknij aby zakręcić'}
          </div>
        </div>
      </div>
        
      {/* Result */}
      {result && (
        <div className="bg-white/20 rounded-lg p-3 text-center mt-4">
          <div className="text-yellow-400 font-bold">Wygrałeś:</div>
          <div className="text-white text-lg font-bold">{result}</div>
        </div>
      )}
      
      {/* Prize List */}
      <div className="text-xs text-purple-200 text-center mt-4">
        <div>Nagrody: Pizza (15%), 5€ (10%), Masaż (10%)</div>
        <div>Dzień wolny (10%), Urlop (5%), Nic (50%)</div>
      </div>
    </div>
  );
}