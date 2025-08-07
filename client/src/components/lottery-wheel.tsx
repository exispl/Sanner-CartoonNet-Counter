import { useState, useRef, useEffect } from 'react';

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
  const [isSlowingDown, setIsSlowingDown] = useState(false);
  const [finalPrize, setFinalPrize] = useState<Prize | null>(null);
  const [handlePressed, setHandlePressed] = useState(false);
  const [spinIntensity, setSpinIntensity] = useState(1);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const holdTimeRef = useRef(0);

  const prizes: Prize[] = [
    { name: 'Pizza', color: '#ff6b6b', probability: 0.15, emoji: '🍕' },
    { name: '5 EUR', color: '#4ecdc4', probability: 0.10, emoji: '💰' },
    { name: 'Masaż', color: '#45b7d1', probability: 0.10, emoji: '💆' },
    { name: 'Dzień wolny', color: '#96ceb4', probability: 0.10, emoji: '🏖️' },
    { name: 'Dzień urlopu', color: '#feca57', probability: 0.05, emoji: '🌴' },
    { name: 'Nic', color: '#95a5a6', probability: 0.50, emoji: '😐' }
  ];

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
    setFinalPrize(null);
    setIsSlowingDown(false);
    
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
    
    setFinalPrize(selectedPrize);
    
    // Calculate rotation (multiple full rotations + final position)
    const baseRotation = rotation;
    const extraRotations = (3 + Math.random() * 2) * spinIntensity; // 3-5 base rotations * intensity
    const prizeAngle = prizes.findIndex(p => p.name === selectedPrize.name) * (360 / prizes.length);
    const finalRotation = baseRotation + (extraRotations * 360) + (360 - prizeAngle);
    
    setRotation(finalRotation);
    
    // Start slowing down after 70% of spin time
    setTimeout(() => {
      setIsSlowingDown(true);
    }, 2100);
    
    // Stop spinning
    setTimeout(() => {
      setIsSpinning(false);
      setResult(`${selectedPrize.emoji} ${selectedPrize.name}`);
      setSpinIntensity(1);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl p-4 border-2 border-purple-500/30 shadow-lg">
      <h3 className="text-lg font-bold text-white mb-3 text-center">🎰 Loteria Pracownicza</h3>
      
      <div className="flex items-center space-x-6">
        {/* Wheel */}
        <div className="relative w-40 h-40">
          <div 
            className={`w-full h-full rounded-full border-4 border-white/30 ${
              isSpinning 
                ? isSlowingDown 
                  ? 'transition-transform duration-1000 ease-out' 
                  : 'transition-transform duration-2000 ease-out'
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
          
          {/* Winning prize indicator */}
          {finalPrize && isSlowingDown && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              Zatrzymuje się na: {finalPrize.emoji}
            </div>
          )}
        </div>

        {/* Manual Handle */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white text-xs font-medium">Kręć ręcznie</div>
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            disabled={isSpinning}
            className={`relative w-12 h-24 bg-gradient-to-b from-red-500 to-red-700 rounded-full border-2 border-red-800 transition-all duration-150 ${
              handlePressed ? 'scale-95 shadow-inner' : 'shadow-lg hover:shadow-xl'
            } ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-400 hover:to-red-600 active:scale-95'}`}
            style={{
              transform: handlePressed ? 'translateY(2px)' : 'translateY(0px)'
            }}
          >
            {/* Handle grip lines */}
            <div className="absolute inset-2 space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-0.5 bg-red-800/50 rounded-full"></div>
              ))}
            </div>
            
            {/* Intensity indicator */}
            {handlePressed && (
              <div 
                className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold"
                style={{ minWidth: '40px' }}
              >
                {spinIntensity.toFixed(1)}x
              </div>
            )}
          </button>
          <div className="text-white text-xs text-center max-w-20">
            {isSpinning ? 'Kręci się...' : 'Przytrzymaj dla większej mocy'}
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