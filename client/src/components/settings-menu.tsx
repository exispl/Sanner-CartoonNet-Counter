import { useState } from 'react';
import { Settings, Info, X, Palette, Volume2, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { translations, Language } from '@/lib/translations';

interface SettingsMenuProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function SettingsMenu({ currentLang, onLanguageChange }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'about'>('settings');

  const t = (key: string) => translations[currentLang][key as keyof typeof translations[typeof currentLang]] || key;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang);
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        data-testid="settings-menu-button"
      >
        <Settings className="w-6 h-6 text-industrial-600" />
      </button>

      {/* Expanded Menu */}
      {isOpen && (
        <div className="absolute top-0 right-0 w-96 bg-white rounded-2xl shadow-2xl border-4 border-machine-blue/20 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-machine-blue to-machine-green p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Menu</h3>
              </div>
              <button
                onClick={toggleMenu}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                data-testid="close-settings-menu"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex mt-4 space-x-2">
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-white text-machine-blue'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                data-testid="settings-tab"
              >
                ⚙️ Settings
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'about'
                    ? 'bg-white text-machine-blue'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                data-testid="about-tab"
              >
                ℹ️ About Us
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Language Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-machine-blue" />
                    <Label className="text-lg font-semibold text-industrial-800">Język / Language</Label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { code: 'pl' as Language, flag: '🇵🇱', label: 'Polski' },
                      { code: 'en' as Language, flag: '🇺🇸', label: 'English' },
                      { code: 'de' as Language, flag: '🇩🇪', label: 'Deutsch' }
                    ].map(({ code, flag, label }) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageSelect(code)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          currentLang === code
                            ? 'border-machine-blue bg-machine-blue/10 text-machine-blue'
                            : 'border-industrial-200 hover:border-machine-blue/50'
                        }`}
                        data-testid={`language-${code}`}
                      >
                        <div className="text-2xl mb-1">{flag}</div>
                        <div className="text-sm font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Palette className="w-5 h-5 text-machine-green" />
                    <Label className="text-lg font-semibold text-industrial-800">Motyw / Theme</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border-2 border-machine-blue bg-machine-blue/10 text-center">
                      <div className="text-xl mb-1">🌊</div>
                      <div className="text-sm font-medium text-machine-blue">Blue Ocean</div>
                      <div className="text-xs text-machine-blue/70">Aktywny</div>
                    </div>
                    <div className="p-3 rounded-lg border-2 border-industrial-200 text-center opacity-50">
                      <div className="text-xl mb-1">🌙</div>
                      <div className="text-sm font-medium">Dark Mode</div>
                      <div className="text-xs text-industrial-500">Wkrótce</div>
                    </div>
                  </div>
                </div>

                {/* Sound Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5 text-machine-amber" />
                    <Label className="text-lg font-semibold text-industrial-800">Dźwięki / Sounds</Label>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Powiadomienia</span>
                      <div className="w-12 h-6 bg-machine-green rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Efekty dźwiękowe</span>
                      <div className="w-12 h-6 bg-industrial-300 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Settings */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-machine-red" />
                    <Label className="text-lg font-semibold text-industrial-800">Dane / Data</Label>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-machine-amber hover:bg-machine-amber/80 text-white">
                      📊 Eksportuj historię
                    </Button>
                    <Button className="w-full bg-machine-red hover:bg-machine-red/80 text-white">
                      🗑️ Wyczyść dane
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-machine-blue to-machine-green rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🏭
                  </div>
                  <h3 className="text-2xl font-bold text-industrial-800 mb-2">Sanner CartoonCounter</h3>
                  <p className="text-lg text-machine-blue font-semibold">v1.0.1</p>
                </div>

                <div className="bg-industrial-50 rounded-xl p-4">
                  <h4 className="font-bold text-industrial-800 mb-3 flex items-center">
                    👥 O nas
                  </h4>
                  <p className="text-sm text-industrial-600 leading-relaxed">
                    Jesteśmy 3-osobowym zespołem studentów z Berkeley, który założył tę firmę w 2024 roku. 
                    Specjalizujemy się w tworzeniu nowoczesnych rozwiązań dla przemysłu pakowania.
                  </p>
                </div>

                <div className="bg-industrial-50 rounded-xl p-4">
                  <h4 className="font-bold text-industrial-800 mb-3 flex items-center">
                    🎯 Dla Sanner GmbH
                  </h4>
                  <p className="text-sm text-industrial-600 leading-relaxed">
                    Aplikacja została stworzona specjalnie dla Sanner GmbH jako część programu 
                    modernizacji procesów produkcyjnych. Pozwala na real-time monitoring 
                    maszyn pakujących kartony.
                  </p>
                </div>

                <div className="bg-industrial-50 rounded-xl p-4">
                  <h4 className="font-bold text-industrial-800 mb-3 flex items-center">
                    🚀 Technologie
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-machine-blue text-white rounded-full text-xs">React</span>
                    <span className="px-3 py-1 bg-machine-green text-white rounded-full text-xs">TypeScript</span>
                    <span className="px-3 py-1 bg-machine-amber text-white rounded-full text-xs">PostgreSQL</span>
                    <span className="px-3 py-1 bg-machine-red text-white rounded-full text-xs">Express.js</span>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-industrial-200">
                  <p className="text-xs text-industrial-500">
                    © 2024 Berkeley Solutions for Sanner GmbH
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}