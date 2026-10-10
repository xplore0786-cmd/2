import React, { useState, useEffect, useMemo } from 'react';
import { Preset, PresetItem } from '../presets';
import { ImageItem, ImageSettings } from '../types';
import { Dropzone } from '../components/Dropzone';
import { ImageList } from '../components/ImageList';
import { GlobalControls } from '../components/GlobalControls';
import { AdSlot } from '../components/AdSlot';
import { CommunityShare } from '../components/CommunityShare';
import { AffiliateBox } from '../components/AffiliateBox';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight,
  ExternalLink,
  Layers,
  FileCheck,
  Zap,
  Info
} from 'lucide-react';
import { 
  compressSingleImage, 
  downloadAllAsZip, 
  getImageDimensions 
} from '../lib/compressor';
import { useI18n } from '../lib/i18n';

interface PresetPageProps {
  preset: Preset;
  onNavigate: (route: string) => void;
  onOpenModal?: (item: ImageItem) => void;
}

export const PresetPage: React.FC<PresetPageProps> = ({ 
  preset, 
  onNavigate,
  onOpenModal 
}) => {
  const { t, language } = useI18n();
  const [selectedItemId, setSelectedItemId] = useState<string>(preset.items[0]?.id || 'default');
  const [items, setItems] = useState<ImageItem[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<number | null>(null);

  const activeItemConfig: PresetItem = useMemo(() => {
    return preset.items.find(i => i.id === selectedItemId) || preset.items[0];
  }, [preset, selectedItemId]);

  // Build target settings from the active preset item
  const itemSettings: ImageSettings = useMemo(() => {
    return {
      preset: 'target',
      quality: 0.80,
      format: (activeItemConfig?.allowedFormats[0] || 'image/jpeg') as any,
      resizeMode: activeItemConfig?.widthPx && activeItemConfig?.heightPx ? 'dimensions' : 'original',
      resizePercent: 100,
      maxWidth: activeItemConfig?.widthPx,
      maxHeight: activeItemConfig?.heightPx,
      maintainAspectRatio: true,
      minKB: activeItemConfig?.minKB,
      maxKB: activeItemConfig?.maxKB,
      targetSizeKB: activeItemConfig?.maxKB,
      stripMetadata: true,
      filenameSuffix: `-resized-${activeItemConfig?.id || 'doc'}`,
      backgroundColor: activeItemConfig?.background || '#FFFFFF',
      grayscale: activeItemConfig?.grayscale || false,
      cropAspectRatio: (activeItemConfig?.aspectRatio as any) || 'free',
      presetSlug: preset.slug,
      presetItemId: activeItemConfig?.id,
    };
  }, [preset.slug, activeItemConfig]);

  // Handle files selected for this preset tab
  const handleFilesSelected = async (newFiles: File[]) => {
    if (newFiles.length === 0) return;
    setIsCompressing(true);

    const newItems: ImageItem[] = [];
    for (const file of newFiles) {
      let origW = 800;
      let origH = 800;
      try {
        const dims = await getImageDimensions(file);
        origW = dims.width;
        origH = dims.height;
      } catch {
        // fallback
      }

      const newItem: ImageItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        originalSize: file.size,
        originalWidth: origW,
        originalHeight: origH,
        originalType: file.type || 'image/jpeg',
        previewUrl: URL.createObjectURL(file),
        status: 'compressing',
        settings: { ...itemSettings },
      };

      try {
        const result = await compressSingleImage(newItem);
        newItem.compressedBlob = result.blob;
        newItem.compressedUrl = result.url;
        newItem.compressedSize = result.size;
        newItem.compressedWidth = result.width;
        newItem.compressedHeight = result.height;
        newItem.compressedType = result.mimeType;
        newItem.compressionRatio = result.ratio;
        newItem.status = 'done';
        newItem.meetsTargetRequirement = result.meetsRequirement;
        newItem.validationMessage = result.validationMessage;
      } catch (err: any) {
        newItem.status = 'error';
        newItem.errorMessage = err?.message || 'Compression failed';
      }

      newItems.push(newItem);
    }

    setItems(prev => [...newItems, ...prev]);
    setIsCompressing(false);
  };

  const handleUpdateItemSettings = async (id: string, newSettings: ImageSettings) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, settings: newSettings } : item));
    const target = items.find(i => i.id === id);
    if (!target) return;

    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'compressing' } : i));
    try {
      const res = await compressSingleImage({ ...target, settings: newSettings });
      setItems(prev => prev.map(i => i.id === id ? {
        ...i,
        compressedBlob: res.blob,
        compressedUrl: res.url,
        compressedSize: res.size,
        compressedWidth: res.width,
        compressedHeight: res.height,
        compressedType: res.mimeType,
        compressionRatio: res.ratio,
        status: 'done',
        meetsTargetRequirement: res.meetsRequirement,
        validationMessage: res.validationMessage,
      } : i));
    } catch (err: any) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'error', errorMessage: err?.message } : i));
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearAll = () => {
    items.forEach(i => {
      if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl);
    });
    setItems([]);
  };

  const handleDownloadAllZip = async () => {
    if (items.length === 0) return;
    setZipProgress(0);
    await downloadAllAsZip(items, setZipProgress);
    setTimeout(() => setZipProgress(null), 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate(preset.category === 'govt-jobs' ? 'govt-jobs' : preset.category === 'passport-id' ? 'passport-photo' : 'resize-by-size')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
          {preset.categoryLabel}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
          {preset.title}
        </span>
      </nav>

      {/* Hero Title & Intro Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <FileCheck className="w-3.5 h-3.5 text-indigo-500" />
          <span>{preset.categoryLabel} Tool Preset</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {preset.h1}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Last updated: {preset.lastUpdated}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% In-Browser Privacy
          </span>
        </div>
      </div>

      {/* Ad slot top */}
      <AdSlot position="top" />

      {/* Tool Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        
        {/* Multi-Item Tabs (e.g. Photo vs Signature vs Thumb Impression) */}
        {preset.items.length > 1 && (
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Document to Resize:
            </label>
            <div className="flex flex-wrap gap-2">
              {preset.items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemId(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedItemId === item.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Specifications summary box */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-slate-700 dark:text-slate-300">
            {activeItemConfig.minKB !== undefined && activeItemConfig.maxKB !== undefined && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Weight</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeItemConfig.minKB} KB - {activeItemConfig.maxKB} KB
                </span>
              </div>
            )}
            {activeItemConfig.widthPx && activeItemConfig.heightPx && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Resolution</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeItemConfig.widthPx} x {activeItemConfig.heightPx} px
                </span>
              </div>
            )}
            {activeItemConfig.dimensionCm && (
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Physical Size</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {activeItemConfig.dimensionCm}
                </span>
              </div>
            )}
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Format</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {activeItemConfig.allowedFormats.map(f => f.replace('image/', '').toUpperCase()).join(', ')}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
            <Zap className="w-3.5 h-3.5" />
            <span>Preset Auto-Configured</span>
          </div>
        </div>

        {/* Dropzone Upload */}
        <Dropzone
          onFilesSelected={handleFilesSelected}
          isProcessing={isCompressing}
          acceptedFormats={activeItemConfig.allowedFormats.map(f => `.${f.replace('image/', '')}`).join(', ')}
        />

        {/* Action Controls & Batch stats */}
        {items.length > 0 && (
          <>
            <GlobalControls
              items={items}
              onDownloadAllZip={handleDownloadAllZip}
              onClearAll={handleClearAll}
              zipProgress={zipProgress}
            />

            {/* List of processed images */}
            <ImageList
              items={items}
              onUpdateSettings={handleUpdateItemSettings}
              onRemoveItem={handleRemoveItem}
              onOpenBeforeAfter={(item) => onOpenModal && onOpenModal(item)}
            />
          </>
        )}

      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Client-Side Privacy</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Images never touch any external server</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <Zap className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Unlimited & Free</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Zero login walls, zero fees, unlimited resizes</p>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <FileCheck className="w-6 h-6 text-sky-500 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Exact KB Precision</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Binary search matches portal size limits</p>
        </div>
      </div>

      {/* Community Share Widget */}
      <CommunityShare toolTitle={preset.title} />

      {/* Ad slot below tool */}
      <AdSlot position="belowTool" />

      {/* Educational & Explanatory Content Section */}
      <div className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Intro */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
            About {preset.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            {preset.intro}
          </p>
        </div>

        {/* 4-Step How-To */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            How to Resize in 4 Simple Steps:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {preset.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Notification Reminder Note */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3 text-xs sm:text-sm">
          <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-slate-600 dark:text-slate-300">
            <strong>Important Candidate Notice:</strong> Always confirm the size and dimension requirements in the official notification before submitting your form. Requirements can change across recruitment years or state notification amendments.
          </p>
        </div>

        {/* FAQs */}
        {preset.faqs && preset.faqs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {preset.faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate Box */}
        <AffiliateBox category={preset.category} />

        {/* Related Tools */}
        {preset.related && preset.related.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Related Resizing Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {preset.related.map((relSlug) => (
                <button
                  key={relSlug}
                  type="button"
                  onClick={() => onNavigate(relSlug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                >
                  <span>{relSlug.replace(/-/g, ' ')}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
