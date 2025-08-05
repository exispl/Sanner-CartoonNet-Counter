import { useState, useEffect } from 'react';
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
  const [machineNumber, setMachineNumber] = useState(machineId === 1 ? 62 : 61);
  const [cardboardType, setCardboardType] = useState('6 ALU');
  const [capsuleCount, setCapsuleCount] = useState(1500);
  const [prufungTime, setPrufungTime] = useState<'1H' | '2H' | '3H'>('1H');
  const [auftragNumber, setAuftragNumber] = useState('10-1X-XX-XX [H5]');
  const [prufungStartTime, setPrufungStartTime] = useState<Date | null>(null);
  const [prufungExpired, setPrufungExpired] = useState(false);
  const [showMachineIcon, setShowMachineIcon] = useState(false);

  const percentage = Math.min(100, Math.floor((state.itemsInBox / state.limit) * 100));

  const handleSettingsUpdate = () => {
    onUpdateSettings(localLimit, localCycleTime, localName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSettingsUpdate();
    }
  };

  const startPrufung = () => {
    setPrufungStartTime(new Date());
    setPrufungExpired(false);
  };

  const resetPrufung = () => {
    setPrufungStartTime(null);
    setPrufungExpired(false);
  };

  // Auto-start Prüfung on component mount
  useEffect(() => {
    if (!prufungStartTime) {
      startPrufung();
    }
  }, [prufungStartTime]);

  // Calculate Prüfung progress
  const getPrufungProgress = () => {
    if (!prufungStartTime) return 0;
    const now = new Date();
    const elapsed = now.getTime() - prufungStartTime.getTime();
    const totalTime = prufungTime === '1H' ? 3600000 : prufungTime === '2H' ? 7200000 : 10800000; // 1H, 2H, 3H in ms
    const progress = Math.min(100, (elapsed / totalTime) * 100);
    
    if (progress >= 100 && !prufungExpired) {
      setPrufungExpired(true);
    }
    
    return progress;
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
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              onBlur={handleSettingsUpdate}
              onKeyPress={handleKeyPress}
              className="w-full text-lg font-bold text-white bg-white/20 border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg px-3 py-2 placeholder-white/70"
              placeholder="Nazwa maszyny..."
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Nr Auftrag</span>
              <input
                type="text"
                value={auftragNumber}
                onChange={(e) => setAuftragNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-32"
                placeholder="MA820062"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Halle</span>
              <input
                type="text"
                defaultValue="5"
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-16"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">DASG-1 (color)</span>
              <input
                type="text"
                placeholder="DASG-1"
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-24"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white/10">
        {/* Progress Visualization */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white flex items-center">
              <Gauge className="w-3 h-3 mr-1" />
              {t('progress')}
            </span>
            <span className="text-lg font-mono font-bold text-white bg-white/20 rounded-xl px-3 py-1">
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
              <span className="text-sm font-bold text-blue-900 drop-shadow-sm">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Fill Bar and Machine Visualization */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="text-xs font-medium text-industrial-500 mb-2">Prüfung</div>
            <div className="w-[80%] mx-auto space-y-2">
              {/* Progress bar */}
              <div 
                className={`rounded-full h-4 overflow-hidden border border-white/30 cursor-pointer ${
                  prufungExpired ? 'bg-red-500' : 'bg-white/20'
                }`}
                onClick={prufungExpired ? resetPrufung : startPrufung}
              >
                {prufungExpired ? (
                  <div className="h-full bg-red-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Prüfung</span>
                  </div>
                ) : (
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-red-500 transition-all duration-1000"
                    style={{ width: `${getPrufungProgress()}%` }}
                  />
                )}
              </div>
              {/* Time selector */}
              <div className="flex justify-center space-x-1">
                {['1H', '2H', '3H'].map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setPrufungTime(time as '1H' | '2H' | '3H');
                      if (prufungStartTime) startPrufung(); // Restart if already running
                    }}
                    className={`px-2 py-1 text-xs rounded ${
                      prufungTime === time 
                        ? 'bg-machine-blue text-white' 
                        : 'bg-white/60 text-industrial-600 hover:bg-white/80'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Machine Visualization - Minimized */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <button
                onClick={() => setShowMachineIcon(!showMachineIcon)}
                className={`w-12 h-12 rounded-lg border-2 shadow-lg cursor-pointer transform transition-all hover:scale-105 ${
                  state.running
                    ? 'bg-machine-green border-machine-green animate-pulse'
                    : 'bg-industrial-400 border-industrial-600'
                }`}
              >
                <Factory className="w-6 h-6 text-white mx-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Current Box Visualization */}
        <div className="mb-4">
          <CardboardBoxVisualization
            currentProgress={percentage}
            boxSize={machineNumber === 59 ? '10T' : (machineNumber === 61 ? '6' : '6') as '5T' | '6T' | '10T'}
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

        {/* Machine Settings - Always visible under the machine */}
        <div className="mt-4 p-3 bg-white/20 rounded-lg border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <Label className="text-xs font-semibold text-white mb-1 block">
                Ilość kapsli
              </Label>
              <Input
                type="number"
                value={localLimit}
                onChange={(e) => setLocalLimit(Number(e.target.value))}
                onBlur={handleSettingsUpdate}
                onKeyPress={handleKeyPress}
                className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-8 text-xs"
                min="1"
                max="10000"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-white mb-1 block">
                Szacowany czas 1 kartonu (minuty)
              </Label>
              <Input
                type="number"
                value={localCycleTime}
                onChange={(e) => setLocalCycleTime(Number(e.target.value))}
                onBlur={handleSettingsUpdate}
                onKeyPress={handleKeyPress}
                className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-8 text-xs"
                min="1"
                max="60"
                step="0.1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-white mb-1 block">
                Typ kartonu
              </Label>
              <select
                value={cardboardType}
                onChange={(e) => {
                  setCardboardType(e.target.value);
                  // Reset machine and start new cycle when cardboard type changes
                  onReset();
                  startPrufung();
                }}
                className="w-full bg-white/80 border border-industrial-300 text-industrial-800 focus:border-machine-blue h-8 text-xs rounded"
              >
                <option value="5 ALU">5 ALU</option>
                <option value="6 ALU">6 ALU</option>
                <option value="5 PE">5 PE</option>
                <option value="6 PE">6 PE</option>
                <option value="10T">10T</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
