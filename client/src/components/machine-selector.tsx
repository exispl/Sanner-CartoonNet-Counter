import { useState } from 'react';
import { ChevronDown, Settings } from 'lucide-react';

const machineNumbers = [16, 68, 50, 59, 54, 51, 61, 63, 17, 18, 53, 25, 56, 22, 64, 19, 26];

interface MachineSelectorProps {
  currentNumber: number;
  onMachineChange: (number: number) => void;
  machineId: number;
}

export function MachineSelector({ currentNumber, onMachineChange, machineId }: MachineSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-32 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white font-medium text-sm"
        data-testid={`machine-selector-${machineId}`}
      >
        <span>MA8200<strong>{currentNumber}</strong></span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-industrial-900 rounded-lg shadow-xl border border-industrial-200 dark:border-industrial-600 z-50 max-h-48 overflow-y-auto">
          {machineNumbers.map((number) => (
            <button
              key={number}
              onClick={() => {
                onMachineChange(number);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-industrial-50 dark:hover:bg-industrial-700 transition-colors border-b border-industrial-100 dark:border-industrial-700 last:border-b-0 ${
                currentNumber === number 
                  ? 'bg-machine-blue/10 text-machine-blue dark:text-machine-blue font-semibold' 
                  : 'text-industrial-800 dark:text-industrial-100'
              }`}
              data-testid={`machine-option-${number}`}
            >
              <div className="flex items-center justify-between">
                <span>MA8200<strong>{number}</strong></span>
                {currentNumber === number && (
                  <div className="w-2 h-2 bg-machine-blue rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}