import { useState } from 'react';

interface Prize {
  name: string;
  color: string;
  probability: number;
  emoji: string;
}

export function LotteryWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const prizes: Prize[] = [
    { name: 'Pizza', color: '#ff6b6b', probability: 0.15, emoji: '🍕' },
    { name: '5 EUR', color: '#4ecdc4', probability: 0.10, emoji: '💰' },
    { name: 'Masaż', color: '#45b7d1', probability: 0.10, emoji: '💆' },
    { name: 'Dzień wolny', color: '#96ceb4', probability: 0.10, emoji: '🏖️' },
    { name: 'Dzień urlopu', color: '#feca57', probability: 0.05, emoji: '🌴' },
    { name: 'Nic', color: '#95a5a6', probability: 0.50, emoji: '😐' }
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);
    
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
    
    // Calculate rotation (multiple full rotations + final position)
    const baseRotation = rotation;
    const extraRotations = 5 + Math.random() * 3; // 5-8 full rotations
    const prizeAngle = prizes.findIndex(p => p.name === selectedPrize.name) * (360 / prizes.length);
    const finalRotation = baseRotation + (extraRotations * 360) + (360 - prizeAngle);
    
    setRotation(finalRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setResult(`${selectedPrize.emoji} ${selectedPrize.name}`);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-4 border-2 border-purple-500/30 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-3 text-center">🎰 Loteria Pracownicza</h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Wheel */}
        <div className="relative w-40 h-40">
          <div 
            className="w-full h-full rounded-full border-4 border-white/30 transition-transform duration-3000 ease-out"
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
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${
            isSpinning 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105'
          }`}
        >
          {isSpinning ? 'Kręci się...' : 'ZAKRĘĆ!'}
        </button>
        
        {/* Result */}
        {result && (
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="text-yellow-400 font-bold">Wygrałeś:</div>
            <div className="text-white text-lg font-bold">{result}</div>
          </div>
        )}
        
        {/* Prize List */}
        <div className="text-xs text-purple-200 text-center">
          <div>Nagrody: Pizza (15%), 5€ (10%), Masaż (10%)</div>
          <div>Dzień wolny (10%), Urlop (5%), Nic (50%)</div>
        </div>
      </div>
    </div>
  );
}