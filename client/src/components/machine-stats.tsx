import { CheckCircle, Package, Clock, Zap } from 'lucide-react';

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
      icon: CheckCircle,
      color: 'bg-machine-green',
      bgColor: 'bg-machine-green bg-opacity-10'
    },
    {
      key: 'total-boxes',
      value: totalBoxes,
      icon: Package,
      color: 'text-machine-blue',
      bgColor: 'bg-machine-blue bg-opacity-10'
    },
    {
      key: 'uptime',
      value: uptime,
      icon: Clock,
      color: 'text-machine-amber',
      bgColor: 'bg-machine-amber bg-opacity-10'
    },
    {
      key: 'efficiency',
      value: `${efficiency}%`,
      icon: Zap,
      color: 'text-machine-red',
      bgColor: 'bg-machine-red bg-opacity-10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map(({ key, value, icon: Icon, color, bgColor }) => (
        <div key={key} className="bg-white rounded-xl p-6 shadow-sm border border-industrial-200">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-industrial-500">{t(key)}</p>
              <p className="text-2xl font-bold text-industrial-800">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
