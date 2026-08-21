import React, { useEffect } from 'react';
import { Layers, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { ImageItem, ImageSettings, PageRoute } from '../types';

interface PngCompressorPageProps {
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

export const PngCompressorPage: React.FC<PngCompressorPageProps> = ({
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
  // Pre-configure PNG settings
  useEffect(() => {
    if (settings.format !== 'image/png') {
      onChangeSettings({
        ...settings,
        format: 'image/png',
      });
    }
  }, []);

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold shadow-xs">
          <Layers className="w-3.5 h-3.5 text-purple-500" />
          <span>Lossless Alpha Channel Optimization</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          PNG Compressor Online
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Reduce PNG file sizes while keeping 100% transparent backgrounds intact and maintaining pixel-perfect sharp text and lines.
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
