import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Target, 
  Maximize2, 
  FileText, 
  Zap, 
  RotateCcw, 
  Download, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Unlock, 
  ShieldCheck
} from 'lucide-react';
import { CompressionPreset, ImageFormat, ImageSettings, ResizeMode } from '../types';
import { useI18n, TranslationKey } from '../lib/i18n';

interface GlobalControlsProps {
  settings: ImageSettings;
  onChangeSettings: (newSettings: ImageSettings) => void;
  onApplyToAll: () => void;
  onCompressAll: () => void;
  onDownloadZip: () => void;
  onClearAll: () => void;
  totalImages: number;
  completedImages: number;
  isCompressing: boolean;
  zipProgress?: number | null;
}

export const GlobalControls: React.FC<GlobalControlsProps> = ({
  settings,
  onChangeSettings,
  onApplyToAll,
  onCompressAll,
  onDownloadZip,
  onClearAll,
  totalImages,
  completedImages,
  isCompressing,
  zipProgress,
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { t } = useI18n();

  const handlePresetSelect = (preset: CompressionPreset) => {
    let quality = settings.quality;
    let targetSize = settings.targetSizeKB;

    if (preset === 'low') {
      quality = 0.88;
    } else if (preset === 'medium') {
      quality = 0.72;
    } else if (preset === 'high') {
      quality = 0.48;
    } else if (preset === 'target' && !targetSize) {
      targetSize = 100; // default 100 KB target
    }

    onChangeSettings({
      ...settings,
      preset,
      quality,
      targetSizeKB: targetSize,
    });
  };

  const handleTargetSizeSelect = (kb: number) => {
    onChangeSettings({
      ...settings,
      preset: 'target',
      targetSizeKB: kb,
    });
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all space-y-6">
      
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-500" />
            <span>{t('compressionSettings')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t('settingsDesc')}
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            id="btn-compress-all"
            disabled={isCompressing || totalImages === 0}
            onClick={onCompressAll}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>{isCompressing ? t('compressingStatus') : t('recompressAll')}</span>
          </button>

          <button
            type="button"
            id="btn-download-zip"
            disabled={completedImages === 0}
            onClick={onDownloadZip}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {zipProgress !== null && zipProgress !== undefined
                ? `${t('zippingProgress')} (${zipProgress}%)...`
                : `${t('downloadZip')} (${completedImages})`}
            </span>
          </button>

          <button
            type="button"
            id="btn-clear-all"
            disabled={totalImages === 0}
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium transition-colors"
            title={t('clearAll')}
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('clearAll')}</span>
          </button>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Compression Preset & Target Size */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{t('compressionMode')}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold lowercase capitalize">
              {settings.preset === 'target' 
                ? `${t('targetMode')}: ${settings.targetSizeKB} KB` 
                : settings.preset === 'low' ? t('presetLow')
                : settings.preset === 'medium' ? t('presetMedium')
                : settings.preset === 'high' ? t('presetHigh')
                : 'Custom'}
            </span>
          </label>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60">
            {(['low', 'medium', 'high', 'target'] as CompressionPreset[]).map((preset) => {
              const label = preset === 'low' ? t('presetLow') 
                : preset === 'medium' ? t('presetMedium') 
                : preset === 'high' ? t('presetHigh') 
                : t('targetMode');
              return (
                <button
                  key={preset}
                  type="button"
                  id={`preset-btn-${preset}`}
                  onClick={() => handlePresetSelect(preset)}
                  className={`py-2 px-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                    settings.preset === preset
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm border border-slate-200 dark:border-slate-600'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Quality Slider (when in Low/Medium/High/Custom) */}
          {settings.preset !== 'target' ? (
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                <span>{t('qualityLabel')}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {Math.round(settings.quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                id="quality-slider"
                value={Math.round(settings.quality * 100)}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) / 100;
                  onChangeSettings({
                    ...settings,
                    preset: 'custom',
                    quality: val,
                  });
                }}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>{t('smallerFile')}</span>
                <span>{t('presetMedium')}</span>
                <span>{t('bestQuality')}</span>
              </div>
            </div>
          ) : (
            /* Target File Size Quick Presets */
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-indigo-500" /> {t('targetFileSize')}
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {settings.targetSizeKB} KB ({settings.targetSizeKB && settings.targetSizeKB >= 1024 ? `${(settings.targetSizeKB / 1024).toFixed(1)} MB` : `${settings.targetSizeKB} KB`})
                </span>
              </div>

              {/* Quick Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[50, 100, 200, 500, 1024, 2048].map((kb) => (
                  <button
                    key={kb}
                    type="button"
                    onClick={() => handleTargetSizeSelect(kb)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
                      settings.targetSizeKB === kb
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-700 dark:text-indigo-300 font-semibold'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {kb >= 1024 ? `${kb / 1024} MB` : `${kb} KB`}
                  </button>
                ))}
              </div>

              {/* Custom KB Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="number"
                  min="10"
                  max="100000"
                  id="target-custom-input"
                  placeholder="Custom KB"
                  value={settings.targetSizeKB || ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10) || 0;
                    onChangeSettings({
                      ...settings,
                      preset: 'target',
                      targetSizeKB: val,
                    });
                  }}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-400 font-semibold">KB</span>
              </div>
            </div>
          )}
        </div>

        {/* Col 2: Output Format */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('outputFormat')}
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'original', label: t('keepOriginal'), desc: 'Preserves file type' },
              { id: 'image/webp', label: 'WebP (Fastest)', desc: 'Up to 35% smaller' },
              { id: 'image/jpeg', label: 'JPG / JPEG', desc: 'Universal compatibility' },
              { id: 'image/png', label: 'PNG (Lossless)', desc: 'For crisp graphics' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                id={`format-btn-${f.id}`}
                onClick={() => onChangeSettings({ ...settings, format: f.id as ImageFormat })}
                className={`p-2.5 text-left rtl:text-right rounded-xl border transition-all ${
                  settings.format === f.id
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="font-semibold text-xs text-slate-900 dark:text-white">{f.label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">{f.desc}</div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>{t('metadataStripped')}</span>
          </div>
        </div>

        {/* Col 3: Dimension Resizing */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>{t('resizeDimensions')}</span>
            <span className="text-slate-400 font-normal">
              {settings.resizeMode === 'original' ? '100% (Original)' : settings.resizeMode === 'percent' ? `${settings.resizePercent}% Scale` : 'Custom Pixels'}
            </span>
          </label>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { mode: 'original' as ResizeMode, percent: 100, label: '100%' },
              { mode: 'percent' as ResizeMode, percent: 75, label: '75%' },
              { mode: 'percent' as ResizeMode, percent: 50, label: '50%' },
              { mode: 'percent' as ResizeMode, percent: 25, label: '25%' },
            ].map((r) => (
              <button
                key={r.label}
                type="button"
                onClick={() =>
                  onChangeSettings({
                    ...settings,
                    resizeMode: r.mode,
                    resizePercent: r.percent,
                  })
                }
                className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                  settings.resizeMode === r.mode && (r.mode === 'original' || settings.resizePercent === r.percent)
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Toggle Advanced Resizing / Custom Dimensions */}
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center justify-between w-full pt-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <span>{t('customDimensions')}</span>
            {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Advanced Custom Dimensions Drawer */}
      {isAdvancedOpen && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Max Width */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('maxWidth')}
              </label>
              <input
                type="number"
                min="10"
                max="10000"
                placeholder="e.g. 1920"
                value={settings.maxWidth || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || undefined;
                  onChangeSettings({
                    ...settings,
                    resizeMode: 'dimensions',
                    maxWidth: val,
                  });
                }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Max Height */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('maxHeight')}
              </label>
              <input
                type="number"
                min="10"
                max="10000"
                placeholder="e.g. 1080"
                value={settings.maxHeight || ''}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || undefined;
                  onChangeSettings({
                    ...settings,
                    resizeMode: 'dimensions',
                    maxHeight: val,
                  });
                }}
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Filename suffix */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t('outputSuffix')}
              </label>
              <input
                type="text"
                placeholder="-min"
                value={settings.filenameSuffix}
                onChange={(e) =>
                  onChangeSettings({
                    ...settings,
                    filenameSuffix: e.target.value,
                  })
                }
                className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
              />
            </div>

          </div>

          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={settings.maintainAspectRatio}
                onChange={(e) =>
                  onChangeSettings({
                    ...settings,
                    maintainAspectRatio: e.target.checked,
                  })
                }
                className="rounded accent-indigo-600"
              />
              <span>{t('lockAspectRatio')}</span>
            </label>
          </div>
        </div>
      )}

      {/* Apply to All Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Settings are automatically synced across your active compression batch.</span>
        <button
          type="button"
          onClick={onApplyToAll}
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {t('reapplyAll')} ({totalImages})
        </button>
      </div>

    </div>
  );
};
