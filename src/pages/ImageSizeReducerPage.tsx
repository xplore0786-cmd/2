import React, { useEffect } from 'react';
import { Target, Sparkles, ShieldCheck, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { ImageItem, ImageSettings, PageRoute } from '../types';

interface ImageSizeReducerPageProps {
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

export const ImageSizeReducerPage: React.FC<ImageSizeReducerPageProps> = ({
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
  // Set default preset to target KB mode if not set
  useEffect(() => {
    if (settings.preset !== 'target') {
      onChangeSettings({
        ...settings,
        preset: 'target',
        targetSizeKB: settings.targetSizeKB || 100,
      });
    }
  }, []);

  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <Target className="w-3.5 h-3.5 text-indigo-500" />
          <span>Target File Size Optimizer</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Image Size Reducer
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Reduce photos to specific file sizes like 100 KB, 200 KB, or 500 KB for passport applications, government portals, or fast email sharing.
        </p>

        {/* Quick Target size presets */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {[50, 100, 200, 500, 1024].map((kb) => (
            <button
              key={kb}
              onClick={() => {
                onChangeSettings({
                  ...settings,
                  preset: 'target',
                  targetSizeKB: kb,
                });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                settings.targetSizeKB === kb
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
              }`}
            >
              Reduce to {kb >= 1024 ? `${kb / 1024} MB` : `${kb} KB`}
            </button>
          ))}
        </div>
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

      {/* Use Cases Grid */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Common Image Size Reducer Use Cases
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Meet strict upload file size constraints without losing visual clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center text-xs font-extrabold">1</span>
                Government Portals & Passports
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Visa applications, national ID portals, and exam submissions usually require strict file sizes (under 50KB or 100KB). Our target optimizer hits these limits precisely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center text-xs font-extrabold">2</span>
                Email & Message Attachments
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Avoid bounce-backs and lengthy upload delays when attaching dozens of high-res photos to emails or chat messages.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center text-xs font-extrabold">3</span>
                Web Page Speed & SEO
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Google ranks fast websites higher. Reducing hero banners from 5MB to 250KB dramatically improves Core Web Vitals (LCP) and reduces bounce rates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center text-xs font-extrabold">4</span>
                E-Commerce Catalogues
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Optimize hundreds of product images in a single batch to reduce Shopify, WooCommerce, or Magento hosting bandwidth costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SeoFaqSection />
    </div>
  );
};
