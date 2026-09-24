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
  FileCheck,
  Crown
} from 'lucide-react';
import { Dropzone } from '../components/Dropzone';
import { GlobalControls } from '../components/GlobalControls';
import { ImageList } from '../components/ImageList';
import { SeoFaqSection } from '../components/SeoFaqSection';
import { FormatGuide } from '../components/FormatGuide';
import { ImageItem, ImageSettings, PageRoute } from '../types';
import { useI18n } from '../lib/i18n';

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
  const { t } = useI18n();
  const completedCount = items.filter((i) => i.status === 'done').length;

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
            <Target className="w-4 h-4 text-indigo-500 shrink-0" /> {t('targetFileSize')} (e.g. 100 KB)
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

      {/* Value Propositions / Why Choose freeimageresize */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t('feature1Title')} & {t('feature3Title')}
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
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('feature1Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feature1Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('feature2Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feature2Desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('feature3Title')}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('feature3Desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Format Comparison Matrix */}
      <FormatGuide />

      {/* Subscription Model Showcase Banner */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-7 sm:p-12 shadow-2xl relative overflow-hidden border border-indigo-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Pro Subscription Plans</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Need Unlimited Image Resizing?
            </h2>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              Free signed-in users can resize up to <strong>10 images</strong>. Upgrade to Pro to remove all limits, enable high-capacity batch processing, and enjoy instant downloads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
                <span className="text-xs text-indigo-200 font-semibold block">1 Month</span>
                <div className="my-1">
                  <span className="text-2xl font-black text-white">$10</span>
                  <span className="text-xs text-slate-300 font-bold ml-1">USD</span>
                </div>
                <span className="text-[11px] text-slate-400">Billed monthly</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 text-center relative">
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-[10px] font-extrabold text-white">
                  Save 17%
                </span>
                <span className="text-xs text-indigo-200 font-semibold block">3 Months</span>
                <div className="my-1">
                  <span className="text-2xl font-black text-white">$25</span>
                  <span className="text-xs text-slate-300 font-bold ml-1">USD</span>
                </div>
                <span className="text-[11px] text-slate-400">$8.33 / month</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-500/30 to-purple-500/30 border border-indigo-400/50 text-center relative ring-2 ring-indigo-400/60 shadow-lg">
                <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-[10px] font-black text-slate-950 uppercase tracking-wide">
                  Best Value
                </span>
                <span className="text-xs text-amber-300 font-bold block">1 Year</span>
                <div className="my-1">
                  <span className="text-2xl font-black text-white">$75</span>
                  <span className="text-xs text-slate-300 font-bold ml-1">USD</span>
                </div>
                <span className="text-[11px] text-slate-300">Save 37.5% • $6.25/mo</span>
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Plans & Upgrade to Pro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">
                Cancel anytime • 30-day money back guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <SeoFaqSection />

    </div>
  );
};
