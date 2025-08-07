import { Language } from '@/lib/translations';

// Import flag images
import plFlag from '@/assets/flags/pl.svg';
import usFlag from '@/assets/flags/us.svg';
import deFlag from '@/assets/flags/de.svg';
import trFlag from '@/assets/flags/tr.svg';
import arFlag from '@/assets/flags/ar.svg';
import saFlag from '@/assets/flags/sa.svg';
import frFlag from '@/assets/flags/fr.svg';
import itFlag from '@/assets/flags/it.svg';
import hrFlag from '@/assets/flags/hr.svg';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageOptions = [
  { code: 'pl' as Language, flagSrc: plFlag, label: 'Polski' },
  { code: 'en' as Language, flagSrc: usFlag, label: 'English' },
  { code: 'de' as Language, flagSrc: deFlag, label: 'Deutsch' },
  { code: 'tr' as Language, flagSrc: trFlag, label: 'Türkçe' },
  { code: 'ar' as Language, flagSrc: arFlag, label: 'العربية' },
  { code: 'sa' as Language, flagSrc: saFlag, label: 'العربية السعودية' },
  { code: 'fr' as Language, flagSrc: frFlag, label: 'Français' },
  { code: 'it' as Language, flagSrc: itFlag, label: 'Italiano' },
  { code: 'hr' as Language, flagSrc: hrFlag, label: 'Hrvatski' }
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
          } ${(option.code === 'ar' || option.code === 'sa') ? 'text-lg' : ''}`}
          data-testid={`lang-${option.code}`}
        >
          <img 
            src={option.flagSrc} 
            alt={option.label}
            className={`w-8 h-6 object-cover rounded-sm ${(option.code === 'ar' || option.code === 'sa') ? 'text-lg' : ''}`}
          />
          {(option.code === 'ar' || option.code === 'sa') && (
            <span className="text-lg font-bold text-white ml-1">{option.label}</span>
          )}
        </button>
      ))}
    </div>
  );
}