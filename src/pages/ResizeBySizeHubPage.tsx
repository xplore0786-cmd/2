import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Maximize2, 
  ArrowRight, 
  Zap, 
  Layers, 
  FileCheck,
  CheckCircle2
} from 'lucide-react';

interface ResizeBySizeHubPageProps {
  onNavigate: (route: string) => void;
}

export const ResizeBySizeHubPage: React.FC<ResizeBySizeHubPageProps> = ({ onNavigate }) => {
  const kbPresets = getPresetsByCategory('resize-to-kb');
  const dimPresets = getPresetsByCategory('dimensions');

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Exact KB & Dimension Resizers</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Resize Images by KB Size & Dimensions
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Compress JPG, PNG, and WebP images to exact target kilobyte thresholds or scale to custom pixel resolutions, percentage ratios, and physical print centimeters/inches at 300 DPI.
        </p>
      </div>

      {/* Section 1: Resize to KB */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-500" />
            Resize to Exact Kilobyte (KB) Limits
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Binary search optimization ensures your files stay strictly within portal limits without loss of readability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kbPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                  {preset.categoryLabel}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
                  {preset.title.split('Online')[0].trim()}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {preset.metaDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(preset.slug)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 transition-colors"
              >
                <span>Compress</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Resize by Dimensions */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            Resize by Dimensions, Ratio & Physical Units
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pixel resolutions, aspect ratio cropping, percentage downscaling, and print-ready centimeters at 300 DPI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dimPresets.map((preset) => (
            <div
              key={preset.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded">
                  {preset.categoryLabel}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-2 mb-1">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {preset.metaDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate(preset.slug)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 transition-colors"
              >
                <span>Resize Dimensions</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
