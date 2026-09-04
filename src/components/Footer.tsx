import React from 'react';
import { ShieldCheck, Heart, Zap, Lock, Cpu, Globe } from 'lucide-react';
import { PageRoute } from '../types';
import { useI18n } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                FR
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{t('appName')}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('tagline')}. Reduce image dimensions and file sizes up to 90% without compromising visual quality.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('zeroUploads')}</span>
            </div>
          </div>

          {/* Col 2: Compressors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {t('toolsAndFormats')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('image-size-reducer')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('reducer')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('jpg-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('jpg')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('png-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('png')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('webp-compressor')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('webp')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Privacy & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {t('securityAndPrivacy')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t('noServerStorage')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t('localCanvasEngine')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{t('instantProcessing')}</span>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium underline"
                >
                  {t('privacy')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {t('supportAndLegal')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('contact')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('privacy-policy')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('privacy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('terms')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {t('terms')}
                </button>
              </li>
              <li className="pt-2">
                <LanguageSwitcher compact={false} />
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} freeimageresize. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              Built for speed, privacy & performance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
