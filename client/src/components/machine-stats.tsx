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
      value: `🟢 ${activeMachines}`,
      icon: CheckCircle,
      color: 'bg-machine-green',
      bgColor: 'bg-gradient-to-br from-machine-green to-machine-blue'
    },
    {
      key: 'total-boxes',
      value: `📦 ${totalBoxes}`,
      icon: Package,
      color: 'text-machine-blue',
      bgColor: 'bg-gradient-to-br from-machine-blue to-machine-amber'
    },
    {
      key: 'uptime',
      value: `⏰ ${uptime}`,
      icon: Clock,
      color: 'text-machine-amber',
      bgColor: 'bg-gradient-to-br from-machine-amber to-machine-green'
    },
    {
      key: 'efficiency',
      value: `⚡ ${efficiency}%`,
      icon: Zap,
      color: 'text-machine-red',
      bgColor: 'bg-gradient-to-br from-machine-red to-machine-blue'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map(({ key, value, icon: Icon, color, bgColor }) => (
        <div key={key} className={`${bgColor} rounded-2xl p-8 shadow-2xl border-4 border-white/20 transform transition-all hover:scale-105`}>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 rounded-full bg-white/20 mb-4 animate-pulse-soft">
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white/90 mb-2">{t(key)}</p>
              <p className="text-4xl font-bold text-white drop-shadow-lg animate-bounce-subtle">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
