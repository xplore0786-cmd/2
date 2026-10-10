import React from 'react';
import { useI18n } from '../lib/i18n';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useI18n();

  return (
    <div 
      className="inline-flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-2xs shrink-0"
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
        title="English"
      >
        <span className="mr-0.5 sm:mr-1">🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('hinglish')}
        className={`px-1.5 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
          language === 'hinglish'
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
        title="Hinglish (Hindi in Roman script)"
      >
        <span className="mr-0.5 sm:mr-1">🇮🇳</span>
        <span className="hidden sm:inline">Hinglish</span>
        <span className="sm:hidden">HI</span>
      </button>
    </div>
  );
};
