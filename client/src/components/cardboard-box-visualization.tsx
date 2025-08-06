import { useState, useEffect } from 'react';

interface CardboardBoxProps {
  isActive: boolean;
  fillLevel: number;
  size: '5T' | '6T' | '10T';
  index: number;
  isCompleted?: boolean;
  theme: 'zielona' | 'niebieska' | 'żółta';
}

function CardboardBox({ isActive, fillLevel, size, index, isCompleted, theme }: CardboardBoxProps) {
  const boxHeight = size === '10T' ? 120 : size === '6T' ? 100 : 80;
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
          width: '60px', 
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
        {/* Box texture lines */}
        <div className="absolute inset-2 border border-orange-500/30 rounded"></div>
        <div className="absolute top-4 left-2 right-2 h-px bg-orange-500/40"></div>
        <div className="absolute bottom-4 left-2 right-2 h-px bg-orange-500/40"></div>
        
        {/* MA59 Beutel visualization - 2 silver bags */}
        {size === '10T' && (
          <div className="absolute bottom-2 left-2 right-2 top-8 flex flex-col space-y-1">
            {/* Beutel 1 - Top half */}
            <div 
              className={`flex-1 rounded-sm border border-gray-400 transition-all duration-500 ${
                isActive && fillLevel >= 50 
                  ? 'bg-gradient-to-t from-gray-300 to-gray-400 shadow-md opacity-90' 
                  : 'bg-gradient-to-t from-gray-100 to-gray-200 opacity-60'
              }`}
              style={{
                backgroundImage: isActive && fillLevel >= 50 
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4), transparent)'
                  : 'none'
              }}
            >
              <div className="text-center text-[8px] text-gray-700 mt-1 font-semibold">
                Beutel 1
              </div>
              <div className="text-center text-[7px] text-gray-600">
                3000
              </div>
            </div>
            
            {/* Beutel 2 - Bottom half */}
            <div 
              className={`flex-1 rounded-sm border border-gray-400 transition-all duration-500 ${
                isActive && fillLevel >= 100 
                  ? 'bg-gradient-to-t from-gray-300 to-gray-400 shadow-md opacity-90' 
                  : 'bg-gradient-to-t from-gray-100 to-gray-200 opacity-60'
              }`}
              style={{
                backgroundImage: isActive && fillLevel >= 100 
                  ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.4), transparent)'
                  : 'none'
              }}
            >
              <div className="text-center text-[8px] text-gray-700 mt-1 font-semibold">
                Beutel 2
              </div>
              <div className="text-center text-[7px] text-gray-600">
                3000
              </div>
            </div>
          </div>
        )}

        {/* Regular fill level indicator for non-MA59 machines */}
        {size !== '10T' && isActive && fillLevel > 0 && (
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
        
        {/* SANNER label - smaller and lower */}
        <div className="absolute top-3 left-1 right-1 text-center text-[10px] font-bold text-orange-600 opacity-70">
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
  theme?: 'zielona' | 'niebieska' | 'żółta';
}

export function CardboardBoxVisualization({ currentProgress, boxSize, completedBoxes, theme = 'zielona' }: CardboardBoxVisualizationProps) {
  const [activeBoxIndex, setActiveBoxIndex] = useState(0);
  
  // Pattern: 0 -> 3 -> 1 -> 2 (cross pattern: top-left -> bottom-right -> top-right -> bottom-left)
  const crossPattern = [0, 3, 1, 2];
  
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
    <div className="bg-white/10 rounded-xl p-4 border-2 border-white/20">
      <div className="text-center mb-4">
        <div 
          className="text-sm text-white/80 cursor-pointer hover:text-white transition-colors"
          onClick={() => {
            // Show statistics modal - placeholder for now
            alert(`Statystyki produkcji:\n1H: ${Math.floor(Math.random() * 50) + 20}\n2H: ${Math.floor(Math.random() * 100) + 40}\n4H: ${Math.floor(Math.random() * 200) + 80}\n8H: ${Math.floor(Math.random() * 400) + 160}`);
          }}
        >
          Licznik: {completedBoxes}
        </div>
      </div>
      
      {/* 2x2 grid of boxes with increased spacing and arrows */}
      <div className="relative">
        {/* Górne kartony */}
        <div className="mb-6">
          <div className="text-xs text-white/60 mb-2 text-center">Górne</div>
          <div className="grid grid-cols-2 gap-8 justify-items-center">
          {[0, 1].map((index) => {
            const isCompleted = index < completedBoxes;
            const isNext = index === activeBoxIndex && !isCompleted;
            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Arrow pointing to next box - slower animation */}
                {isNext && (
                  <div className="absolute -top-6 text-white/80 animate-pulse">
                    <div className="text-lg">↓</div>
                  </div>
                )}
                
                <div
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={(event) => {
                    const target = event.currentTarget as HTMLElement;
                    if (target && isCompleted) {
                      // Reset animation and color
                      target.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                        target.style.transform = '';
                      }, 200);
                    }
                  }}
                >
                  <div className={isCompleted ? 'animate-pulse-slow' : ''}>
                    <CardboardBox
                      isActive={index === activeBoxIndex}
                      fillLevel={index === activeBoxIndex ? currentProgress : 0}
                      size={boxSize}
                      index={index}
                      isCompleted={isCompleted}
                      theme={theme}
                    />
                  </div>
                </div>
                

              </div>
            );
          })}
          </div>
        </div>
        
        {/* Dolne kartony */}
        <div>
          <div className="text-xs text-white/60 mb-2 text-center">Dolne</div>
          <div className="grid grid-cols-2 gap-8 justify-items-center">
          {[2, 3].map((index) => {
            const isCompleted = index < completedBoxes;
            const isNext = index === activeBoxIndex && !isCompleted;
            return (
              <div key={index} className="relative flex flex-col items-center">
                {/* Arrow pointing to next box - slower animation */}
                {isNext && (
                  <div className="absolute -top-6 text-white/80 animate-pulse">
                    <div className="text-lg">↓</div>
                  </div>
                )}
                
                <div
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={(event) => {
                    const target = event.currentTarget as HTMLElement;
                    if (target && isCompleted) {
                      // Reset animation and color
                      target.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                        target.style.transform = '';
                      }, 200);
                    }
                  }}
                >
                  <div className={isCompleted ? 'animate-pulse-slow' : ''}>
                    <CardboardBox
                      isActive={index === activeBoxIndex}
                      fillLevel={index === activeBoxIndex ? currentProgress : 0}
                      size={boxSize}
                      index={index}
                      isCompleted={isCompleted}
                      theme={theme}
                    />
                  </div>
                </div>
                

              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}