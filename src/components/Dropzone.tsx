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
  AlertCircle
} from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useAuth } from '../context/AuthContext';

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
  const { user, error, unauthorizedDomain, signInWithGoogle, clearError } = useAuth();

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
      onFilesSelected(pendingFiles);
      setPendingFiles([]);
      setShowAuthModal(false);
    }
  }, [user, pendingFiles, onFilesSelected]);

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

    // Check if user is authenticated
    if (!user) {
      setPendingFiles(validFiles);
      setShowAuthModal(true);
      handleTriggerSignIn(validFiles);
      return;
    }

    onFilesSelected(validFiles);
  }, [user, onFilesSelected]);

  // Click on dropzone area / upload button
  const handleDropzoneClick = () => {
    if (!user) {
      setShowAuthModal(true);
      handleTriggerSignIn();
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

  // Create High-Res Sample Images on the Fly for Demo
  const generateSampleImage = (type: 'photo' | 'graphic') => {
    const canvas = document.createElement('canvas');
    const width = type === 'photo' ? 1920 : 1200;
    const height = type === 'photo' ? 1080 : 800;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (type === 'photo') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.3, '#1e1b4b');
      grad.addColorStop(0.6, '#4338ca');
      grad.addColorStop(1, '#f97316');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#fdba74';
      ctx.beginPath();
      ctx.arc(width * 0.75, height * 0.45, 120, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#090d16';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width * 0.25, height * 0.52);
      ctx.lineTo(width * 0.5, height * 0.85);
      ctx.lineTo(width * 0.75, height * 0.42);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(width * 0.25, height * 0.25, 90, 0, Math.PI * 2);
      ctx.arc(width * 0.35, height * 0.23, 110, 0, Math.PI * 2);
      ctx.arc(width * 0.45, height * 0.27, 85, 0, Math.PI * 2);
      ctx.fill();

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'sample-mountain-scenery.jpg', { type: 'image/jpeg' });
          handleFiles([file]);
        }
      }, 'image/jpeg', 0.98);
    } else {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.roundRect(150, 100, width - 300, height - 200, 32);
      ctx.fill();

      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.5, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Sample Vector Illustration PNG', width * 0.5, height * 0.48);
      ctx.font = '24px sans-serif';
      ctx.fillText('High Quality RGBA Graphic', width * 0.5, height * 0.56);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'sample-vector-badge.png', { type: 'image/png' });
          handleFiles([file]);
        }
      }, 'image/png');
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif"
        className="hidden"
        id="file-upload-input"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
            e.target.value = '';
          }
        }}
      />

      <div
        id="dropzone-container"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleDropzoneClick}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 group select-none ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 scale-[1.01] shadow-2xl shadow-indigo-500/10'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50/90 dark:hover:bg-slate-800/60 shadow-sm'
        }`}
      >
        {/* Animated Background Glow on Hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
          {/* Main Upload Icon with Lock/Key indicator if not signed in */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <UploadCloud className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 rtl:-right-auto rtl:-left-1 w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          {/* Heading and subtext */}
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('dropzoneTitle')}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t('dropzoneSubtitle')}
            </p>
          </div>

          {/* Auth status hint */}
          {!user && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-[11px] font-medium text-amber-700 dark:text-amber-300">
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Click to sign in with Google &amp; start compressing</span>
            </div>
          )}

          {/* Formats and Batch Support */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              JPG / JPEG
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              PNG (Alpha)
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              WebP
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              {t('batchLimitHint')}
            </span>
          </div>

          {/* Privacy badge */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/60">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t('zeroUploads')}</span>
          </div>
        </div>
      </div>

      {/* Quick Test Samples */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-medium">{t('trySamplePhotos')}</span>
        <button
          type="button"
          onClick={() => generateSampleImage('photo')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          id="btn-sample-photo"
        >
          <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
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

      {/* Google Sign-in Prompt Modal when clicking Upload or Dropping files */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-center">
            <button
              onClick={() => {
                setShowAuthModal(false);
                setPendingFiles([]);
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
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-sans font-semibold text-[11px] hover:bg-amber-200 transition-colors shrink-0"
                  >
                    {copiedDomain ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDomain ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <a
                  href={firebaseSettingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <span>Open Firebase Authorized Domains</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
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

            {/* Privacy note */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Your images remain 100% private in your browser.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
