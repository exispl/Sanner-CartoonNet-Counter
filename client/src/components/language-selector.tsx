import { translations, Language } from '@/lib/translations';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  const languages = [
    { code: 'pl' as Language, flag: '🇵🇱', label: 'PL' },
    { code: 'en' as Language, flag: '🇺🇸', label: 'EN' },
    { code: 'de' as Language, flag: '🇩🇪', label: 'DE' }
  ];

  return (
    <div className="flex items-center space-x-2 industrial-100 p-1 rounded-lg">
      {languages.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentLang === code
              ? 'bg-machine-blue text-white'
              : 'text-industrial-600 hover:text-industrial-800'
          }`}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}
