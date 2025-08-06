import { useState } from 'react';

interface MA59CardboardBoxProps {
  isActive: boolean;
  fillLevel: number;
  index: number;
  isCompleted?: boolean;
  theme: 'zielona' | 'niebieska' | 'żółta';
  currentBox: number;
  itemsInBox: number;
}

export function MA59CardboardBox({ 
  isActive, 
  fillLevel, 
  index, 
  isCompleted, 
  theme, 
  currentBox,
  itemsInBox
}: MA59CardboardBoxProps) {
  const [beutel1Selected, setBeutel1Selected] = useState(itemsInBox >= 3000);
  const [beutel2Selected, setBeutel2Selected] = useState(itemsInBox >= 6000);
  
  const boxHeight = 120;
  const beutel1Number = (currentBox * 2) - 1;
  const beutel2Number = currentBox * 2;
  
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
        
        {/* SANNER label - smaller and higher */}
        <div className="absolute top-1 left-1 right-1 text-center text-[8px] font-bold text-orange-600 opacity-70">
          SANNER
        </div>
        
        {/* MA59 Beutel visualization - 2 clickable silver bags */}
        <div className="absolute bottom-2 left-2 right-2 top-6 flex flex-col space-y-1">
          {/* Beutel 1 - Top half */}
          <div 
            className={`flex-1 rounded-sm border cursor-pointer transition-all duration-300 ${
              beutel1Selected 
                ? 'bg-gradient-to-t from-gray-400 to-gray-500 border-gray-600 shadow-inner' 
                : 'bg-gradient-to-t from-gray-200 to-gray-300 border-gray-400 hover:bg-gradient-to-t hover:from-gray-300 hover:to-gray-400'
            }`}
            onClick={() => setBeutel1Selected(!beutel1Selected)}
            style={{
              backgroundImage: beutel1Selected 
                ? 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.2), transparent), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3), transparent)'
                : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6), transparent)'
            }}
          >
            <div className={`text-center text-[7px] font-bold mt-[2px] ${beutel1Selected ? 'text-black' : 'text-gray-700'}`}>
              Beutel {beutel1Number}
            </div>
            <div className={`text-center text-[6px] ${beutel1Selected ? 'text-black' : 'text-gray-600'}`}>
              3000
            </div>
          </div>
          
          {/* Beutel 2 - Bottom half */}
          <div 
            className={`flex-1 rounded-sm border cursor-pointer transition-all duration-300 ${
              beutel2Selected 
                ? 'bg-gradient-to-t from-gray-400 to-gray-500 border-gray-600 shadow-inner' 
                : 'bg-gradient-to-t from-gray-200 to-gray-300 border-gray-400 hover:bg-gradient-to-t hover:from-gray-300 hover:to-gray-400'
            }`}
            onClick={() => setBeutel2Selected(!beutel2Selected)}
            style={{
              backgroundImage: beutel2Selected 
                ? 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.2), transparent), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3), transparent)'
                : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6), transparent)'
            }}
          >
            <div className={`text-center text-[7px] font-bold mt-[2px] ${beutel2Selected ? 'text-black' : 'text-gray-700'}`}>
              Beutel {beutel2Number}
            </div>
            <div className={`text-center text-[6px] ${beutel2Selected ? 'text-black' : 'text-gray-600'}`}>
              3000
            </div>
          </div>
        </div>
        
        {/* Size indicator */}
        <div className="absolute bottom-1 right-1 text-[8px] font-bold text-orange-800">
          10T
        </div>
      </div>
      
      {/* Box number */}
      <div className={`mt-2 text-xs font-medium ${isActive ? 'text-machine-blue' : 'text-gray-500'}`}>
        #{index + 1}
      </div>
    </div>
  );
}