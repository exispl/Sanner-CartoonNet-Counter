import { useState, useEffect } from 'react';

export type ColorScheme = 'default' | 'green' | 'blue' | 'yellow';

export interface AppSettings {
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  soundEffectsEnabled: boolean;
  animationsEnabled: boolean;
  colorScheme: ColorScheme;
}

const defaultSettings: AppSettings = {
  isDarkMode: false,
  notificationsEnabled: true,
  soundEffectsEnabled: false,
  animationsEnabled: true,
  colorScheme: 'default',
};

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDarkMode]);

  // Apply animations setting
  useEffect(() => {
    if (!settings.animationsEnabled) {
      document.documentElement.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
    }
  }, [settings.animationsEnabled]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('app-settings', JSON.stringify(updatedSettings));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('app-settings');
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}