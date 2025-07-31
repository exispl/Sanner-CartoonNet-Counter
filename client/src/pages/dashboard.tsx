import { useState, useEffect } from 'react';
import { useMachineState } from '@/hooks/use-machine-state';
import { LanguageSelector } from '@/components/language-selector';
import { MachineStats } from '@/components/machine-stats';
import { MachinePanel } from '@/components/machine-panel';
import { NotificationToast, ToastType } from '@/components/notification-toast';
import { Button } from '@/components/ui/button';
import { translations, Language } from '@/lib/translations';

export default function Dashboard() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [uptime, setUptime] = useState('00:00:00');
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

  const t = (key: string) => translations[currentLang][key as keyof typeof translations[typeof currentLang]] || key;

  const showToast = (message: string, type: ToastType = 'info', submessage?: string) => {
    setToast({ visible: true, message, type, submessage });
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

  const startAllMachines = () => {
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

  const exportSettings = () => {
    const settings = {
      machines: {
        1: {
          name: machine1.state.name,
          limit: machine1.state.limit,
          cycleTime: machine1.state.cycleTime
        },
        2: {
          name: machine2.state.name,
          limit: machine2.state.limit,
          cycleTime: machine2.state.cycleTime
        }
      },
      language: currentLang
    };

    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'kartonowy-napelniacz-settings.json';
    link.click();
    URL.revokeObjectURL(url);

    showToast(t('export'), 'success');
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
    <div className="min-h-screen bg-industrial-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-industrial-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-machine-green rounded-lg flex items-center justify-center text-white text-xl font-bold">
                📦
              </div>
              <div>
                <h1 className="text-xl font-bold text-industrial-800">{t('title')}</h1>
                <p className="text-sm text-industrial-500">v3.0 - SaaS Edition</p>
              </div>
            </div>

            <LanguageSelector 
              currentLang={currentLang} 
              onLanguageChange={handleLanguageChange} 
            />
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <MachineStats
          activeMachines={activeMachines}
          totalBoxes={Math.max(0, totalBoxes)}
          uptime={uptime}
          efficiency={100}
          t={t}
        />

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

        {/* Global Controls */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-industrial-200 p-6">
          <h3 className="text-lg font-semibold text-industrial-800 mb-4">{t('global-controls')}</h3>
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={startAllMachines}
              className="bg-machine-green hover:bg-green-600 text-white"
            >
              {t('start-all')}
            </Button>
            <Button
              onClick={pauseAllMachines}
              className="bg-machine-amber hover:bg-yellow-600 text-white"
            >
              {t('pause-all')}
            </Button>
            <Button
              onClick={resetAllMachines}
              className="bg-machine-red hover:bg-red-600 text-white"
            >
              {t('reset-all')}
            </Button>
            <Button
              onClick={exportSettings}
              className="bg-industrial-600 hover:bg-industrial-700 text-white"
            >
              {t('export')}
            </Button>
          </div>
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
