import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  X,
  FileCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Globe,
  AlertCircle,
  UserCheck,
  Crown,
  Zap
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useAuth } from '../context/AuthContext';
import { useSubscription, FREE_TIER_LIMIT } from '../context/SubscriptionContext';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  isProcessing = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();
  const { user, error, unauthorizedDomain, signInWithGoogle, signInAsGuest, clearError } = useAuth();
  const { 
    usageCount, 
    remainingQuota, 
    isUnlimited, 
    openUpgradeModal 
  } = useSubscription();

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  const firebaseSettingsUrl = "https://console.firebase.google.com/project/freeimageresize-4e46f/authentication/settings";

  const handleCopyDomain = () => {
    if (currentHost) {
      navigator.clipboard.writeText(currentHost);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 2000);
    }
  };

  // If user signs in while pendingFiles are waiting, automatically upload and compress
  useEffect(() => {
    if (user && pendingFiles.length > 0) {
      if (!isUnlimited && usageCount >= FREE_TIER_LIMIT) {
        setShowAuthModal(false);
        openUpgradeModal('You have reached your 10 free images limit. Upgrade to Pro for unlimited image resizing!');
        setPendingFiles([]);
        return;
      }
      onFilesSelected(pendingFiles);
      setPendingFiles([]);
      setShowAuthModal(false);
    }
  }, [user, pendingFiles, onFilesSelected, isUnlimited, usageCount, openUpgradeModal]);

  // Initiate Google Sign-In and deferred upload
  const handleTriggerSignIn = async (filesToProcess?: File[]) => {
    setIsSigningIn(true);
    try {
      const loggedUser = await signInWithGoogle();
      if (loggedUser) {
        setShowAuthModal(false);
        const files = filesToProcess && filesToProcess.length > 0 ? filesToProcess : pendingFiles;
        if (files.length > 0) {
          onFilesSelected(files);
          setPendingFiles([]);
        } else {
          // If clicked upload without files selected yet, trigger file picker
          setTimeout(() => {
            fileInputRef.current?.click();
          }, 150);
        }
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  // Guest sign-in fallback for instant upload testing
  const handleGuestSignIn = (filesToProcess?: File[]) => {
    const guestUser = signInAsGuest();
    if (guestUser) {
      setShowAuthModal(false);
      const files = filesToProcess && filesToProcess.length > 0 ? filesToProcess : pendingFiles;
      if (files.length > 0) {
        onFilesSelected(files);
        setPendingFiles([]);
      } else {
        setTimeout(() => {
          fileInputRef.current?.click();
        }, 150);
      }
    }
  };

  const handleFiles = useCallback((files: FileList | File[]) => {
    const validFiles: File[] = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/gif'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validTypes.includes(file.type) || file.name.match(/\.(jpe?g|png|webp|bmp|gif)$/i)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    // Check if user is authenticated; if not, show the modal to sign in
    if (!user) {
      setPendingFiles(validFiles);
      setShowAuthModal(true);
      return;
    }

    // Check usage quota for free signed-in user (limit is 10 images resize)
    if (!isUnlimited) {
      if (usageCount >= FREE_TIER_LIMIT) {
        openUpgradeModal('Usage limit reached: Free signed-in users can resize up to 10 images. Upgrade to Pro ($10/mo, $25/3mo, $75/yr) for unlimited image resizing!');
        return;
      }
      if (usageCount + validFiles.length > FREE_TIER_LIMIT) {
        const allowedCount = Math.max(0, FREE_TIER_LIMIT - usageCount);
        const filesToProcess = validFiles.slice(0, allowedCount);
        openUpgradeModal(`You have ${allowedCount} free resize${allowedCount > 1 ? 's' : ''} left on your Free Plan. We're processing ${filesToProcess.length} image${filesToProcess.length > 1 ? 's' : ''}. Upgrade to Pro for unlimited batch resizing!`);
        if (filesToProcess.length > 0) {
          onFilesSelected(filesToProcess);
        }
        return;
      }
    }

    onFilesSelected(validFiles);
  }, [user, onFilesSelected, isUnlimited, usageCount, openUpgradeModal]);

  // Click on dropzone area / upload button
  const handleDropzoneClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!isUnlimited && usageCount >= FREE_TIER_LIMIT) {
      openUpgradeModal('You have used all 10 free image resizes on your Free Plan. Upgrade to Pro ($10/mo, $25/3mo, $75/yr) for unlimited image resizing!');
      return;
    }
    fileInputRef.current?.click();
  };

  // Handle Drag Events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Clipboard Paste Support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        const items = e.clipboardData.items;
        const pastedFiles: File[] = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const file = items[i].getAsFile();
            if (file) pastedFiles.push(file);
          }
        }
        if (pastedFiles.length > 0) {
          handleFiles(pastedFiles);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFiles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  };

  // Sample photo generator helper for instant testing
  const generateSampleImage = (type: 'photo' | 'graphic') => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (type === 'photo') {
      canvas.width = 1920;
      canvas.height = 1080;
      // Draw scenic gradient with rich noise texture
      const grad = ctx.createLinearGradient(0, 0, 1920, 1080);
      grad.addColorStop(0, '#1e3a8a');
      grad.addColorStop(0.35, '#3b82f6');
      grad.addColorStop(0.7, '#f59e0b');
      grad.addColorStop(1, '#ef4444');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1920, 1080);

      // Add sun disc
      ctx.beginPath();
      ctx.arc(1400, 300, 120, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.fill();

      // Add mountain silhouettes
      ctx.beginPath();
      ctx.moveTo(0, 1080);
      ctx.lineTo(400, 600);
      ctx.lineTo(800, 800);
      ctx.lineTo(1200, 500);
      ctx.lineTo(1600, 750);
      ctx.lineTo(1920, 550);
      ctx.lineTo(1920, 1080);
      ctx.closePath();
      ctx.fillStyle = '#0f172a';
      ctx.fill();

      // Text label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px sans-serif';
      ctx.fillText('Sample High-Resolution Photo (1920×1080)', 80, 140);
      ctx.font = '32px sans-serif';
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('Ready for lossy JPG size reduction tests', 80, 200);

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'sample-mountain-sunset.jpg', { type: 'image/jpeg' });
          handleFiles([sampleFile]);
        }
      }, 'image/jpeg', 0.95);
    } else {
      canvas.width = 1200;
      canvas.height = 1200;
      // Draw transparent background with crisp vector-like geometry
      ctx.clearRect(0, 0, 1200, 1200);

      // Soft circular gradient plate
      const grad = ctx.createRadialGradient(600, 600, 50, 600, 600, 500);
      grad.addColorStop(0, '#6366f1');
      grad.addColorStop(0.8, '#4f46e5');
      grad.addColorStop(1, '#3730a3');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(600, 600, 450, 0, Math.PI * 2);
      ctx.fill();

      // Inner white star/sparkle icon
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(600, 600, 160, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 54px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Vector Graphic (PNG)', 600, 900);
      ctx.font = '32px sans-serif';
      ctx.fillText('Alpha Transparency & Sharp Edges', 600, 960);

      canvas.toBlob((blob) => {
        if (blob) {
          const sampleFile = new File([blob], 'sample-vector-badge.png', { type: 'image/png' });
          handleFiles([sampleFile]);
        }
      }, 'image/png');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif"
        onChange={handleInputChange}
        className="hidden"
        id="file-upload-input"
      />

      {/* Main Interactive Dropzone Box */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload images dropzone"
        onClick={handleDropzoneClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDropzoneClick();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`group relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 scale-[1.01] shadow-xl shadow-indigo-500/10'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 shadow-sm'
        }`}
      >
        {/* Subtle Decorative Background Mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 via-transparent to-cyan-50/20 pointer-events-none dark:from-indigo-950/10 dark:to-cyan-950/10" />

        {/* User Quota & Plan Status Banner */}
        {user ? (
          isUnlimited ? (
            <div className="relative mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-emerald-500/10 border border-amber-300 dark:border-amber-700/60 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>PRO Active: Unlimited Image Resizing</span>
            </div>
          ) : usageCount >= FREE_TIER_LIMIT ? (
            <div className="relative mb-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-center max-w-sm">
              <div className="flex items-center justify-center gap-1.5 font-bold text-amber-900 dark:text-amber-200 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>10 Image Resizes Limit Reached</span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">
                You've used all 10 free resizes. Upgrade to Pro for unlimited resizing!
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openUpgradeModal();
                }}
                className="mt-2.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
              >
                Upgrade to Pro ($10/mo, $25/3mo, $75/yr)
              </button>
            </div>
          ) : (
            <div className="relative mb-5 inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              <span>Signed-in Limit: <strong>{usageCount}/{FREE_TIER_LIMIT}</strong> images resized ({remainingQuota} remaining)</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openUpgradeModal();
                }}
                className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline cursor-pointer"
              >
                Upgrade
              </button>
            </div>
          )
        ) : (
          <div className="relative mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span>Sign in with Google to get 10 free image resizes</span>
          </div>
        )}

        {/* Central Icon Illustration */}
        <div className="relative mb-5">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all duration-300 ${
            isDragOver 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' 
              : 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/25'
          }`}>
            <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:-translate-y-1" />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-pulse">
            <Plus className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Action Title & Instructions */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 text-center tracking-tight mb-2">
          {t('dropzoneTitle')}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-lg mb-6 leading-relaxed">
          {t('dropzoneSubtitle')}
        </p>

        {/* Big Prominent Upload Button */}
        <div className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer">
          <ImageIcon className="w-4 h-4" />
          <span>Select Images from Device</span>
        </div>

        {/* Supported Formats & Privacy Assurance */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero server upload • 100% In-Browser</span>
          </span>
          <span className="hidden sm:inline">•</span>
          <span>JPG, PNG, WebP, GIF, BMP, AVIF</span>
        </div>

        {/* Drag Overlay visual indicator */}
        {isDragOver && (
          <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
            <div className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-base animate-bounce">
              <UploadCloud className="w-5 h-5" />
              <span>Drop images to start compressing!</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Test Demo Files Banner */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-400 dark:text-slate-500">{t('trySamplePhotos')}</span>
        <button
          type="button"
          onClick={() => generateSampleImage('photo')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          id="btn-sample-photo"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{t('sampleLandscape')}</span>
        </button>
        <button
          type="button"
          onClick={() => generateSampleImage('graphic')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          id="btn-sample-graphic"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>{t('sampleLogo')}</span>
        </button>
      </div>

      {/* Sign-in Prompt Modal shown when user clicks Upload or Drops files */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-center">
            <button
              onClick={() => {
                setShowAuthModal(false);
                setPendingFiles([]);
                clearError();
              }}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
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
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {t('signInToUpload')}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
              {t('signInToUploadDesc')}
            </p>

            {/* If files were already dropped/pasted */}
            {pendingFiles.length > 0 && (
              <div className="mb-5 p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/80 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-indigo-500" />
                    <span>{pendingFiles.length} {t('readyToUpload')}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-200/60 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    Pending Sign-In
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {pendingFiles.map(f => f.name).join(', ')}
                </p>
              </div>
            )}

            {/* If Unauthorized Domain Error Occurred */}
            {unauthorizedDomain ? (
              <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-left text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-200 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Authorize Domain in Firebase Console</span>
                </div>
                <p className="text-[11px] text-amber-700 dark:text-amber-300 mb-2 leading-relaxed">
                  Firebase requires your current app domain to be added to <strong>Authorized domains</strong> before Google Sign-In works:
                </p>

                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-700/60 font-mono text-[11px] mb-2.5">
                  <span className="flex-1 truncate select-all">{currentHost}</span>
                  <button
                    type="button"
                    onClick={handleCopyDomain}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-sans font-semibold text-[11px] hover:bg-amber-200 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedDomain ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDomain ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={firebaseSettingsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors"
                  >
                    <span>Open Firebase Settings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleGuestSignIn()}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 hover:bg-amber-50 dark:hover:bg-slate-800 text-amber-900 dark:text-amber-200 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Upload as Guest</span>
                  </button>
                </div>
              </div>
            ) : error ? (
              <div className="mb-4 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-left text-xs text-rose-700 dark:text-rose-300">
                <p className="font-semibold text-[11px] mb-0.5">Authentication Note:</p>
                <p className="text-[11px] leading-relaxed">{error}</p>
              </div>
            ) : null}

            {/* Google Sign In Button */}
            <button
              type="button"
              id="modal-google-sign-in-btn"
              disabled={isSigningIn}
              onClick={() => handleTriggerSignIn()}
              className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-60"
            >
              {isSigningIn ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 24 24">
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
              )}
              <span>{isSigningIn ? t('connecting') : t('continueWithGoogle')}</span>
            </button>

            {/* Quick Guest Upload Alternative */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleGuestSignIn()}
                className="text-xs text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Continue as Guest to upload immediately</span>
              </button>
            </div>

            {/* Privacy note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Your images remain 100% private in your browser.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
