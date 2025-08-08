import { useState, useEffect } from 'react';

interface CardboardBoxProps {
  isActive: boolean;
  fillLevel: number;
  size: '5T' | '6T' | '10T';
  index: number;
  isCompleted?: boolean;
  theme: 'zielona' | 'niebieska' | 'żółta';
  selectedBeutels?: { beutel1: boolean; beutel2: boolean };
  onBeutelSelect?: (beutelNumber: 1 | 2) => void;
}

function CardboardBox({ isActive, fillLevel, size, index, isCompleted, theme, selectedBeutels, onBeutelSelect }: CardboardBoxProps) {
  const boxHeight = size === '10T' ? 144 : size === '6T' ? 125 : 80;  // 6T: 100+25=125, MA59 (10T): 144
  const boxWidth = size === '10T' ? 48 : 60;  // MA59 (10T): 60*0.8 = 48 (20% narrower)
  const fillHeight = (fillLevel / 100) * (boxHeight - 20);
  
  return (
    <div className="relative flex flex-col items-center">
      {/* Box */}
      <div 
        className={`relative border-2 rounded-lg transition-all duration-300 transform scale-[1.75] ${
          isCompleted
            ? 'border-orange-400 bg-gradient-to-b from-orange-100 to-orange-200'
            : isActive 
            ? 'border-green-400 shadow-lg shadow-green-400/50 bg-gradient-to-b from-green-200 to-green-400 animate-pulse' 
            : 'border-orange-400 bg-gradient-to-b from-orange-100 to-orange-200'
        }`}
        style={{ 
          width: `${boxWidth}px`, 
          height: `${boxHeight}px`,
          background: isCompleted
            ? theme === 'zielona' 
              ? 'linear-gradient(to bottom, #86efac, #22c55e, #15803d)'
              : theme === 'niebieska'
              ? 'linear-gradient(to bottom, #93c5fd, #3b82f6, #1d4ed8)'
              : 'linear-gradient(to bottom, #fef08a, #eab308, #a16207)'
            : isActive 
            ? theme === 'zielona' 
              ? 'linear-gradient(to bottom, #dcfce7, #86efac, #22c55e)'
              : theme === 'niebieska'
              ? 'linear-gradient(to bottom, #dbeafe, #93c5fd, #3b82f6)'
              : 'linear-gradient(to bottom, #fefce8, #fef08a, #eab308)'
            : theme === 'zielona' 
              ? 'linear-gradient(to bottom, #f0fdf4, #dcfce7, #bbf7d0)'
              : theme === 'niebieska'
              ? 'linear-gradient(to bottom, #eff6ff, #dbeafe, #bfdbfe)'
              : 'linear-gradient(to bottom, #fffbeb, #fefce8, #fef3c7)'
        }}
      >
        {/* MA59 Beutel visualization - 2 silver bags */}
        {size === '10T' && (
          <div className="absolute bottom-2 left-2 right-2 top-2 flex flex-col space-y-1">
            {/* Beutel 1 - Top half */}
            <div 
              className={`flex-1 rounded-sm border-2 transition-all duration-500 cursor-pointer hover:scale-105 ${
                selectedBeutels?.beutel1
                  ? 'border-blue-500 bg-gradient-to-t from-blue-200 to-blue-300 shadow-lg shadow-blue-400/50'
                  : isActive && fillLevel >= 50 
                  ? 'border-gray-400 bg-gradient-to-t from-gray-300 to-gray-400 shadow-md opacity-90' 
                  : 'border-gray-400 bg-gradient-to-t from-gray-100 to-gray-200 opacity-60 hover:opacity-80'
              }`}
              style={{
                backgroundImage: selectedBeutels?.beutel1
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6), transparent)'
                  : isActive && fillLevel >= 50 
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4), transparent)'
                  : 'none'
              }}
              onClick={() => onBeutelSelect?.(1)}
            >
              <div className={`text-center text-[10px] mt-1 font-semibold ${
                selectedBeutels?.beutel1 ? 'text-blue-800' : 'text-gray-700'
              }`}>
                Beutel 1
              </div>
              <div className={`text-center text-[9px] font-bold ${
                selectedBeutels?.beutel1 ? 'text-blue-700' : 'text-gray-600'
              }`}>
                3000
              </div>
              {selectedBeutels?.beutel1 && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
            
            {/* Beutel 2 - Bottom half */}
            <div 
              className={`flex-1 rounded-sm border-2 transition-all duration-500 cursor-pointer hover:scale-105 relative ${
                selectedBeutels?.beutel2
                  ? 'border-green-500 bg-gradient-to-t from-green-200 to-green-300 shadow-lg shadow-green-400/50'
                  : isActive && fillLevel >= 100 
                  ? 'border-gray-400 bg-gradient-to-t from-gray-300 to-gray-400 shadow-md opacity-90' 
                  : 'border-gray-400 bg-gradient-to-t from-gray-100 to-gray-200 opacity-60 hover:opacity-80'
              }`}
              style={{
                backgroundImage: selectedBeutels?.beutel2
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6), transparent)'
                  : isActive && fillLevel >= 100 
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4), transparent)'
                  : 'none'
              }}
              onClick={() => onBeutelSelect?.(2)}
            >
              <div className={`text-center text-[10px] mt-1 font-semibold ${
                selectedBeutels?.beutel2 ? 'text-green-800' : 'text-gray-700'
              }`}>
                Beutel 2
              </div>
              <div className={`text-center text-[9px] font-bold ${
                selectedBeutels?.beutel2 ? 'text-green-700' : 'text-gray-600'
              }`}>
                3000
              </div>
              {selectedBeutels?.beutel2 && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 100 horizontal lines with 10% step filling for non-MA59 machines */}
        {size !== '10T' && (
          <div className="absolute bottom-2 left-2 right-2 top-2 overflow-hidden">
            {/* 100 horizontal lines */}
            {Array.from({ length: 100 }).map((_, lineIndex) => {
              const lineFromBottom = 100 - lineIndex; // Line position from bottom (1-100)
              const shouldFill = isActive && (fillLevel >= (lineFromBottom - 1));
              const lineHeight = (boxHeight - 16) / 100; // Distribute lines evenly
              
              return (
                <div
                  key={lineIndex}
                  className={`absolute w-full transition-all duration-300 ${
                    shouldFill 
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-300 animate-pulse shadow-sm' 
                      : 'bg-gray-200/40'
                  }`}
                  style={{
                    height: `${Math.max(0.8, lineHeight)}px`,
                    bottom: `${lineIndex * lineHeight}px`,
                    opacity: shouldFill ? 0.9 : 0.3
                  }}
                />
              );
            })}
          </div>
        )}
        
        {/* Size indicator - show number with T */}
        <div className="absolute bottom-1 right-1 text-xs font-bold text-orange-800">
          {size === '6T' ? '6T' : size === '5T' ? '5T' : size === '10T' ? '10T' : size}
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
  theme?: 'zielona' | 'niebieska' | 'żółta';
  onReset?: () => void;
}

