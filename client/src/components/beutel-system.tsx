import { useState, useEffect } from 'react';

interface BeutelSystemProps {
  currentBox: number;
  itemsInBox: number;
  limit: number;
}

export function BeutelSystem({ currentBox, itemsInBox, limit }: BeutelSystemProps) {
  const [beutels, setBeutels] = useState<{ [key: string]: boolean }>({});
  
  // Calculate Beutel numbers - always double the carton number
  const beutel1Number = (currentBox * 2) - 1;
  const beutel2Number = currentBox * 2;
  
  const beutel1Key = `${currentBox}-1`;
  const beutel2Key = `${currentBox}-2`;
  
  // Auto-select based on progress (each Beutel = 3000 pieces)
  useEffect(() => {
    const newBeutels = { ...beutels };
    
    if (itemsInBox >= 3000) {
      newBeutels[beutel1Key] = true;
    } else {
      newBeutels[beutel1Key] = false;
    }
    
    if (itemsInBox >= 6000) {
      newBeutels[beutel2Key] = true;
    } else {
      newBeutels[beutel2Key] = false;
    }
    
    setBeutels(newBeutels);
  }, [itemsInBox, beutel1Key, beutel2Key]);
  
  const toggleBeutel = (key: string) => {
    setBeutels(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="mt-4 mb-4">
      <div className="text-center text-white text-sm font-medium mb-2">
        Karton {currentBox} - Beutels {beutel1Number}, {beutel2Number}
      </div>
      
      <div className="flex justify-center space-x-3">
        <div 
          className={`
            w-20 h-12 rounded-lg border-2 cursor-pointer flex flex-col items-center justify-center transition-all duration-300
            ${beutels[beutel1Key] 
              ? 'bg-gray-400 border-gray-600 text-black' 
              : 'bg-silver-200 border-silver-400 text-gray-700 hover:bg-silver-300'
            }
          `}
          onClick={() => toggleBeutel(beutel1Key)}
          style={{
            background: beutels[beutel1Key] 
              ? 'linear-gradient(145deg, #9ca3af, #6b7280)' 
              : 'linear-gradient(145deg, #e5e7eb, #d1d5db)',
            boxShadow: beutels[beutel1Key]
              ? 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.1)'
              : '2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.8)'
          }}
        >
          <div className="text-xs font-semibold">Beutel {beutel1Number}</div>
          <div className="text-xs">3000</div>
        </div>
        
        <div 
          className={`
            w-20 h-12 rounded-lg border-2 cursor-pointer flex flex-col items-center justify-center transition-all duration-300
            ${beutels[beutel2Key] 
              ? 'bg-gray-400 border-gray-600 text-black' 
              : 'bg-silver-200 border-silver-400 text-gray-700 hover:bg-silver-300'
            }
          `}
          onClick={() => toggleBeutel(beutel2Key)}
          style={{
            background: beutels[beutel2Key] 
              ? 'linear-gradient(145deg, #9ca3af, #6b7280)' 
              : 'linear-gradient(145deg, #e5e7eb, #d1d5db)',
            boxShadow: beutels[beutel2Key]
              ? 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(255,255,255,0.1)'
              : '2px 2px 6px rgba(0,0,0,0.2), inset 1px 1px 2px rgba(255,255,255,0.8)'
          }}
        >
          <div className="text-xs font-semibold">Beutel {beutel2Number}</div>
          <div className="text-xs">3000</div>
        </div>
      </div>
      
      <div className="text-center text-white text-xs mt-2 opacity-75">
        {itemsInBox}/6000 sztuk (1 Beutel = 3000 sztuk)
      </div>
    </div>
  );
}