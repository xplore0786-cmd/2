import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Target, 
  Sliders, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { ImageItem, ImageSettings, PageRoute } from '../types';

interface HomePageProps {
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

export const HomePage: React.FC<HomePageProps> = ({
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
  const completedCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Next-Gen In-Browser Compression Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          Free Image Size Reducer Online
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Reduce JPG, PNG, and WebP image file sizes up to 90% without noticeably losing quality. 100% processed securely in your browser with zero server uploads.
        </p>

        {/* Feature quick badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Private (No Uploads)
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Instant Processing
          </span>
          <span className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-500" /> Target File Size (e.g. 100 KB)
          </span>
        </div>
      </section>

      {/* Main Interactive Compressor Workspace */}
      <section className="space-y-8 max-w-5xl mx-auto">
        
        {/* Dropzone */}
        <Dropzone 
          onFilesSelected={onFilesSelected} 
          isProcessing={isCompressing} 
        />

        {/* Global Settings & Controls */}
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

        {/* Uploaded Images List & Batch Metrics */}
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

      {/* Value Propositions / Why Choose Image Size Reducer */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered for Speed, Quality, and Total Privacy
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Why thousands of developers, designers, photographers, and students rely on our image compressor daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero Server Uploads</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your pictures are never uploaded to any remote server or cloud database. All compression calculations occur right inside your browser memory, keeping confidential documents and personal photos 100% private.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Precise Target File Size</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Need an image under 100 KB for a job application or passport portal? Our intelligent binary search optimizer automatically calculates the exact quality and resolution needed to hit your target size.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Batch ZIP Compression</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Compress dozens of high-resolution images in parallel. Download individually with custom naming suffixes or export everything into a neat, compressed ZIP archive with one click.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Format Comparison Matrix */}
      <FormatGuide />

      {/* FAQ Section */}
      <SeoFaqSection />

    </div>
  );
};
