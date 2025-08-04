import { useState, useEffect } from 'react';
import { useMachineState } from '@/hooks/use-machine-state';
import { useEfficiencyOscillator } from '@/hooks/use-efficiency-oscillator';
import { LanguageSelector } from '@/components/language-selector';
import { MachineStats } from '@/components/machine-stats';
import { MachinePanel } from '@/components/machine-panel';
import { NotificationToast, ToastType } from '@/components/notification-toast';
import { EarningsCounter } from '@/components/earnings-counter';
import { UserLoginSelector } from '@/components/user-login-selector';
import { EmployeeBonusSystem } from '@/components/employee-bonus-system';
import { SettingsMenu } from '@/components/settings-menu';
import { Button } from '@/components/ui/button';
import { translations, Language } from '@/lib/translations';
import { useAppSettings } from '@/hooks/use-app-settings';

export default function Dashboard() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [uptime, setUptime] = useState('00:00:00');
  const [currentUser, setCurrentUser] = useState('SoG1917');
  const [sessionBoxes, setSessionBoxes] = useState(0);
  const { settings } = useAppSettings();
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: ToastType;
    submessage?: string;
  }>({
    visible: false,
    message: '',
    type: 'info'
  });

  const machine1 = useMachineState(1, 'MA820051', 1000, 4);
  const machine2 = useMachineState(2, 'MA820054', 1500, 5);
  const oscillatingEfficiency = useEfficiencyOscillator();

  const t = (key: string) => translations[currentLang][key as keyof typeof translations[typeof currentLang]] || key;

  const showToast = (message: string, type: ToastType = 'info', submessage?: string) => {
    if (settings.notificationsEnabled) {
      setToast({ visible: true, message, type, submessage });
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const activeMachines = [machine1.state.running, machine2.state.running].filter(Boolean).length;
  const totalBoxes = machine1.state.currentBox + machine2.state.currentBox - 2;

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const resetSession = () => {
    machine1.reset();
    machine2.reset();
    setSessionBoxes(0);
    setStartTime(new Date());
    showToast(t('session-reset'), 'info');
  };

  const startAllMachines = () => {
    if (!startTime) {
      setStartTime(new Date());
    }
    if (!machine1.state.running) machine1.start();
    if (!machine2.state.running) machine2.start();
    showToast(t('start-all'), 'success');
  };

  const pauseAllMachines = () => {
    machine1.pause();
    machine2.pause();
    showToast(t('pause-all'), 'warning');
  };

  const resetAllMachines = () => {
    machine1.reset();
    machine2.reset();
    setStartTime(null);
    showToast(t('reset-all'), 'info');
  };



  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language;
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang);
    }
  }, []);

  // Track uptime
  useEffect(() => {
    if (activeMachines > 0 && !startTime) {
      setStartTime(new Date());
    } else if (activeMachines === 0 && startTime) {
      setStartTime(null);
      setUptime('00:00:00');
    }
  }, [activeMachines, startTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        setUptime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [startTime]);

  // Show welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      showToast('Kartonowy Napełniacz v3.0 gotowy do pracy!', 'success');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header - Enhanced with gradient and bigger emojis */}
      <header className="bg-gradient-to-r from-machine-blue via-machine-green to-machine-amber shadow-2xl border-b-4 border-machine-blue">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-5xl animate-bounce-subtle">
                📦
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">{t('title')}</h1>
                <p className="text-lg text-white/80 font-semibold">Sanner CartoonCounter v1.0.1 ({totalBoxes} kartonów)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <UserLoginSelector 
                currentUser={currentUser} 
                onUserChange={setCurrentUser} 
              />
              <div className="bg-white/20 rounded-xl p-2">
                <LanguageSelector 
                  currentLang={currentLang} 
                  onLanguageChange={handleLanguageChange} 
                />
              </div>
              <SettingsMenu 
                currentLang={currentLang} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Session Reset Button */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Button
            onClick={resetSession}
            className="bg-white/20 hover:bg-white/30 text-industrial-800 dark:text-white border-2 border-white/30 rounded-xl px-6 py-2 text-sm font-medium backdrop-blur-sm transition-all"
            data-testid="session-reset-button"
          >
            {t('session-reset')}
          </Button>
        </div>
      </div>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <MachineStats
          activeMachines={activeMachines}
          totalBoxes={Math.max(0, totalBoxes)}
          uptime={uptime}
          efficiency={oscillatingEfficiency}
          t={t}
        />

        {/* Statistics Cards - Hidden by default */}
        <div className="mb-8 hidden">
          <EmployeeBonusSystem 
            currentUser={currentUser}
            totalBoxes={totalBoxes}
            isRunning={activeMachines > 0} 
          />
        </div>

        {/* Machine Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MachinePanel
            machineId={1}
            state={machine1.state}
            onStart={() => {
              machine1.start();
              showToast(`${t('machine')} #1 ${t('start').toLowerCase()}`, 'success');
            }}
            onPause={() => {
              machine1.pause();
              showToast(`${t('machine')} #1 ${t('pause').toLowerCase()}`, 'warning');
            }}
            onReset={() => {
              machine1.reset();
              showToast(`${t('machine')} #1 ${t('reset').toLowerCase()}`, 'info');
            }}
            onUpdateSettings={machine1.updateSettings}
            t={t}
          />

          <MachinePanel
            machineId={2}
            state={machine2.state}
            onStart={() => {
              machine2.start();
              showToast(`${t('machine')} #2 ${t('start').toLowerCase()}`, 'success');
            }}
            onPause={() => {
              machine2.pause();
              showToast(`${t('machine')} #2 ${t('pause').toLowerCase()}`, 'warning');
            }}
            onReset={() => {
              machine2.reset();
              showToast(`${t('machine')} #2 ${t('reset').toLowerCase()}`, 'info');
            }}
            onUpdateSettings={machine2.updateSettings}
            t={t}
          />
        </div>

        {/* Global Controls - Clean without emojis */}
        <div className="mt-8 bg-gradient-to-r from-machine-blue to-machine-green rounded-2xl shadow-2xl border-4 border-machine-blue p-6">
          <h3 className="text-lg font-bold text-white mb-4 text-center">
            {t('global-controls')}
          </h3>
          <div className="space-y-3">
            {/* Machine Controls - Clean without emojis */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={startAllMachines}
                className="bg-green-600/90 hover:bg-green-600 text-white border-2 border-green-400 shadow-lg px-6 py-3 text-sm font-bold rounded-lg backdrop-blur-sm transition-all transform hover:scale-105"
                data-testid="start-all-machines"
              >
                {t('start-all')}
              </Button>
              <Button
                onClick={pauseAllMachines}
                className="bg-yellow-600/90 hover:bg-yellow-600 text-white border-2 border-yellow-400 shadow-lg px-6 py-3 text-sm font-bold rounded-lg backdrop-blur-sm transition-all transform hover:scale-105"
                data-testid="pause-all-machines"
              >
                {t('pause-all')}
              </Button>
              <Button
                onClick={resetAllMachines}
                className="bg-red-600/90 hover:bg-red-600 text-white border-2 border-red-400 shadow-lg px-6 py-3 text-sm font-bold rounded-lg backdrop-blur-sm transition-all transform hover:scale-105"
                data-testid="reset-all-machines"
              >
                {t('reset-all')}
              </Button>
              <Button
                onClick={resetSession}
                className="bg-blue-600/90 hover:bg-blue-600 text-white border-2 border-blue-400 shadow-lg px-6 py-3 text-sm font-bold rounded-lg backdrop-blur-sm transition-all transform hover:scale-105"
                data-testid="reset-session"
              >
                {t('session-reset')}
              </Button>
            </div>
          </div>
        </div>

        {/* Earnings Counter */}
        <div className="mt-8">
          <EarningsCounter 
            isRunning={activeMachines > 0} 
            totalBoxes={Math.max(0, totalBoxes)} 
          />
        </div>
      </main>

      <NotificationToast
        message={toast.message}
        type={toast.type}
        submessage={toast.submessage}
        visible={toast.visible}
        onHide={hideToast}
      />
    </div>
  );
}
