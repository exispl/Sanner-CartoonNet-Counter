import { useState } from 'react';
import { Settings, Info, X, Palette, Volume2, Globe, Database, Moon, Sun, Bell, BellOff, Zap, ZapOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { translations, Language } from '@/lib/translations';
import { useAppSettings } from '@/hooks/use-app-settings';

// Import flag images  
import plFlag from '@/assets/flags/pl.svg';
import usFlag from '@/assets/flags/us.svg';
import deFlag from '@/assets/flags/de.svg';
import trFlag from '@/assets/flags/tr.svg';

interface SettingsMenuProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function SettingsMenu({ currentLang, onLanguageChange }: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSettings, resetSettings } = useAppSettings();

  const t = (key: string) => translations[currentLang][key as keyof typeof translations[typeof currentLang]] || key;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Auto-scroll to bottom when opening menu
    if (!isOpen) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

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
        <div className="absolute top-0 right-0 w-80 bg-white/95 dark:bg-industrial-800/95 rounded-2xl shadow-2xl border-4 border-machine-blue/40 z-50 overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="bg-gradient-to-r from-machine-blue to-machine-green p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Ustawienia</h3>
              </div>
              <button
                onClick={toggleMenu}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                data-testid="close-settings-menu"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-machine-blue/30 scrollbar-track-transparent">
            <div className="space-y-4">
              {/* Language Settings */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-machine-blue" />
                  <Label className="text-sm font-semibold text-industrial-800">Język</Label>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { code: 'pl' as Language, flagSrc: plFlag, label: 'Polski' },
                    { code: 'en' as Language, flagSrc: usFlag, label: 'English' },
                    { code: 'de' as Language, flagSrc: deFlag, label: 'Deutsch' },
                    { code: 'tr' as Language, flagSrc: trFlag, label: 'Türkçe' },
                    { code: 'ar' as Language, flag: '🇸🇦', label: 'العربية' },
                    { code: 'fr' as Language, flag: '🇫🇷', label: 'Français' },
                    { code: 'it' as Language, flag: '🇮🇹', label: 'Italiano' },
                    { code: 'hr' as Language, flag: '🇭🇷', label: 'Hrvatski' }
                  ].map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageSelect(option.code)}
                      title={option.label}
                      className={`p-2 rounded border transition-all text-center ${
                        currentLang === option.code
                          ? 'border-machine-blue bg-machine-blue/10'
                          : 'border-industrial-200 hover:border-machine-blue/50'
                      }`}
                      data-testid={`language-${option.code}`}
                    >
                      {option.flagSrc ? (
                        <img 
                          src={option.flagSrc} 
                          alt={option.label}
                          className="w-6 h-4 mx-auto object-cover rounded-sm"
                          style={{ display: 'block' }}
                        />
                      ) : (
                        <span className="text-sm block text-center">{option.flag}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-machine-green" />
                  <Label className="text-sm font-semibold text-industrial-800 dark:text-white">Motyw</Label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSettings({ isDarkMode: false })}
                    className={`p-2 rounded border transition-all text-center text-xs ${
                      !settings.isDarkMode
                        ? 'border-machine-blue bg-machine-blue/10 text-machine-blue'
                        : 'border-industrial-200 hover:border-machine-blue/50'
                    }`}
                    data-testid="theme-light"
                  >
                    <Sun className="w-4 h-4 mx-auto mb-1" />
                    <div>Jasny</div>
                  </button>
                  <button
                    onClick={() => updateSettings({ isDarkMode: true })}
                    className={`p-2 rounded border transition-all text-center text-xs ${
                      settings.isDarkMode
                        ? 'border-machine-blue bg-machine-blue/10 text-machine-blue'
                        : 'border-industrial-200 hover:border-machine-blue/50'
                    }`}
                    data-testid="theme-dark"
                  >
                    <Moon className="w-4 h-4 mx-auto mb-1" />
                    <div>Ciemny</div>
                  </button>
                </div>
              </div>

              {/* Reset Settings */}
              <div className="space-y-2">
                <Button 
                  onClick={resetSettings}
                  className="w-full bg-machine-red hover:bg-machine-red/80 text-white text-xs"
                  data-testid="reset-settings"
                >
                  Reset ustawień
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}