import { Language } from '@/lib/translations';

// Import flag images
import plFlag from '@/assets/flags/pl.svg';
import usFlag from '@/assets/flags/us.svg';
import deFlag from '@/assets/flags/de.svg';
import trFlag from '@/assets/flags/tr.svg';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageOptions = [
  { code: 'pl' as Language, flagSrc: plFlag, label: 'Polski' },
  { code: 'en' as Language, flagSrc: usFlag, label: 'English' },
  { code: 'de' as Language, flagSrc: deFlag, label: 'Deutsch' },
  { code: 'tr' as Language, flagSrc: trFlag, label: 'Türkçe' },
  { code: 'ar' as Language, flag: '🇸🇦', label: 'العربية' },
  { code: 'fr' as Language, flag: '🇫🇷', label: 'Français' },
  { code: 'it' as Language, flag: '🇮🇹', label: 'Italiano' },
  { code: 'hr' as Language, flag: '🇭🇷', label: 'Hrvatski' }
];

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
      {languageOptions.map((option) => (
        <button
          key={option.code}
          onClick={() => onLanguageChange(option.code)}
          title={option.label}
          className={`hover:scale-110 transition-transform duration-200 p-2 rounded ${
            currentLang === option.code
              ? 'scale-110 drop-shadow-lg bg-white/20'
              : 'opacity-70 hover:opacity-100'
          }`}
          data-testid={`lang-${option.code}`}
        >
          {option.flagSrc ? (
            <img 
              src={option.flagSrc} 
              alt={option.label}
              className="w-8 h-6 object-cover rounded-sm"
            />
          ) : (
            <span className="text-2xl">{option.flag}</span>
          )}
        </button>
      ))}
    </div>
  );
}