import { useState, useEffect } from 'react';

interface CardboardBoxProps {
  isActive: boolean;
  fillLevel: number;
  size: '5T' | '6T' | '10T';
  index: number;
}

function CardboardBox({ isActive, fillLevel, size, index }: CardboardBoxProps) {
  const boxHeight = size === '10T' ? 120 : size === '6T' ? 100 : 80;
  const fillHeight = (fillLevel / 100) * (boxHeight - 20);
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Box */}
      <div 
        className={`relative border-2 rounded-lg transition-all duration-300 ${
          isActive 
            ? 'border-machine-blue shadow-lg shadow-machine-blue/30 bg-gradient-to-b from-orange-200 to-orange-300' 
            : 'border-orange-400 bg-gradient-to-b from-orange-100 to-orange-200'
        }`}
        style={{ 
          width: '60px', 
          height: `${boxHeight}px`,
          background: isActive 
            ? 'linear-gradient(to bottom, #fed7aa, #fb923c, #ea580c)' 
            : 'linear-gradient(to bottom, #ffedd5, #fed7aa, #fdba74)'
        }}
      >
        {/* Box texture lines */}
        <div className="absolute inset-2 border border-orange-500/30 rounded"></div>
        <div className="absolute top-4 left-2 right-2 h-px bg-orange-500/40"></div>
        <div className="absolute bottom-4 left-2 right-2 h-px bg-orange-500/40"></div>
        
        {/* Fill level indicator */}
        {isActive && fillLevel > 0 && (
          <div 
            className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-cyan-400 to-cyan-300 rounded-sm transition-all duration-500 animate-blink-cyan"
            style={{ 
              height: `${fillHeight}px`
            }}
          >
            {/* Cross-hatch pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-600 to-transparent transform rotate-45 scale-150"></div>
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-cyan-600 to-transparent transform -rotate-45 scale-150"></div>
            </div>
          </div>
        )}
        
        {/* SANNER label */}
        <div className="absolute top-1 left-1 right-1 text-center text-xs font-bold text-orange-800 opacity-60">
          SANNER
        </div>
        
        {/* Size indicator */}
        <div className="absolute bottom-1 right-1 text-xs font-bold text-orange-800">
          {size}
        </div>
      </div>
      
      {/* Box number */}
      <div className={`mt-2 text-xs font-medium ${isActive ? 'text-machine-blue' : 'text-gray-500'}`}>
        #{index + 1}
      </div>
    </div>
  );
}

interface CardboardBoxVisualizationProps {
  currentProgress: number;
  boxSize: '5T' | '6T' | '10T';
  completedBoxes: number;
}

export function CardboardBoxVisualization({ currentProgress, boxSize, completedBoxes }: CardboardBoxVisualizationProps) {
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  
  // Pattern: 0 -> 3 -> 1 -> 2 (cross pattern: top-left -> bottom-right -> top-right -> bottom-left)
  const crossPattern = [0, 3, 1, 2];
  
  useEffect(() => {
    if (currentProgress >= 100) {
      // Move to next box in cross pattern
      const currentPatternIndex = crossPattern.indexOf(activeBoxIndex);
      const nextPatternIndex = (currentPatternIndex + 1) % 4;
      setActiveBoxIndex(crossPattern[nextPatternIndex]);
    }
  }, [currentProgress]);

  return (
    <div className="bg-white/10 rounded-xl p-4 border-2 border-white/20">
      <div className="text-center mb-4">
        <div 
          className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            const newCount = Math.floor(Math.random() * 99) + 101; // 101-199
            // This would update the parent component's counter
          }}
        >
          Licznik: {completedBoxes}
        </div>
      </div>
      
      {/* 2x2 grid of boxes */}
      <div className="grid grid-cols-2 gap-2 justify-items-center">
        {[0, 1, 2, 3].map((index) => (
          <CardboardBox
            key={index}
            isActive={index === activeBoxIndex}
            fillLevel={index === activeBoxIndex ? currentProgress : 0}
            size={boxSize}
            index={index}
          />
        ))}
      </div>
      

    </div>
  );
}