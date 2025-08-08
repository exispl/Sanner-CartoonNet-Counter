import { useState, useEffect } from 'react';

interface CardboardBoxVisualizationProps {
  currentProgress: number;
  boxSize: '5T' | '6T' | '10T';
  completedBoxes: number;
  theme: 'zielona' | 'niebieska' | 'żółta';
}

interface CardboardBoxProps {
  isActive: boolean;
  fillLevel: number;
  size: '5T' | '6T' | '10T';
  index: number;
  isCompleted: boolean;
  theme: 'zielona' | 'niebieska' | 'żółta';
}

function CardboardBox({ 
  isActive, 
  fillLevel, 
  size, 
  index, 
  isCompleted, 
  theme 
}: CardboardBoxProps) {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (isActive && fillLevel > 0) {
      setAnimationClass('animate-pulse');
    } else if (isCompleted) {
      setAnimationClass('animate-bounce');
    } else {
      setAnimationClass('');
    }
  }, [isActive, fillLevel, isCompleted]);

  // Theme-based colors with better contrast
  const themeColors = {
    zielona: {
      bg: '#dcfce7',
      border: '#16a34a',
      fill: '#22c55e'
    },
    niebieska: {
      bg: '#dbeafe',
      border: '#2563eb',
      fill: '#3b82f6'
    },
    żółta: {
      bg: '#fef3c7',
      border: '#d97706',
      fill: '#f59e0b'
    }
  };

  const colors = themeColors[theme];
  const displaySize = size.replace('T', ''); // Remove 'T' to show just number

  return (
    <div className="flex flex-col items-center space-y-2">
      <div 
        className={`relative rounded-lg border-4 ${animationClass} transition-all duration-500 shadow-lg hover:shadow-xl cursor-pointer`}
        style={{
          width: 80,
          height: size === '6T' ? 125 : 100, // Zwiększ wysokość kartonów 6T o 25px
          backgroundColor: isCompleted ? colors.fill : colors.bg,
          borderColor: isActive ? colors.fill : colors.border,
          transform: isActive ? 'scale(1.05)' : 'scale(1)'
        }}
        onClick={() => console.log(`Cardboard box ${index + 1} clicked`)}
      >
        {/* 100 horizontal lines with 10% step filling */}
        <div className="absolute bottom-1 left-1 right-1 top-1 overflow-hidden">
          {Array.from({ length: 100 }).map((_, lineIndex) => {
            const lineFromBottom = 100 - lineIndex; // Line position from bottom (1-100)
            const shouldFill = isActive && (fillLevel >= (lineFromBottom - 1));
            const boxContentHeight = (size === '6T' ? 125 : 100) - 8; // Account for padding
            const lineHeight = boxContentHeight / 100; // Distribute lines evenly
            
            return (
              <div
                key={lineIndex}
                className={`absolute w-full transition-all duration-300 ${
                  shouldFill 
                    ? `animate-pulse shadow-sm` 
                    : 'bg-gray-200/30'
                }`}
                style={{
                  height: `${Math.max(0.8, lineHeight)}px`,
                  bottom: `${lineIndex * lineHeight}px`,
                  backgroundColor: shouldFill ? colors.fill : 'rgba(156, 163, 175, 0.3)',
                  opacity: shouldFill ? 0.9 : 0.4
                }}
              />
            );
          })}
        </div>

        {/* Cardboard texture - realistic corrugated pattern */}
        <div className="absolute inset-0 rounded-md overflow-hidden opacity-30">
          {/* Horizontal lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute w-full h-px bg-orange-400"
              style={{ top: `${(i + 1) * 8}%` }}
            />
          ))}
          {/* Vertical lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute h-full w-px bg-orange-400"
              style={{ left: `${(i + 1) * 16}%` }}
            />
          ))}
        </div>

        {/* SANNER branding */}
        <div className="absolute top-2 left-0 right-0 text-center text-xs font-bold text-orange-700">
          SANNER
        </div>
        
        {/* Size number - bottom right */}
        <div className="absolute bottom-1 right-2 text-sm font-bold text-orange-800 bg-white/50 rounded px-1">
          {displaySize}
        </div>

        {/* Progress indicator for active box */}
        {isActive && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white bg-black/50 rounded px-2 py-1">
            {Math.round(fillLevel)}%
          </div>
        )}
      </div>
      
      {/* Box status indicator */}
      <div className="flex flex-col items-center space-y-1">
        <div className="text-xs font-medium text-white/90">
          Karton #{index + 1}
        </div>
        <div className={`w-3 h-3 rounded-full ${
          isCompleted ? 'bg-green-500' : 
          isActive ? 'bg-yellow-500 animate-pulse' : 
          'bg-gray-400'
        }`} />
      </div>
    </div>
  );
}

export function CardboardBoxVisualization({ 
  currentProgress, 
  boxSize, 
  completedBoxes,
  theme 
}: CardboardBoxVisualizationProps) {
  const activeBoxIndex = Math.min(3, Math.floor(completedBoxes));
  
  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 rounded-xl p-6 border-2 border-white/20 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <span>📦</span>
          <span>Wizualizacja Kartonów</span>
        </h3>
        <div className="bg-white/20 rounded-lg px-3 py-1">
          <span className="text-sm font-medium text-white">
            Ukończone: {completedBoxes}
          </span>
        </div>
      </div>
      
      {/* 2x2 grid with improved spacing and alignment */}
      <div className="grid grid-cols-2 gap-8 justify-items-center items-start">
        {Array.from({ length: 4 }).map((_, index) => (
          <div 
            key={index} 
            className="transition-all duration-300 hover:scale-105"
          >
            <CardboardBox
              isActive={index === activeBoxIndex}
              fillLevel={index === activeBoxIndex ? currentProgress : (index < activeBoxIndex ? 100 : 0)}
              size={boxSize}
              index={index}
              isCompleted={index < activeBoxIndex}
              theme={theme}
            />
          </div>
        ))}
      </div>

      {/* Progress summary */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex justify-between text-sm text-white/80">
          <span>Aktualny postęp:</span>
          <span className="font-medium">{currentProgress.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}