export function CardboardBoxVisualization({ currentProgress, boxSize, completedBoxes, theme = 'zielona', onReset }: CardboardBoxVisualizationProps) {
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  const [selectedBeutels, setSelectedBeutels] = useState<Array<{ beutel1: boolean; beutel2: boolean }>>([
    { beutel1: false, beutel2: false },
    { beutel1: false, beutel2: false },
    { beutel1: false, beutel2: false },
    { beutel1: false, beutel2: false }
  ]);
  
  // Pattern: 0 -> 3 -> 1 -> 2 (cross pattern: top-left -> bottom-right -> top-right -> bottom-left)
  const crossPattern = [0, 3, 1, 2];

  const handleBeutelSelect = (boxIndex: number, beutelNumber: 1 | 2) => {
    if (boxSize !== '10T') return; // Only for MA59 machines
    
    setSelectedBeutels(prev => {
      const newSelected = [...prev];
      if (beutelNumber === 1) {
        newSelected[boxIndex] = { ...newSelected[boxIndex], beutel1: !newSelected[boxIndex].beutel1 };
      } else {
        newSelected[boxIndex] = { ...newSelected[boxIndex], beutel2: !newSelected[boxIndex].beutel2 };
      }
      return newSelected;
    });
  };
  
  useEffect(() => {
    if (currentProgress >= 100) {
      // Move to next box in cross pattern with delay
      setTimeout(() => {
        const currentPatternIndex = crossPattern.indexOf(activeBoxIndex);
        const nextPatternIndex = (currentPatternIndex + 1) % 4;
        setActiveBoxIndex(crossPattern[nextPatternIndex]);
      }, 2500); // 2.5 second delay between boxes - slower transition
    }
  }, [currentProgress, activeBoxIndex, crossPattern]);

  return (
    <div className="bg-white/20 rounded-xl p-4 border-2 border-white/30">
      <div className="text-center mb-4">
        <div 
          className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            // Functional cardboard click handler
            console.log('Cardboard clicked:', completedBoxes);
          }}
        >
          Licznik: {completedBoxes}
        </div>
      </div>
      
      {/* Display 4 boxes in 2x2 grid with better spacing */}
      <div className="grid grid-cols-2 gap-6 justify-items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <div
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={() => {
                console.log(`Cardboard box ${index + 1} clicked`);
                // Reset the box if it's completed or active
                if (index <= activeBoxIndex && onReset) {
                  onReset();
                }
              }}
            >
              <CardboardBox
                isActive={index === activeBoxIndex}
                fillLevel={index === activeBoxIndex ? currentProgress : (index < activeBoxIndex ? 100 : 0)}
                size={boxSize}
                index={index}
                isCompleted={index < activeBoxIndex}
                theme={theme}
                selectedBeutels={selectedBeutels[index]}
                onBeutelSelect={(beutelNumber) => handleBeutelSelect(index, beutelNumber)}
              />
            </div>
            {/* Better spacing line between cartons */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Progress visualization below */}
      <div className="mt-6 space-y-2">
        <div className="text-xs text-white/60 text-center">Wzór wypełniania (krzyżowy)</div>
      </div>
    </div>
  );
}