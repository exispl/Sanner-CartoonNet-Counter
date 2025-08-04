import { Language } from '@/lib/translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageOptions = [
  { code: 'pl' as Language, flag: '🇵🇱', label: 'PL' },
  { code: 'en' as Language, flag: '🇺🇸', label: 'EN' },
  { code: 'de' as Language, flag: '🇩🇪', label: 'DE' },
  { code: 'tr' as Language, flag: '🇹🇷', label: 'TR' },
  { code: 'ar' as Language, flag: '🇸🇦', label: 'AR' },
  { code: 'fr' as Language, flag: '🇫🇷', label: 'FR' },
  { code: 'it' as Language, flag: '🇮🇹', label: 'IT' },
  { code: 'hr' as Language, flag: '🇭🇷', label: 'HR' }
];

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
      {languageOptions.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
            currentLang === code
              ? 'bg-white text-industrial-800 shadow-lg scale-105'
              : 'text-white hover:bg-white/20 hover:scale-105'
          }`}
          data-testid={`lang-${code}`}
        >
          <span className="text-lg">{flag}</span>
        </button>
      ))}
    </div>
  );
}