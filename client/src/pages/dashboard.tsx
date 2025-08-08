import { useState, useEffect } from 'react';
import { useMachineState } from '@/hooks/use-machine-state';
import { useEfficiencyOscillator } from '@/hooks/use-efficiency-oscillator';
import { LanguageSelector } from '@/components/language-selector';
import { MachineStats } from '@/components/machine-stats';
import { MachinePanel } from '@/components/machine-panel';
import { NotificationToast } from '@/components/notification-toast';
import { EarningsCounter } from '@/components/earnings-counter';
import { UserLoginSelector } from '@/components/user-login-selector';
import { EmployeeBonusSystem } from '@/components/employee-bonus-system';
import { SettingsMenu } from '@/components/settings-menu';
import { ProductionDashboard } from '@/components/production-dashboard';
import { CompanyProfits } from '@/components/company-profits';
import { LotteryWheel } from '@/components/lottery-wheel';
import { UserBalance } from '@/components/user-balance';
import { PizzaOrderSystem } from '@/components/pizza-order-system';
import { UserRewardsSystem } from '@/components/user-rewards-system';
import { DailyChallenges } from '@/components/daily-challenges';
import { Leaderboard } from '@/components/leaderboard';
import { GamificationCenter } from '@/components/gamification-center';
import { AuftragDisplay } from '@/components/auftrag-display';
import { FactoryChat } from '@/components/factory-chat';
import { SAPProductionDashboard } from '@/components/sap-production-dashboard';
import { UserRewardsDisplay } from '@/components/user-rewards-display';
import { Button } from '@/components/ui/button';
import { translations, Language } from '@/lib/translations';
import { useAppSettings } from '@/hooks/use-app-settings';

export default function Dashboard() {
  const [currentLang, setCurrentLang] = useState<Language>('pl');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [uptime, setUptime] = useState('00:00:00');
  const [currentUser, setCurrentUser] = useState('SoG1917');
  const [sessionBoxes, setSessionBoxes] = useState(0);
  const [showSAPDashboard, setShowSAPDashboard] = useState(false);
  const { settings } = useAppSettings();
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
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

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', submessage?: string) => {
    if (settings.notificationsEnabled) {
      setToast({ visible: true, message, type, submessage });
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  const activeMachines = [machine1.running, machine2.running].filter(Boolean).length;
  const totalBoxes = machine1.currentBox + machine2.currentBox - 2;

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
    if (!machine1.running) machine1.start();
    if (!machine2.running) machine2.start();
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
      showToast('Kartonowy Napełniacz v3.0 gotowy do pracy! System powiadomień został ulepszony - powiadomienia znikają po 2 sekundach, chyba że klikniesz "Czytaj więcej" aby je zatrzymać i przeczytać całą treść.', 'success');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Expandable Icons Bar */}
      <div className="bg-gray-800/60 backdrop-blur-sm border-b border-green-400/30 p-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6">
          <div className="bg-gray-800/80 rounded-lg px-4 py-2 border border-green-400/40 flex items-center space-x-2">
            <span className="text-2xl">🍕</span>
            <span className="text-sm text-gray-300">Pizza</span>
          </div>
          <div className="bg-gray-800/80 rounded-lg px-4 py-2 border border-green-400/40 flex items-center space-x-2">
            <span className="text-2xl">🎁</span>
            <span className="text-sm text-gray-300">Ciekawostki</span>
          </div>
        </div>
      </div>
      
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
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-4 bg-white/10 rounded-lg px-4 py-2">
                  <span className="text-white/80 text-sm">Zalogowany:</span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <UserLoginSelector 
                    currentUser={currentUser} 
                    onUserChange={setCurrentUser} 
                  />
                </div>
                {/* User Balance directly under user */}
                <UserBalance username={currentUser} />
              </div>
              
              {/* User Rewards in Header */}
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <UserRewardsDisplay username={currentUser} />
              </div>
              

              
              <SettingsMenu 
                currentLang={currentLang} 
                onLanguageChange={handleLanguageChange} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* SAP Dashboard and Session Reset */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setShowSAPDashboard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            data-testid="sap-dashboard-button"
          >
            📊 SAP
          </Button>
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

        {/* Production Dashboard with Real Data */}
        <div className="mb-8">
          <ProductionDashboard t={t} />
        </div>

        {/* Aufträge Display for MA61 */}
        <div className="mb-8">
          <AuftragDisplay machineId="MA61" />
        </div>

        {/* Company Profits, Lottery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CompanyProfits />
          <LotteryWheel />
        </div>

        {/* Interactive User Rewards System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyChallenges 
            totalBoxes={totalBoxes}
            efficiency={oscillatingEfficiency}
            activeMachines={activeMachines}
            onRewardClaimed={(amount, reason) => showToast(`+${amount} EUR za ${reason}`, 'success')}
          />
          <Leaderboard currentUser={currentUser} />
        </div>

        {/* Gamification Center */}
        <div className="mb-8">
          <GamificationCenter 
            username={currentUser}
            totalBoxes={totalBoxes}
            efficiency={oscillatingEfficiency}
            activeMachines={activeMachines}
            uptime={uptime}
          />
        </div>

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
            state={machine1}
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
            onUpdateItemsInBox={machine1.updateItemsInBox}
            t={t}
          />

          <MachinePanel
            machineId={2}
            state={machine2}
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
            onUpdateItemsInBox={machine2.updateItemsInBox}
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

      {toast.visible && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={2000}
        />
      )}

      {/* Factory Chat - Fixed at bottom right */}
      <FactoryChat 
        currentUser={currentUser}
        onUserChange={setCurrentUser}
      />

      {/* SAP Production Dashboard Modal */}
      <SAPProductionDashboard 
        isVisible={showSAPDashboard}
        onClose={() => setShowSAPDashboard(false)}
      />
    </div>
  );
}
