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
  'session-reset': string;
  'produced-boxes-session': string;
}

export type Language = 'pl' | 'en' | 'de' | 'tr' | 'ar' | 'fr' | 'it' | 'hr';

export const translations: Record<Language, Translation> = {
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
    'export': 'Eksportuj ustawienia',
    'session-reset': 'Reset sesji',
    'produced-boxes-session': 'Wyprodukowane kartony w tej sesji'
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
    'export': 'Export settings',
    'session-reset': 'Reset session',
    'produced-boxes-session': 'Produced boxes in this session'
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
    'export': 'Einstellungen exportieren',
    'session-reset': 'Sitzung zurücksetzen',
    'produced-boxes-session': 'Produzierte Kartons in dieser Sitzung'
  },
  ar: {
    'title': 'ماكينة تعبئة الكرتون',
    'active-machines': 'الآلات النشطة',
    'total-boxes': 'الصناديق المنتجة',
    'uptime': 'وقت التشغيل',
    'efficiency': 'الكفاءة',
    'machine': 'آلة',
    'progress': 'تقدم التعبئة',
    'fill-level': 'مستوى التعبئة',
    'click-to-configure': 'انقر للتكوين',
    'current-box': 'الصندوق الحالي',
    'items-in-box': 'العناصر في الصندوق',
    'machine-settings': 'إعدادات الآلة',
    'target-limit': 'الحد المستهدف',
    'cycle-time': 'وقت الدورة (دقيقة)',
    'start': 'ابدأ',
    'pause': 'توقف',
    'reset': 'إعادة تعيين',
    'close': 'إغلاق',
    'global-controls': 'التحكم العام',
    'start-all': 'ابدأ الكل',
    'pause-all': 'توقف الكل',
    'reset-all': 'إعادة تعيين الكل',
    'export': 'تصدير الإعدادات',
    'session-reset': 'إعادة تعيين الجلسة',
    'produced-boxes-session': 'الصناديق المنتجة في هذه الجلسة'
  },
  fr: {
    'title': 'Remplisseur de Carton En Ligne',
    'active-machines': 'Machines actives',
    'total-boxes': 'Boîtes produites',
    'uptime': 'Temps de fonctionnement',
    'efficiency': 'Efficacité',
    'machine': 'Machine',
    'progress': 'Progression du remplissage',
    'fill-level': 'Niveau de remplissage',
    'click-to-configure': 'Cliquer pour configurer',
    'current-box': 'Boîte actuelle',
    'items-in-box': 'Éléments dans la boîte',
    'machine-settings': 'Paramètres de la machine',
    'target-limit': 'Limite cible',
    'cycle-time': 'Temps de cycle (min)',
    'start': 'Démarrer',
    'pause': 'Pause',
    'reset': 'Réinitialiser',
    'close': 'Fermer',
    'global-controls': 'Contrôles globaux',
    'start-all': 'Démarrer tout',
    'pause-all': 'Mettre tout en pause',
    'reset-all': 'Réinitialiser tout',
    'export': 'Exporter les paramètres',
    'session-reset': 'Réinitialiser la session',
    'produced-boxes-session': 'Boîtes produites dans cette session'
  },
  tr: {
    'title': 'Karton Doldurucu Online',
    'active-machines': 'Aktif makineler',
    'total-boxes': 'Üretilen kutular',
    'uptime': 'Çalışma süresi',
    'efficiency': 'Verimlilik',
    'machine': 'Makine',
    'progress': 'Doldurma ilerlemesi',
    'fill-level': 'Dolum seviyesi',
    'click-to-configure': 'Yapılandırmak için tıklayın',
    'current-box': 'Mevcut kutu',
    'items-in-box': 'Kutudaki öğeler',
    'machine-settings': 'Makine ayarları',
    'target-limit': 'Hedef limit',
    'cycle-time': 'Döngü süresi (dk)',
    'start': 'Başlat',
    'pause': 'Duraklat',
    'reset': 'Sıfırla',
    'close': 'Kapat',
    'global-controls': 'Genel kontroller',
    'start-all': 'Hepsini başlat',
    'pause-all': 'Hepsini duraklat',
    'reset-all': 'Hepsini sıfırla',
    'export': 'Ayarları dışa aktar',
    'session-reset': 'Oturumu sıfırla',
    'produced-boxes-session': 'Bu oturumda üretilen kutular'
  },
  it: {
    'title': 'Riempitore di Cartone Online',
    'active-machines': 'Macchine attive',
    'total-boxes': 'Scatole prodotte',
    'uptime': 'Tempo di attività',
    'efficiency': 'Efficienza',
    'machine': 'Macchina',
    'progress': 'Progresso riempimento',
    'fill-level': 'Livello riempimento',
    'click-to-configure': 'Clicca per configurare',
    'current-box': 'Scatola corrente',
    'items-in-box': 'Elementi nella scatola',
    'machine-settings': 'Impostazioni macchina',
    'target-limit': 'Limite target',
    'cycle-time': 'Tempo ciclo (min)',
    'start': 'Avvia',
    'pause': 'Pausa',
    'reset': 'Reset',
    'close': 'Chiudi',
    'global-controls': 'Controlli globali',
    'start-all': 'Avvia tutto',
    'pause-all': 'Metti tutto in pausa',
    'reset-all': 'Resetta tutto',
    'export': 'Esporta impostazioni',
    'session-reset': 'Reset sessione',
    'produced-boxes-session': 'Scatole prodotte in questa sessione'
  },
  hr: {
    'title': 'Online Kartonski Punjač',
    'active-machines': 'Aktivni strojevi',
    'total-boxes': 'Proizvedene kutije',
    'uptime': 'Vrijeme rada',
    'efficiency': 'Učinkovitost',
    'machine': 'Stroj',
    'progress': 'Napredak punjenja',
    'fill-level': 'Razina punjenja',
    'click-to-configure': 'Kliknite za konfiguraciju',
    'current-box': 'Trenutna kutija',
    'items-in-box': 'Stavke u kutiji',
    'machine-settings': 'Postavke stroja',
    'target-limit': 'Ciljna granica',
    'cycle-time': 'Vrijeme ciklusa (min)',
    'start': 'Pokreni',
    'pause': 'Pauza',
    'reset': 'Resetiraj',
    'close': 'Zatvori',
    'global-controls': 'Globalne kontrole',
    'start-all': 'Pokreni sve',
    'pause-all': 'Pauziraj sve',
    'reset-all': 'Resetiraj sve',
    'export': 'Izvezi postavke',
    'session-reset': 'Resetiraj sesiju',
    'produced-boxes-session': 'Proizvedene kutije u ovoj sesiji'
  }
};
