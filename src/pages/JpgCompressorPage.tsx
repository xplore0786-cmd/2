import React, { useEffect } from 'react';
import { Sparkles, ShieldCheck, Zap, Image as ImageIcon } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { ImageItem, ImageSettings, PageRoute } from '../types';

interface JpgCompressorPageProps {
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

export const JpgCompressorPage: React.FC<JpgCompressorPageProps> = ({
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
  // Pre-configure JPG format
  useEffect(() => {
    if (settings.format !== 'image/jpeg') {
      onChangeSettings({
        ...settings,
        format: 'image/jpeg',
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
          <span>JPEG / JPG Image Optimizer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          JPG Compressor Online
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Compress JPG and JPEG photos with optimal quantization matrices. Reduce MB sizes up to 80% while retaining rich colors and sharpness.
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
