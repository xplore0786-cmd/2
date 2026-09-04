import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  Zap,
  FileCheck
} from 'lucide-react';
import { useI18n } from '../lib/i18n';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFilesSelected,
  isProcessing = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleFiles = useCallback((files: FileList | File[]) => {
    const validFiles: File[] = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp', 'image/gif'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validTypes.includes(file.type) || file.name.match(/\.(jpe?g|png|webp|bmp|gif)$/i)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  }, [onFilesSelected]);

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
      // Create rich scenic landscape gradient with noise/details
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(0.3, '#3b82f6');
      gradient.addColorStop(0.6, '#f97316');
      gradient.addColorStop(1, '#db2777');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Mountains & Sun
      ctx.fillStyle = '#ffedd5';
      ctx.beginPath();
      ctx.arc(width * 0.7, height * 0.35, 120, 0, Math.PI * 2);
      ctx.fill();

      // Mountain silhouette
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width * 0.3, height * 0.45);
      ctx.lineTo(width * 0.6, height * 0.75);
      ctx.lineTo(width * 0.85, height * 0.5);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Clouds
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
      // Create transparent PNG Graphic
      ctx.clearRect(0, 0, width, height);
      
      // Graphic card with shadow
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.roundRect(150, 100, width - 300, height - 200, 32);
      ctx.fill();

      // Pattern circles
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
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 group select-none ${
          isDragOver
            ? 'border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/40 scale-[1.01] shadow-2xl shadow-indigo-500/10'
            : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50/90 dark:hover:bg-slate-800/60 shadow-sm'
        }`}
      >
        {/* Animated Background Glow on Hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto">
          {/* Main Upload Icon */}
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95"
          id="btn-sample-photo"
        >
          <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t('sampleLandscape')}</span>
        </button>
        <button
          type="button"
          onClick={() => generateSampleImage('graphic')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105 active:scale-95"
          id="btn-sample-graphic"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-500" />
          <span>{t('sampleLogo')}</span>
        </button>
      </div>
    </div>
  );
};
