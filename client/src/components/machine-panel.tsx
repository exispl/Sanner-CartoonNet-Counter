import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MachineState } from '@/hooks/use-machine-state';

interface MachinePanelProps {
  machineId: number;
  state: MachineState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onUpdateSettings: (limit: number, cycleTime: number, name?: string) => void;
  t: (key: string) => string;
}

export function MachinePanel({
  machineId,
  state,
  onStart,
  onPause,
  onReset,
  onUpdateSettings,
  t
}: MachinePanelProps) {
  const [showControls, setShowControls] = useState(false);
  const [localLimit, setLocalLimit] = useState(state.limit);
  const [localCycleTime, setLocalCycleTime] = useState(state.cycleTime);
  const [localName, setLocalName] = useState(state.name);

  const percentage = Math.min(100, Math.floor((state.itemsInBox / state.limit) * 100));

  const handleSettingsUpdate = () => {
    onUpdateSettings(localLimit, localCycleTime, localName);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <div className="bg-gradient-to-br from-machine-blue via-machine-green to-machine-amber rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden transform transition-all hover:scale-102">
      <div className="border-b border-white/20 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-6 h-6 rounded-full ${
                state.running
                  ? 'bg-white animate-pulse-soft shadow-lg'
                  : 'bg-white/50'
              }`}
            />
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onBlur={handleSettingsUpdate}
              className="text-2xl font-bold text-white bg-white/20 border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-xl px-4 py-2 placeholder-white/70"
            />
          </div>
          <div className="flex items-center space-x-3 bg-white/20 rounded-xl px-4 py-2">
            <span className="text-3xl">🏭</span>
            <span className="text-lg font-bold text-white">{t('machine')}</span>
            <span className="text-2xl font-mono font-bold text-white">#{machineId}</span>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white/10">
        {/* Progress Visualization */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-white flex items-center">
              📊 {t('progress')} 📊
            </span>
            <span className="text-xl font-mono font-bold text-white bg-white/20 rounded-xl px-4 py-2">
              {state.itemsInBox} / {state.limit}
            </span>
          </div>
          <div className="relative">
            <div className="w-full h-8 bg-white/20 rounded-2xl overflow-hidden border-2 border-white/30">
              <div
                className="h-full bg-gradient-to-r from-white via-money-light to-white transition-all duration-500 ease-out animate-fill-up"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-blue-900 drop-shadow-sm">
                {percentage}% 🎯
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Fill Bar and Machine Visualization */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="text-xs font-medium text-industrial-500 mb-2">{t('fill-level')}</div>
            <div className="relative w-8 h-32 industrial-200 rounded-full overflow-hidden border-2 border-industrial-300">
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-machine-green via-machine-amber to-machine-green transition-all duration-500 ease-out"
                style={{ height: `${percentage}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-white mix-blend-difference transform -rotate-90">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Machine Visualization */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div
                className="w-24 h-40 bg-gradient-to-b from-industrial-400 to-industrial-600 rounded-lg border-2 border-industrial-700 shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                onClick={toggleControls}
              >
                <div className="absolute top-2 left-2 right-2 h-1 bg-machine-green rounded opacity-75" />
                <div className="absolute bottom-2 left-2 right-2 h-1 bg-machine-amber rounded opacity-75" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-24 industrial-200 rounded border border-industrial-400 flex items-center justify-center">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        state.running
                          ? 'bg-machine-green animate-bounce-subtle'
                          : 'bg-industrial-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="text-xs text-center mt-2 text-industrial-500">
                {t('click-to-configure')}
              </div>
            </div>
          </div>
        </div>

        {/* Current Box Info */}
        <div className="bg-white/20 rounded-2xl p-6 mb-8 border-2 border-white/30">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <label className="text-lg font-bold text-white mb-2 block">📦 {t('current-box')} 📦</label>
              <div className="text-4xl font-mono font-bold text-white bg-white/20 rounded-xl p-4 animate-bounce-subtle">{state.currentBox}</div>
            </div>
            <div className="text-center">
              <label className="text-lg font-bold text-white mb-2 block">🔢 {t('items-in-box')} 🔢</label>
              <div className="text-4xl font-mono font-bold text-white bg-white/20 rounded-xl p-4 animate-bounce-subtle">{state.itemsInBox}</div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        {showControls && (
          <div className="border-t border-industrial-200 pt-6">
            <h3 className="text-lg font-semibold text-industrial-800 mb-4">{t('machine-settings')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor={`limit-${machineId}`} className="text-sm font-medium text-industrial-600">
                  {t('target-limit')}
                </Label>
                <Input
                  id={`limit-${machineId}`}
                  type="number"
                  value={localLimit}
                  onChange={(e) => setLocalLimit(Number(e.target.value))}
                  onBlur={handleSettingsUpdate}
                  step={10}
                  min={1}
                  max={10000}
                  className="font-mono"
                />
              </div>
              <div>
                <Label htmlFor={`cycle-${machineId}`} className="text-sm font-medium text-industrial-600">
                  {t('cycle-time')}
                </Label>
                <Input
                  id={`cycle-${machineId}`}
                  type="number"
                  value={localCycleTime}
                  onChange={(e) => setLocalCycleTime(Number(e.target.value))}
                  onBlur={handleSettingsUpdate}
                  step={0.1}
                  min={0.1}
                  max={60}
                  className="font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={onStart}
                disabled={state.running}
                className="bg-machine-green hover:bg-green-600 text-white"
              >
                {t('start')}
              </Button>
              <Button
                onClick={onPause}
                disabled={!state.running}
                className="bg-machine-amber hover:bg-yellow-600 text-white"
              >
                {t('pause')}
              </Button>
              <Button
                onClick={onReset}
                className="bg-machine-red hover:bg-red-600 text-white"
              >
                {t('reset')}
              </Button>
              <Button
                onClick={toggleControls}
                variant="outline"
                className="border-industrial-600 text-industrial-600 hover:bg-industrial-600 hover:text-white"
              >
                {t('close')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
