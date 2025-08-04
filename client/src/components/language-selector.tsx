import { Language } from '@/lib/translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageOptions = [
  { code: 'pl' as Language, flag: '🇵🇱', label: 'Polski' },
  { code: 'en' as Language, flag: '🇺🇸', label: 'English' },
  { code: 'de' as Language, flag: '🇩🇪', label: 'Deutsch' },
  { code: 'tr' as Language, flag: '🇹🇷', label: 'Türkçe' },
  { code: 'ar' as Language, flag: '🇸🇦', label: 'العربية' },
  { code: 'fr' as Language, flag: '🇫🇷', label: 'Français' },
  { code: 'it' as Language, flag: '🇮🇹', label: 'Italiano' },
  { code: 'hr' as Language, flag: '🇭🇷', label: 'Hrvatski' }
];

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
      {languageOptions.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          title={label}
          className={`text-2xl hover:scale-110 transition-transform duration-200 p-1 rounded ${
            currentLang === code
              ? 'scale-110 drop-shadow-lg bg-white/20'
              : 'opacity-70 hover:opacity-100'
          }`}
          data-testid={`lang-${code}`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}