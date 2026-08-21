import React, { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Trash2, 
  Zap, 
  ArrowDownCircle, 
  Layers, 
  CheckCircle2,
  TrendingDown,
  FileArchive
} from 'lucide-react';
import { ImageItem, ImageSettings } from '../types';
import { ImageCard } from './ImageCard';
import { formatBytes } from '../lib/compressor';

interface ImageListProps {
  items: ImageItem[];
  onUpdateSettings: (id: string, newSettings: ImageSettings) => void;
  onRecompress: (id: string) => void;
  onRemove: (id: string) => void;
  onPreview: (item: ImageItem) => void;
  onDownloadAllZip: () => void;
  onClearAll: () => void;
  isCompressing: boolean;
  zipProgress?: number | null;
}

export const ImageList: React.FC<ImageListProps> = ({
  items,
  onUpdateSettings,
  onRecompress,
  onRemove,
  onPreview,
  onDownloadAllZip,
  onClearAll,
  isCompressing,
  zipProgress,
}) => {
  const [filter, setFilter] = useState<'all' | 'done' | 'processing'>('all');

  if (items.length === 0) return null;

  // Calculate Aggregated Metrics
  const totalOriginalBytes = items.reduce((acc, item) => acc + item.originalSize, 0);
  const completedItems = items.filter((item) => item.status === 'done');
  const totalCompressedBytes = completedItems.reduce(
    (acc, item) => acc + (item.compressedSize || item.originalSize),
    0
  );
  const totalSavedBytes = Math.max(0, totalOriginalBytes - totalCompressedBytes);
  const overallReductionPercent =
    totalOriginalBytes > 0
      ? Math.round(((totalOriginalBytes - totalCompressedBytes) / totalOriginalBytes) * 100)
      : 0;

  const filteredItems = items.filter((item) => {
    if (filter === 'done') return item.status === 'done';
    if (filter === 'processing') return item.status === 'compressing';
    return true;
  });

  return (
    <div className="w-full space-y-6">
      
      {/* Batch Overview Analytics Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40">
        
        {/* Ambient subtle glow decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Main Stat Block */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Batch Optimization Complete</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Saved {formatBytes(totalSavedBytes)}
              </span>
              {overallReductionPercent > 0 && (
                <span className="text-base sm:text-lg font-extrabold text-emerald-400 flex items-center">
                  <TrendingDown className="w-5 h-5 mr-0.5" />
                  {overallReductionPercent}% reduction
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              Compressed {completedItems.length} of {items.length} files locally • Original: {formatBytes(totalOriginalBytes)} ➔ Output: {formatBytes(totalCompressedBytes)}
            </p>
          </div>

          {/* Quick Batch Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              id="batch-download-zip-btn"
              disabled={completedItems.length === 0}
              onClick={onDownloadAllZip}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
            >
              <FileArchive className="w-4 h-4" />
              <span>
                {zipProgress !== null && zipProgress !== undefined
                  ? `Archiving (${zipProgress}%)...`
                  : `Download All as ZIP (${completedItems.length})`}
              </span>
            </button>

            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-800/80 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>

        </div>

      </div>

      {/* Filter / Tabs & Image Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>Uploaded Images ({items.length})</span>
          </h3>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('done')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filter === 'done'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Done ({completedItems.length})
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <ImageCard
              key={item.id}
              item={item}
              onUpdateSettings={onUpdateSettings}
              onRecompress={onRecompress}
              onRemove={onRemove}
              onPreview={onPreview}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
