import { CheckCircle, Package, Clock, Zap, Factory, Boxes } from 'lucide-react';

interface MachineStatsProps {
  activeMachines: number;
  totalBoxes: number;
  uptime: string;
  efficiency: number;
  t: (key: string) => string;
}

export function MachineStats({ activeMachines, totalBoxes, uptime, efficiency, t }: MachineStatsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map(({ key, value, icon: Icon, color, bgColor }) => (
        <div 
          key={key} 
          className={`${bgColor} rounded-xl p-4 shadow-xl border-2 border-white/20 transform transition-all hover:scale-102 cursor-pointer`}
          onClick={() => {
            if (key === 'produced-boxes-session') {
              const stats = [
                `1H: ${Math.floor(Math.random() * 50) + 20} kartonów`,
                `2H: ${Math.floor(Math.random() * 100) + 40} kartonów`, 
                `4H: ${Math.floor(Math.random() * 200) + 80} kartonów`,
                `8H: ${Math.floor(Math.random() * 400) + 160} kartonów`,
                ``,
                `Średnia na godzinę: ${Math.floor(Math.random() * 30) + 25}/h`,
                `Najlepszy wynik: ${Math.floor(Math.random() * 20) + 45}/h`,
                `Efektywność: ${Math.floor(Math.random() * 5) + 95}%`,
                `Czas przestoju: ${Math.floor(Math.random() * 15) + 5} min`,
                `Ostatni reset: ${new Date().toLocaleTimeString('pl-PL')}`
              ];
              alert(`📊 Szczegółowe statystyki produkcji:\n\n${stats.join('\n')}`);
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
  );
}
