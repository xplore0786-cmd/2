import React, { useState } from 'react';
import { 
  Download, 
  Trash2, 
  Eye, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  RefreshCw,
  Target
} from 'lucide-react';
import { ImageFormat, ImageItem, ImageSettings } from '../types';
import { calculateSavings, downloadBlob, formatBytes, generateOutputFilename, getFileExtension } from '../lib/compressor';
import { useI18n } from '../lib/i18n';

interface ImageCardProps {
  item: ImageItem;
  onUpdateSettings: (id: string, newSettings: ImageSettings) => void;
  onRecompress: (id: string) => void;
  onRemove: (id: string) => void;
  onPreview: (item: ImageItem) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  item,
  onUpdateSettings,
  onRecompress,
  onRemove,
  onPreview,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const { t } = useI18n();

  const savings = calculateSavings(item.originalSize, item.compressedSize || 0);
  const origExt = getFileExtension(item.originalType).toUpperCase();
  const compExt = getFileExtension(item.compressedType || item.originalType).toUpperCase();

  const handleDownload = () => {
    if (!item.compressedBlob) return;
    const filename = generateOutputFilename(
      item.name,
      item.compressedType || item.originalType,
      item.settings.filenameSuffix
    );
    downloadBlob(item.compressedBlob, filename);
  };

  return (
    <div 
      className={`relative bg-white dark:bg-slate-900 border rounded-2xl p-4 sm:p-5 transition-all shadow-sm flex flex-col justify-between gap-4 ${
        item.status === 'error'
          ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20'
          : item.status === 'compressing'
          ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/10'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
      id={`image-card-${item.id}`}
    >
      {/* Top Details & Thumbnail */}
      <div className="flex items-start gap-3.5">
        
        {/* Thumbnail Preview with Status Indicator */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 flex items-center justify-center group cursor-pointer"
          onClick={() => item.status === 'done' && onPreview(item)}
        >
          <img
            src={item.compressedUrl || item.previewUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            referrerPolicy="no-referrer"
          />

          {/* Quick Preview Hover Overlay */}
          {item.status === 'done' && (
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
              <Eye className="w-5 h-5" />
            </div>
          )}

          {/* Status Overlay while processing */}
          {item.status === 'compressing' && (
            <div className="absolute inset-0 bg-indigo-950/60 backdrop-blur-[2px] flex items-center justify-center text-white">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            </div>
          )}

          {/* Format Tag */}
          <div className="absolute bottom-1 left-1 rtl:left-auto rtl:right-1 px-1.5 py-0.5 rounded bg-slate-900/80 backdrop-blur text-[9px] font-bold text-white uppercase tracking-wider">
            {origExt}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate" title={item.name}>
              {item.name}
            </h4>

            {/* Remove item button */}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-lg transition-colors"
              title="Remove image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Dimension info */}
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span>{item.originalWidth}×{item.originalHeight}</span>
            {item.compressedWidth && (item.compressedWidth !== item.originalWidth || item.compressedHeight !== item.originalHeight) && (
              <>
                <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  {item.compressedWidth}×{item.compressedHeight}
                </span>
              </>
            )}
          </div>

          {/* Size Comparison Badge Bar */}
          <div className="pt-1.5 flex flex-wrap items-center gap-2">
            {item.status === 'done' ? (
              <>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span className="line-through text-slate-400">{formatBytes(item.originalSize)}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 rtl:rotate-180" />
                  <span className="text-slate-900 dark:text-white font-bold">{formatBytes(item.compressedSize || 0)}</span>
                </div>

                {savings.isSmaller && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    -{savings.percentSaved}%
                  </span>
                )}
              </>
            ) : item.status === 'compressing' ? (
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Optimizing pixels...
              </span>
            ) : item.status === 'error' ? (
              <span className="text-xs font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {item.errorMessage || 'Compression failed'}
              </span>
            ) : (
              <span className="text-xs text-slate-400">Ready to compress</span>
            )}
          </div>
        </div>

      </div>

      {/* Per-Image Individual Settings Toggle */}
      {showSettings && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {t('outputFormat')}
              </label>
              <select
                value={item.settings.format}
                onChange={(e) => {
                  onUpdateSettings(item.id, {
                    ...item.settings,
                    format: e.target.value as ImageFormat,
                  });
                }}
                className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
              >
                <option value="original">{t('keepOriginal')}</option>
                <option value="image/webp">WebP (Best)</option>
                <option value="image/jpeg">JPG / JPEG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {t('qualityLabel')} ({Math.round(item.settings.quality * 100)}%)
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={Math.round(item.settings.quality * 100)}
                onChange={(e) => {
                  onUpdateSettings(item.id, {
                    ...item.settings,
                    preset: 'custom',
                    quality: parseInt(e.target.value, 10) / 100,
                  });
                }}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setShowSettings(!showSettings)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{showSettings ? 'Hide Settings' : 'Customize'}</span>
        </button>

        <div className="flex items-center gap-2">
          {item.status === 'done' && (
            <button
              type="button"
              onClick={() => onPreview(item)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
              title={t('compareBeforeAfter')}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('compareBeforeAfter')}</span>
            </button>
          )}

          <button
            type="button"
            disabled={item.status !== 'done'}
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('downloadSingle')}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
