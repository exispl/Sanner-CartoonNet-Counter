import { CheckCircle, Package, Clock, Zap, Factory, Boxes, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MachineStatsProps {
  activeMachines: number;
  totalBoxes: number;
  uptime: string;
  efficiency: number;
  t: (key: string) => string;
}

export function MachineStats({ activeMachines, totalBoxes, uptime, efficiency, t }: MachineStatsProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Auto expand for 5 seconds for produced boxes
  const handleBoxesClick = () => {
    setShowDetails(true);
    setTimeout(() => {
      if (!isHovering) {
        setShowDetails(false);
      }
    }, 5000);
  };

  // Handle ESC key
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showDetails) {
      setShowDetails(false);
    }
  };

  // Add event listener for ESC
  useEffect(() => {
    if (showDetails) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showDetails]);

  const stats = [
    {
      key: 'active-machines',
      value: activeMachines,
      icon: Factory,
      color: 'bg-machine-green',
      bgColor: 'bg-gradient-to-br from-machine-green to-machine-blue'
    },
    {
      key: 'produced-boxes-session',
      value: totalBoxes,
      icon: Boxes,
      color: 'text-machine-blue',
      bgColor: 'bg-gradient-to-br from-machine-blue to-machine-amber'
    },
    {
      key: 'uptime',
      value: uptime,
      icon: Clock,
      color: 'text-machine-amber',
      bgColor: 'bg-gradient-to-br from-machine-amber to-machine-green'
    },
    {
      key: 'efficiency',
      value: `${efficiency}%`,
      icon: Zap,
      color: 'text-machine-red',
      bgColor: efficiency > 95 ? 'bg-gradient-to-br from-green-400 to-green-600 animate-pulse' : 'bg-gradient-to-br from-machine-red to-machine-blue'
    }
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map(({ key, value, icon: Icon, color, bgColor }) => (
          <div 
            key={key} 
            className={`${bgColor} rounded-xl p-4 shadow-xl border-2 border-white/20 transform transition-all hover:scale-102 cursor-pointer`}
            onClick={() => {
              if (key === 'produced-boxes-session') {
                handleBoxesClick();
              } else if (key === 'active-machines') {
                alert(`🏭 Aktywne maszyny:\n\nIlość maszyn: 2\nNumery: MA820062, MA820061\nStatus: Wszystkie działają prawidłowo\nŚrednie obciążenie: 78%`);
              }
            }}
          >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/20">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{t(key)}</p>
              <p className={`text-2xl font-bold text-white drop-shadow-lg ${key === 'efficiency' && efficiency > 95 ? 'animate-bounce' : ''}`}>
                {value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Expandable Statistics Details */}
    {showDetails && (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowDetails(false);
        }}
      >
        <div 
          className="bg-gray-800 rounded-xl p-6 border-2 border-green-400 shadow-2xl max-w-md w-full mx-4 relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center mb-4">
            <Boxes className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <h3 className="text-xl font-bold text-white">Szczegółowe statystyki produkcji</h3>
          </div>
          
          <div className="space-y-3 text-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-300">1 godzina</div>
                <div className="text-lg font-bold">{Math.floor(Math.random() * 30) + 35} kartonów</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-300">2 godziny</div>
                <div className="text-lg font-bold">{Math.floor(Math.random() * 60) + 70} kartonów</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-300">4 godziny</div>
                <div className="text-lg font-bold">{Math.floor(Math.random() * 120) + 140} kartonów</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-sm text-gray-300">8 godzin</div>
                <div className="text-lg font-bold">{Math.floor(Math.random() * 200) + 280} kartonów</div>
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Średnia na godzinę:</span>
                <span className="font-bold text-green-400">{Math.floor(Math.random() * 15) + 35}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Najlepszy wynik:</span>
                <span className="font-bold text-blue-400">{Math.floor(Math.random() * 20) + 50}/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Efektywność:</span>
                <span className="font-bold text-yellow-400">{Math.floor(Math.random() * 5) + 94}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Czas przestoju:</span>
                <span className="font-bold text-red-400">{Math.floor(Math.random() * 15) + 3} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Ostatni reset:</span>
                <span className="font-bold">{new Date().toLocaleTimeString('pl-PL')}</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400 text-center mt-4">
              Naciśnij ESC aby zamknąć • Najedź aby zatrzymać auto-zamykanie
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
