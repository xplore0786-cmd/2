import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  ShieldCheck, 
  Sparkles, 
  Image as ImageIcon, 
  Menu, 
  X, 
  Heart,
  Crown
} from 'lucide-react';
import { PageRoute } from '../types';
import { useI18n } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthButton } from './AuthButton';
import { useSubscription, FREE_TIER_LIMIT } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { ENABLE_ACCOUNTS, SHOW_PRO } from '../config';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  queueCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  isDark,
  onToggleTheme,
  queueCount = 0,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useI18n();
  const { user } = useAuth();
  const { 
    usageCount, 
    isUnlimited, 
    openUpgradeModal 
  } = useSubscription();

  // Explicit Phase 3 Navigation Requirement:
  // Home | Govt Jobs | Passport Photo | Resize to KB | Social Sizes | Blog | Support (plus language toggle)
  const navLinks = [
    { label: t('govtJobs'), route: 'govt-jobs' },
    { label: t('passportPhoto'), route: 'passport-photo' },
    { label: t('resizeToKb'), route: 'resize-by-size' },
    { label: t('socialSizes'), route: 'social-media-sizes' },
    { label: t('blog'), route: 'blog' },
    { label: t('support'), route: 'support', badge: 'Free', isHeart: true },
  ];

  if (SHOW_PRO) {
    navLinks.push({ label: 'Pro Plans', route: 'pricing', badge: 'Pro', isHeart: false });
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group select-none min-w-0 shrink-0"
          id="nav-brand-logo"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
              <span className="font-extrabold text-sm sm:text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent truncate">
                {t('appName')}
              </span>
              <span className="hidden xs:inline-block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1 sm:px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                100% Free
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate hidden md:block">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            id="nav-btn-home"
            onClick={() => onNavigate('home')}
            className={`px-2.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors ${
              currentRoute === 'home' || currentRoute === ''
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('home')}
          </button>

          {navLinks.map((link) => (
            <button
              key={link.route}
              id={`nav-btn-${link.route}`}
              onClick={() => onNavigate(link.route)}
              className={`px-2.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors relative flex items-center gap-1.5 ${
                currentRoute === link.route
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.isHeart && (
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              )}
              <span>{link.label}</span>
              {link.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {queueCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span>{queueCount} active</span>
            </div>
          )}

          {/* Conditional Accounts / Pro (hidden by default) */}
          {ENABLE_ACCOUNTS && user && (
            isUnlimited ? (
              <button
                type="button"
                onClick={() => openUpgradeModal()}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-amber-500/10 border border-amber-300 dark:border-amber-700/60 text-xs font-bold text-amber-700 dark:text-amber-300"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>PRO</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openUpgradeModal()}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <span>{usageCount}/{FREE_TIER_LIMIT}</span>
              </button>
            )
          )}

          {ENABLE_ACCOUNTS && <AuthButton />}

          {/* Language Switcher (EN / Hinglish) */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle light or dark theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <button
            onClick={() => {
              onNavigate('home');
              setIsMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
              currentRoute === 'home' || currentRoute === ''
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t('home')}
          </button>

          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => {
                onNavigate(link.route);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between ${
                currentRoute === link.route
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {link.isHeart && (
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                )}
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> 100% Free &amp; In-Browser
            </span>
            {ENABLE_ACCOUNTS && <AuthButton />}
          </div>
        </div>
      )}
    </header>
  );
};
