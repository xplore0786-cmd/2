import React, { useMemo } from 'react';
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
  FileCheck,
  Calendar,
  Briefcase,
  Globe,
  Maximize2,
  Share2,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { AdSlot } from '../components/AdSlot';
import { CommunityShare } from '../components/CommunityShare';
import { ImageItem, ImageSettings, PageRoute } from '../types';
import { useI18n } from '../lib/i18n';
import { PRESETS, getPresetsByCategory } from '../presets';

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
  onNavigate: (route: string) => void;
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
  const { t } = useI18n();
  const completedCount = items.filter((i) => i.status === 'done').length;

  // Presets sorted by lastUpdated descending for "Recently updated"
  const recentlyUpdated = useMemo(() => {
    return [...PRESETS]
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 6);
  }, []);

  // Popular tools curated list
  const popularTools = useMemo(() => {
    const popularSlugs = [
      'ssc-photo-signature-resize',
      'indian-passport-photo-resize',
      'resize-signature-to-20kb',
      'resize-image-to-50kb',
      'us-visa-photo-resize',
      'resize-image-to-100kb',
      'youtube-thumbnail-resizer-1280x720',
      'pan-card-photo-signature-resize',
    ];
    return PRESETS.filter(p => popularSlugs.includes(p.slug));
  }, []);

  const govtPresets = useMemo(() => getPresetsByCategory('govt-jobs'), []);
  const passportPresets = useMemo(() => getPresetsByCategory('passport-id'), []);
  const kbPresets = useMemo(() => getPresetsByCategory('resize-to-kb'), []);
  const dimPresets = useMemo(() => getPresetsByCategory('dimensions'), []);

  return (
    <div className="space-y-12 sm:space-y-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>{t('heroBadge')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          {t('heroTitle')}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {t('heroSubtitle')}
        </p>

        {/* Feature quick badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400 pt-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" /> {t('zeroUploads')}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" /> {t('instantProcessing')}
          </span>
          <span className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-500 shrink-0" /> Exact 20KB & 50KB Presets
          </span>
        </div>
      </section>

      {/* Main Interactive Compressor Workspace at the TOP */}
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

      {/* Community Share */}
      <div className="max-w-5xl mx-auto">
        <CommunityShare />
      </div>

      {/* Popular Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Most Used</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Popular Resizing Tools
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            One-click presets with dimensions and target KB auto-configured.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onNavigate(tool.slug)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                    {tool.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {tool.items[0]?.minKB ? `${tool.items[0].minKB}-${tool.items[0].maxKB}KB` : `${tool.items[0]?.maxKB || 'Auto'}KB`}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.metaDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Open Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Govt Jobs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Government Recruitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Govt Exam Photo & Signature Resizers
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('govt-jobs')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Govt Exam Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {govtPresets.slice(0, 6).map((preset) => (
            <div
              key={preset.id}
              onClick={() => onNavigate(preset.slug)}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  {preset.items.length} Files Supported
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-2 mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {preset.metaDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Resize Documents</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Passport & ID Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Identity & Travel Documents</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Passport Photo, Visa & ID Tools
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('passport-photo')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Passport & ID Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {passportPresets.slice(0, 8).map((preset) => (
            <div
              key={preset.id}
              onClick={() => onNavigate(preset.slug)}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                  {preset.items[0]?.dimensionCm || 'Standard'}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mt-2 mb-1">
                  {preset.title.split('Online')[0].trim()}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {preset.metaDescription}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Crop & Resize</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resize to KB & Dimensions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Exact Kilobytes & Pixels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Resize by KB Size & Resolution
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('resize-by-size')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Size Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {kbPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onNavigate(preset.slug)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center hover:border-indigo-500 hover:shadow-sm transition-all group"
            >
              <span className="block text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {preset.items[0]?.maxKB ? `${preset.items[0].maxKB} KB` : 'KB'}
              </span>
              <span className="block text-[11px] text-slate-400 mt-0.5">
                Target Reducer
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Recently Updated Section (sorted by lastUpdated) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Recently Updated Tools
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Synced with recent exam cycles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyUpdated.map((preset) => (
            <div
              key={preset.id}
              onClick={() => onNavigate(preset.slug)}
              className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-white dark:hover:bg-slate-900 transition-all group"
            >
              <div className="truncate mr-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {preset.title}
                </h4>
                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3" /> Updated {preset.lastUpdated}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* Format Comparison Matrix */}
      <FormatGuide />

      {/* FAQ Section */}
      <SeoFaqSection />

    </div>
  );
};
