import { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Factory, Gauge, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MachineState } from '@/hooks/use-machine-state';
import { MachineSelector } from './machine-selector';
import { CardboardBoxVisualization } from './cardboard-box-visualization';
import { MachineControls } from './machine-controls';
import { TimerProgressBar } from './timer-progress-bar';

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
  const [machineNumber, setMachineNumber] = useState(machineId === 1 ? 16 : 51);
  const [cardboardType, setCardboardType] = useState('6/ALU');
  const [capsuleCount, setCapsuleCount] = useState(1500);

  const percentage = Math.min(100, Math.floor((state.itemsInBox / state.limit) * 100));

  const handleSettingsUpdate = () => {
    onUpdateSettings(localLimit, localCycleTime, localName);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
    // Auto-scroll to bottom when opening settings
    if (!showControls) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  return (
    <div className="bg-gradient-to-br from-machine-blue via-machine-green to-machine-amber rounded-2xl shadow-2xl border-4 border-white/20 overflow-hidden transform transition-all hover:scale-102">
      <div className="border-b border-white/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 rounded-full ${
                state.running
                  ? 'bg-white animate-pulse-soft shadow-lg'
                  : 'bg-white/50'
              }`}
            />
            <Factory className="w-6 h-6 text-white" />
            <MachineSelector 
              currentNumber={machineNumber}
              onMachineChange={setMachineNumber}
              machineId={machineId}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={onStart}
              disabled={state.running}
              size="sm"
              className="bg-green-600/80 hover:bg-green-600 text-white border-0 h-8 w-8 p-0"
              data-testid={`start-machine-${machineId}`}
            >
              <Play className="w-4 h-4" />
            </Button>
            <Button
              onClick={onPause}
              disabled={!state.running}
              size="sm"
              className="bg-yellow-600/80 hover:bg-yellow-600 text-white border-0 h-8 w-8 p-0"
              data-testid={`pause-machine-${machineId}`}
            >
              <Pause className="w-4 h-4" />
            </Button>
            <Button
              onClick={onReset}
              size="sm"
              className="bg-red-600/80 hover:bg-red-600 text-white border-0 h-8 w-8 p-0"
              data-testid={`reset-machine-${machineId}`}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              onClick={toggleControls}
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0 h-8 w-8 p-0"
              data-testid={`settings-machine-${machineId}`}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          onBlur={handleSettingsUpdate}
          className="w-full text-lg font-semibold text-white bg-white/20 border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-3 py-2 placeholder-white/70"
          placeholder="Nazwa maszyny..."
        />
      </div>

      <div className="p-4 bg-white/10">
        {/* Progress Visualization */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white flex items-center">
              <Gauge className="w-4 h-4 mr-2" />
              {t('progress')}
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

        {/* Current Box Visualization */}
        <div className="mb-4">
          <CardboardBoxVisualization
            currentProgress={percentage}
            boxSize={'6T' as '5T' | '6T' | '10T'}
            completedBoxes={Math.max(0, state.currentBox - 1)}
          />
        </div>

        {/* Control Panel - Moved higher */}
        {showControls && (
          <div className="bg-white/15 rounded-xl p-4 border-2 border-white/30 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">{t('machine-settings')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor={`limit-${machineId}`} className="text-sm font-medium text-white">
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
                  className="font-mono bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <Label htmlFor={`cycle-${machineId}`} className="text-sm font-medium text-white">
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
                  className="font-mono bg-white/20 border-white/30 text-white placeholder:text-white/60"
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
                className="border-white/30 text-white hover:bg-white/20"
              >
                {t('close')}
              </Button>
            </div>
          </div>
        )}

        {/* Machine Controls */}
        <div className="mb-4">
          <MachineControls
            cardboardType={cardboardType}
            capsuleCount={capsuleCount}
            onCardboardTypeChange={setCardboardType}
            onCapsuleCountChange={setCapsuleCount}
            t={t}
          />
        </div>

        {/* Timer Progress Bar */}
        <div className="mb-4">
          <TimerProgressBar isActive={state.running} />
        </div>
      </div>
    </div>
  );
}
