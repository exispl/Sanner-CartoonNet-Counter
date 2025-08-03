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
      bgColor: 'bg-gradient-to-br from-machine-red to-machine-blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map(({ key, value, icon: Icon, color, bgColor }) => (
        <div key={key} className={`${bgColor} rounded-xl p-4 shadow-xl border-2 border-white/20 transform transition-all hover:scale-102`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/20">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/90">{t(key)}</p>
              <p className="text-2xl font-bold text-white drop-shadow-lg">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
