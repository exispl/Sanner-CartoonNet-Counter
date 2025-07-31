export interface Translation {
  'title': string;
  'active-machines': string;
  'total-boxes': string;
  'uptime': string;
  'efficiency': string;
  'machine': string;
  'progress': string;
  'fill-level': string;
  'click-to-configure': string;
  'current-box': string;
  'items-in-box': string;
  'machine-settings': string;
  'target-limit': string;
  'cycle-time': string;
  'start': string;
  'pause': string;
  'reset': string;
  'close': string;
  'global-controls': string;
  'start-all': string;
  'pause-all': string;
  'reset-all': string;
  'export': string;
}

export const translations: Record<string, Translation> = {
  pl: {
    'title': 'Kartonowy Napełniacz Online',
    'active-machines': 'Aktywne maszyny',
    'total-boxes': 'Wyprodukowane kartony',
    'uptime': 'Czas pracy',
    'efficiency': 'Wydajność',
    'machine': 'Maszyna',
    'progress': 'Postęp napełniania',
    'fill-level': 'Poziom napełnienia',
    'click-to-configure': 'Kliknij aby skonfigurować',
    'current-box': 'Aktualny karton',
    'items-in-box': 'Elementów w kartonie',
    'machine-settings': 'Ustawienia maszyny',
    'target-limit': 'Limit docelowy',
    'cycle-time': 'Czas cyklu (min)',
    'start': 'Start',
    'pause': 'Pauza',
    'reset': 'Reset',
    'close': 'Zamknij',
    'global-controls': 'Kontrola globalna',
    'start-all': 'Uruchom wszystkie',
    'pause-all': 'Zatrzymaj wszystkie',
    'reset-all': 'Resetuj wszystkie',
    'export': 'Eksportuj ustawienia'
  },
  en: {
    'title': 'Cardboard Filler Online',
    'active-machines': 'Active machines',
    'total-boxes': 'Produced boxes',
    'uptime': 'Uptime',
    'efficiency': 'Efficiency',
    'machine': 'Machine',
    'progress': 'Filling progress',
    'fill-level': 'Fill level',
    'click-to-configure': 'Click to configure',
    'current-box': 'Current box',
    'items-in-box': 'Items in box',
    'machine-settings': 'Machine settings',
    'target-limit': 'Target limit',
    'cycle-time': 'Cycle time (min)',
    'start': 'Start',
    'pause': 'Pause',
    'reset': 'Reset',
    'close': 'Close',
    'global-controls': 'Global controls',
    'start-all': 'Start all',
    'pause-all': 'Pause all',
    'reset-all': 'Reset all',
    'export': 'Export settings'
  },
  de: {
    'title': 'Karton-Füller Online',
    'active-machines': 'Aktive Maschinen',
    'total-boxes': 'Produzierte Kartons',
    'uptime': 'Betriebszeit',
    'efficiency': 'Effizienz',
    'machine': 'Maschine',
    'progress': 'Füllfortschritt',
    'fill-level': 'Füllstand',
    'click-to-configure': 'Klicken zum Konfigurieren',
    'current-box': 'Aktueller Karton',
    'items-in-box': 'Gegenstände im Karton',
    'machine-settings': 'Maschineneinstellungen',
    'target-limit': 'Ziellimit',
    'cycle-time': 'Zykluszeit (Min)',
    'start': 'Start',
    'pause': 'Pause',
    'reset': 'Zurücksetzen',
    'close': 'Schließen',
    'global-controls': 'Globale Kontrollen',
    'start-all': 'Alle starten',
    'pause-all': 'Alle pausieren',
    'reset-all': 'Alle zurücksetzen',
    'export': 'Einstellungen exportieren'
  }
};

export type Language = keyof typeof translations;
