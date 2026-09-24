import React, { useState, useRef, useEffect } from 'react';
import { 
  LogOut, 
  User as UserIcon, 
  AlertCircle, 
  X, 
  ChevronDown, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  KeyRound,
  Sparkles,
  Globe,
  ShieldAlert,
  UserCheck,
  Crown,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscription, FREE_TIER_LIMIT } from '../context/SubscriptionContext';
import { useI18n } from '../lib/i18n';

export const AuthButton: React.FC = () => {
  const { 
    user, 
    loading, 
    error, 
    unauthorizedDomain,
    configMissingModalOpen, 
    setConfigMissingModalOpen, 
    signInWithGoogle, 
    signInAsGuest,
    signOut, 
    clearError 
  } = useAuth();
  
  const { t } = useI18n();
  const { 
    usageCount, 
    remainingQuota, 
    isUnlimited, 
    subscription, 
    openUpgradeModal 
  } = useSubscription();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const firebaseProvidersUrl = "https://console.firebase.google.com/project/freeimageresize-4e46f/authentication/providers";
  const firebaseSettingsUrl = "https://console.firebase.google.com/project/freeimageresize-4e46f/authentication/settings";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await signInWithGoogle();
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await signOut();
  };

  const handleCopyDomain = () => {
    if (currentHost) {
      navigator.clipboard.writeText(currentHost);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
    );
  }

  return (
    <>
      <div className="relative inline-block" ref={menuRef}>
        {/* Error alert toast / banner */}
        {error && !configMissingModalOpen && (
          <div className="absolute right-0 top-12 z-50 w-84 max-w-[92vw] p-3 rounded-xl bg-amber-50 dark:bg-amber-950/90 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 text-xs shadow-xl animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px] leading-relaxed">
                <p className="font-semibold mb-1">
                  {unauthorizedDomain ? 'Domain Authorization Required' : 'Google Sign-In Notice'}
                </p>
                <p className="text-amber-800 dark:text-amber-200">{error}</p>
                <button
                  type="button"
                  onClick={() => setConfigMissingModalOpen(true)}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-300 underline hover:no-underline"
                >
                  <KeyRound className="w-3 h-3" />
                  View 1-Minute Setup Guide
                </button>
              </div>
              <button
                onClick={clearError}
                className="text-amber-400 hover:text-amber-600 dark:hover:text-amber-200 p-0.5 rounded"
                aria-label="Dismiss error"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {user ? (
          /* Signed In State: Avatar + Dropdown */
          <div>
            <button
              id="user-profile-menu-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all text-left shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="relative">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User profile'}
                    className="w-7 h-7 sm:w-7 sm:h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>

              <div className="hidden sm:block text-left max-w-[120px] truncate">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                  {user.displayName || user.email?.split('@')[0] || 'User'}
                </span>
              </div>

              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {/* User Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Profile'}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold text-sm">
                      {user.displayName?.charAt(0).toUpperCase() || <UserIcon className="w-5 h-5" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {user.displayName || 'User'}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block">
                      {user.email}
                    </span>
                  </div>
                </div>

                <div className="px-2 py-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 mb-2 pb-2">
                  <span>{t('googleAccount')}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Connected
                  </span>
                </div>

                {/* Subscription Tier Info Card */}
                <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 mb-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {isUnlimited ? (
                        <Crown className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Zap className="w-4 h-4 text-indigo-500" />
                      )}
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {isUnlimited ? (subscription.planName || 'Pro Plan') : 'Free Plan'}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                      {isUnlimited ? 'UNLIMITED' : `${usageCount}/${FREE_TIER_LIMIT}`}
                    </span>
                  </div>

                  {!isUnlimited ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                        <span>Free Limit (10 Resizes)</span>
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {remainingQuota} remaining
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-full rounded-full transition-all"
                          style={{ width: `${Math.min(100, (usageCount / FREE_TIER_LIMIT) * 100)}%` }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          openUpgradeModal();
                        }}
                        className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold text-xs shadow-xs hover:from-indigo-700 hover:to-indigo-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Upgrade to Pro ($10+)</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                        ✓ Unlimited image resizing active
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          openUpgradeModal();
                        }}
                        className="mt-2 w-full py-1.5 px-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Manage Subscription
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('signOut')}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Not Signed In: Clean Google Button */
          <button
            type="button"
            id="google-sign-in-btn"
            disabled={isSigningIn}
            onClick={handleSignIn}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-xs hover:border-slate-300 dark:hover:border-slate-600 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            title="Sign in with your Google Account"
          >
            {/* Authentic Google 'G' icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.64v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.11z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.26v3.13C3.27 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.59H1.26C.46 8.18 0 9.97 0 12s.46 3.82 1.26 5.41l4.02-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.64 1.26 6.59l4.02 3.13c.95-2.84 3.6-4.95 6.72-4.95z"
              />
            </svg>
            <span className="hidden sm:inline">
              {isSigningIn ? t('connecting') : t('signInWithGoogle')}
            </span>
            <span className="sm:hidden font-bold">
              {isSigningIn ? '...' : t('signIn')}
            </span>
          </button>
        )}
      </div>

      {/* Firebase Setup Modal for auth/unauthorized-domain & auth/configuration-not-found */}
      {configMissingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6">
            <button
              onClick={() => {
                setConfigMissingModalOpen(false);
                clearError();
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                {unauthorizedDomain ? <Globe className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {unauthorizedDomain 
                    ? 'Authorize Domain in Firebase Console' 
                    : 'Enable Google Provider in Firebase'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Firebase Error: <code className="text-amber-600 dark:text-amber-400 font-mono">
                    {unauthorizedDomain ? 'auth/unauthorized-domain' : 'auth/configuration-not-found'}
                  </code>
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              {unauthorizedDomain ? (
                <>
                  <p className="leading-relaxed">
                    Firebase blocks OAuth popups from domains that are not listed in your project’s <strong>Authorized domains</strong>. To allow sign-in, add this current domain to Firebase:
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                    {/* Domain Copy Box */}
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                        1. Copy your App Domain:
                      </span>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200">
                        <span className="flex-1 truncate select-all">{currentHost}</span>
                        <button
                          type="button"
                          onClick={handleCopyDomain}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-sans font-semibold text-xs border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors shrink-0"
                        >
                          {copiedDomain ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedDomain ? 'Copied!' : 'Copy Domain'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Step 2: Direct link */}
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                        2. Paste into Firebase Settings:
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                        Open Firebase Console &gt; Authentication &gt; <em>Settings</em> tab &gt; <em>Authorized domains</em> &gt; click <strong>Add domain</strong> and paste.
                      </p>
                      <a
                        href={firebaseSettingsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors"
                      >
                        <span>Open Firebase Authorized Domains</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="leading-relaxed">
                    Google Sign-In has not been enabled yet in your Firebase project (<strong className="text-slate-900 dark:text-white">freeimageresize-4e46f</strong>). Follow these 3 quick steps:
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Open Firebase Sign-in Methods:</span>
                        <div className="mt-1">
                          <a
                            href={firebaseProvidersUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-xs transition-colors"
                          >
                            <span>Open Firebase Console</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        2
                      </span>
                      <div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Enable Google:</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Under <em>Sign-in providers</em>, click <strong>Google</strong>, toggle <strong>Enable</strong>, choose your project support email, and click <strong>Save</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        3
                      </span>
                      <div className="w-full">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Authorized Domains:</span>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          In Firebase Console &gt; Authentication &gt; <em>Settings</em> &gt; <em>Authorized domains</em>, make sure this domain is added:
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                          <span className="flex-1 truncate">{currentHost}</span>
                          <button
                            type="button"
                            onClick={handleCopyDomain}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-sans font-medium text-[10px] shrink-0"
                          >
                            {copiedDomain ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedDomain ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setConfigMissingModalOpen(false);
                  clearError();
                  signInAsGuest();
                }}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Continue as Guest</span>
              </button>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setConfigMissingModalOpen(false);
                    clearError();
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setConfigMissingModalOpen(false);
                    await handleSignIn();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Try Google Sign-in Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
