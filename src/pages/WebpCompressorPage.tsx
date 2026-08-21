import React, { useEffect } from 'react';
import { Sparkles, Zap, ShieldCheck, Layers } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { ImageItem, ImageSettings, PageRoute } from '../types';

interface WebpCompressorPageProps {
  items: ImageItem[];
  settings: ImageSettings;
  onChangeSettings: (newSettings: ImageSettings) => void;
  onFilesSelected: (files: File[]) => void;
  onUpdateItemSettings: (id: string, newSettings: ImageSettings) => void;
  onRecompressItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  onPreviewItem: (item: ImageItem) => void;
  onApplySettingsToAll: () => void;
  onCompressAll: () => void;
  onDownloadAllZip: () => void;
  onClearAll: () => void;
  onNavigate: (route: PageRoute) => void;
  isCompressing: boolean;
  zipProgress?: number | null;
}

export const WebpCompressorPage: React.FC<WebpCompressorPageProps> = ({
  items,
  settings,
  onChangeSettings,
  onFilesSelected,
  onUpdateItemSettings,
  onRecompressItem,
  onRemoveItem,
  onPreviewItem,
  onApplySettingsToAll,
  onCompressAll,
  onDownloadAllZip,
  onClearAll,
  onNavigate,
  isCompressing,
  zipProgress,
}) => {
  // Pre-configure WebP format
  useEffect(() => {
    if (settings.format !== 'image/webp') {
      onChangeSettings({
        ...settings,
        format: 'image/webp',
        preset: 'medium',
        quality: 0.75,
      });
    }
  }, []);

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold shadow-xs">
          <Zap className="w-3.5 h-3.5 text-emerald-500" />
          <span>Next-Gen Web Standard</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          WebP Compressor & Converter
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Convert and compress JPG, PNG, and WebP into ultra-compact, high-performance WebP images. Speed up web load times with up to 35% smaller file sizes.
        </p>
      </section>

      {/* Compressor Workspace */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <Dropzone 
          onFilesSelected={onFilesSelected} 
          isProcessing={isCompressing} 
        />

        {items.length > 0 && (
          <GlobalControls
            settings={settings}
            onChangeSettings={onChangeSettings}
            onApplyToAll={onApplySettingsToAll}
            onCompressAll={onCompressAll}
            onDownloadZip={onDownloadAllZip}
            onClearAll={onClearAll}
            totalImages={items.length}
            completedImages={completedCount}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}

        {items.length > 0 && (
          <ImageList
            items={items}
            onUpdateSettings={onUpdateItemSettings}
            onRecompress={onRecompressItem}
            onRemove={onRemoveItem}
            onPreview={onPreviewItem}
            onDownloadAllZip={onDownloadAllZip}
            onClearAll={onClearAll}
            isCompressing={isCompressing}
            zipProgress={zipProgress}
          />
        )}
      </section>

      <FormatGuide />
      <SeoFaqSection />
    </div>
  );
};
