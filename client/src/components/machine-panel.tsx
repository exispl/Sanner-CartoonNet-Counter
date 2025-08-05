import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings, Factory, Gauge, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [localCycleTime, setLocalCycleTime] = useState(1537); // Default 1537 seconds
  const [localName, setLocalName] = useState(state.name);
  const [machineNumber, setMachineNumber] = useState(machineId === 1 ? 62 : 61);
  const [cardboardType, setCardboardType] = useState('6 ALU');
  const [capsuleCount, setCapsuleCount] = useState(1500);
  const [prufungTime, setPrufungTime] = useState<'1Min' | '1H' | '2H' | '3H'>('1Min');
  const [auftragNumber, setAuftragNumber] = useState('MA61');
  const [prufungStartTime, setPrufungStartTime] = useState<Date | null>(null);
  const [prufungExpired, setPrufungExpired] = useState(false);
  const [showMachineIcon, setShowMachineIcon] = useState(false);
  const [nrAuftrag, setNrAuftrag] = useState('210044');
  const [dasgColor, setDasgColor] = useState('white');
  const [showHalleMap, setShowHalleMap] = useState(false);
  const [bestellungText, setBestellungText] = useState('');
  const [bestellungHistory, setBestellungHistory] = useState<string[]>([]);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetPassword, setResetPassword] = useState('');

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
    const totalTime = prufungTime === '1Min' ? 60000 : prufungTime === '1H' ? 3600000 : prufungTime === '2H' ? 7200000 : 10800000; // 1Min, 1H, 2H, 3H in ms
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
            {/* Machine Status with colored rectangle */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded text-white text-sm font-medium ${
              state.running 
                ? 'bg-green-600' 
                : state.itemsInBox > 0 
                ? 'bg-cyan-600' 
                : 'bg-gray-600'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                state.running ? 'bg-green-400' : state.itemsInBox > 0 ? 'bg-cyan-400' : 'bg-gray-400'
              }`} />
              <input
                type="text"
                value={`MA${machineNumber}`}
                onChange={(e) => {
                  const value = e.target.value.replace('MA', '');
                  if (!isNaN(Number(value))) {
                    setMachineNumber(Number(value));
                  }
                }}
                className="bg-transparent border-none text-white font-medium text-sm w-20 focus:outline-none focus:bg-white/10 rounded px-1"
              />
              <span>
                - {
                  state.running 
                    ? 'PRODUKTION' 
                    : state.itemsInBox > 0 
                    ? 'SETUP' 
                    : 'WARTEN'
                }
              </span>

            </div>
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
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Nr Auftrag</span>
              <select
                value={auftragNumber}
                onChange={(e) => setAuftragNumber(e.target.value)}
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-24"
              >
                <option value="MA61">MA61</option>
                <option value="MA62">MA62</option>
              </select>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Halle</span>
              <input
                type="text"
                defaultValue="5"
                className="text-base font-bold text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-1 py-1 w-8 text-center"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">Material</span>
              <input
                type="text"
                defaultValue="210044"
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-20"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 mb-1">DASG-1</span>
              <select
                className="text-sm font-medium text-white bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 rounded px-2 py-1 w-24"
              >
                <option value="white">white</option>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="red">red</option>
                <option value="green">green</option>
                <option value="yellow">yellow</option>
                <option value="gray">gray</option>
              </select>
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
                className="rounded-full h-8 overflow-hidden cursor-pointer bg-green-400 relative"
                style={{ width: '450px' }}
                onClick={prufungExpired ? resetPrufung : startPrufung}
              >
                {prufungExpired ? (
                  <div className="h-full bg-red-600 border-2 border-orange-500 flex items-center justify-center animate-blink-red-white">
                    <span className="text-sm font-bold text-white">Prüfung</span>
                  </div>
                ) : (
                  <>
                    <div 
                      className="h-full bg-red-500 transition-all duration-1000"
                      style={{ width: `${getPrufungProgress()}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">Prüfung</span>
                    </div>
                  </>
                )}
              </div>
              {/* Time selector */}
              <div className="flex justify-center space-x-1">
                {['1Min', '1H', '2H', '3H'].map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setPrufungTime(time as '1Min' | '1H' | '2H' | '3H');
                      if (prufungStartTime) startPrufung(); // Restart if already running
                    }}
                    className={`px-1 py-1 text-xs rounded ${
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

        {/* Auftrag Section with integrated settings */}
        <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Left column - Auftrag fields */}
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold text-white mb-1 block">
                  MA Auswahl
                </Label>
                <Select value={`MA${machineNumber}`} onValueChange={(value) => setMachineNumber(parseInt(value.replace('MA', '')))}>
                  <SelectTrigger className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MA61">MA61</SelectItem>
                    <SelectItem value="MA62">MA62</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-semibold text-white mb-1 block">
                  Nr Auftrag
                </Label>
                <Input
                  type="text"
                  value={nrAuftrag}
                  onChange={(e) => setNrAuftrag(e.target.value)}
                  className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm"
                  placeholder="210044"
                />
              </div>
              <div>
                <button
                  onClick={() => setShowHalleMap(!showHalleMap)}
                  className="w-full bg-white/80 border border-industrial-300 text-industrial-800 hover:bg-white/90 h-10 text-sm rounded-md px-3 py-2 flex items-center justify-center"
                >
                  Halle 5 {showHalleMap ? '🗺️' : '📍'}
                </button>
                {showHalleMap && (
                  <div className="mt-2 p-3 bg-white/90 rounded-lg border">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-800">H5</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right column - Settings */}
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-semibold text-white mb-1 block">
                  Szacowany czas 1 (Min.)
                </Label>
                <Input
                  type="number"
                  value={Math.round(localCycleTime / 60)}
                  onChange={(e) => setLocalCycleTime(Number(e.target.value) * 60)}
                  onBlur={handleSettingsUpdate}
                  onKeyPress={handleKeyPress}
                  className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm"
                  min="1"
                  max="50"
                  step="1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-white mb-1 block">
                  Ilość kapsli
                </Label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="900"
                    max="10000"
                    step="100"
                    value={localLimit}
                    onChange={(e) => setLocalLimit(Number(e.target.value))}
                    onMouseUp={handleSettingsUpdate}
                    className="w-full accent-machine-blue"
                    list="capsule-marks"
                  />
                  <datalist id="capsule-marks">
                    <option value="900">900</option>
                    <option value="1000">1000</option>
                    <option value="1200">1200</option>  
                    <option value="1500">1500</option>
                    <option value="3000">3000</option>
                    <option value="10000">10000</option>
                  </datalist>
                  <div className="text-xs text-white/70 text-center">{localLimit} kapsli</div>
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-white mb-1 block">
                  Model
                </Label>
                <Select value={dasgColor} onValueChange={setDasgColor}>
                  <SelectTrigger className="bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white" className="text-gray-800 bg-white">White</SelectItem>
                    <SelectItem value="blue" className="text-blue-600 bg-blue-100">Blue</SelectItem>
                    <SelectItem value="red" className="text-red-600 bg-red-100">Red</SelectItem>
                    <SelectItem value="green" className="text-green-600 bg-green-100">Green</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Typ kartonu */}
          <div className="mt-4">
            <Label className="text-xs font-semibold text-white mb-1 block">
              Typ kartonu
            </Label>
            <select
              value={cardboardType}
              onChange={(e) => {
                setCardboardType(e.target.value);
                onReset();
              }}
              className="w-full bg-white/80 border border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm rounded"
            >
              <option value="5 ALU">5 ALU</option>
              <option value="6 ALU">6 ALU</option>
              <option value="5 PE">5 PE</option>
              <option value="6 PE">6 PE</option>
              <option value="10T">10T</option>
            </select>
          </div>
        </div>

        {/* Bestellung Section */}
        <div className="mt-4 p-3 bg-white/20 rounded-lg border border-white/30">
          <h3 className="text-sm font-semibold text-white mb-2">Bestellung:</h3>
          <div className="flex gap-2">
            <Input
              type="text"
              value={bestellungText}
              onChange={(e) => setBestellungText(e.target.value)}
              placeholder="H5 | material"
              className="flex-1 bg-white/80 border-industrial-300 text-industrial-800 focus:border-machine-blue h-10 text-sm placeholder:text-gray-400"
            />
            <Button
              onClick={() => {
                if (bestellungText.trim()) {
                  setBestellungHistory(prev => [bestellungText, ...prev.slice(0, 4)]);
                  setBestellungText('');
                }
              }}
              className="bg-machine-blue hover:bg-blue-600 text-white"
            >
              Bestellen
            </Button>
          </div>
          {bestellungHistory.length > 0 && (
            <div className="mt-2">
              <select className="w-full bg-white/80 border border-industrial-300 text-industrial-800 h-8 text-xs rounded">
                <option>Letzte Bestellungen:</option>
                {bestellungHistory.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Company Stats */}
        <div className="mt-4 p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-300/30">
          <h3 className="text-sm font-semibold text-purple-200 mb-2">Ciekawostki</h3>
          <div className="text-xs text-purple-100">
            Zyski firmy: {(Math.random() * 50000 + 25000).toLocaleString('de-DE')} EUR
          </div>
        </div>

        {/* Pizza Ordering */}
        <div className="mt-4 p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-300/30">
          <h3 className="text-sm font-semibold text-orange-200 mb-2">Heute Pizza Bestellung</h3>
          <div className="text-xs text-orange-100 mb-2">Cena: 6 EUR - Kommt 17 / 18</div>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              placeholder="Ihr Name"
              className="flex-1 bg-white/80 border-orange-300 text-orange-800 focus:border-orange-400 h-8 text-xs"
            />
            <label className="flex items-center text-xs text-orange-100">
              <input type="checkbox" className="mr-1" />
              Bezahlt
            </label>
          </div>
        </div>

        {/* Reset Session with Password */}
        <div className="mt-4">
          <Button
            onClick={() => setShowResetDialog(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Reset sesji
          </Button>
          
          {showResetDialog && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg border shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Potwierdź reset sesji</h3>
                <Input
                  type="password"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  placeholder="Wprowadź hasło"
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      if (resetPassword === 'admin') {
                        onReset();
                        setShowResetDialog(false);
                        setResetPassword('');
                      }
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Akceptuj
                  </Button>
                  <Button
                    onClick={() => {
                      setShowResetDialog(false);
                      setResetPassword('');
                    }}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    ✕
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
