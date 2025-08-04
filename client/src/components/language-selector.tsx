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
  { code: 'tr' as Language, flagSrc: trFlag, label: 'Türkçe' }
];

export function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-2">
      {languageOptions.map(({ code, flagSrc, label }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code)}
          title={label}
          className={`hover:scale-110 transition-transform duration-200 p-2 rounded ${
            currentLang === code
              ? 'scale-110 drop-shadow-lg bg-white/20'
              : 'opacity-70 hover:opacity-100'
          }`}
          data-testid={`lang-${code}`}
        >
          <img 
            src={flagSrc} 
            alt={label}
            className="w-8 h-6 object-cover rounded-sm"
          />
        </button>
      ))}
    </div>
  );
}