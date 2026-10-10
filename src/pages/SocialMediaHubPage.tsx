import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Share2, 
  ArrowRight, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Facebook, 
  Linkedin, 
  Twitter 
} from 'lucide-react';

interface SocialMediaHubPageProps {
  onNavigate: (route: string) => void;
}

export const SocialMediaHubPage: React.FC<SocialMediaHubPageProps> = ({ onNavigate }) => {
  const socialPresets = getPresetsByCategory('social');

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Share2 className="w-3.5 h-3.5" />
          <span>Social Media Dimension Presets</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Social Media Image Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Optimize and format your images for Instagram posts and stories, YouTube thumbnails (1280x720 under 2MB), full WhatsApp profile pictures (DP) without cropping, Facebook covers, LinkedIn banners, and X headers.
        </p>
      </div>

      {/* Grid of Social Media Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPresets.map((preset) => (
          <div
            key={preset.id}
            className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                  {preset.categoryLabel}
                </span>
                <span className="text-[10px] text-slate-400">
                  {preset.items[0]?.aspectRatio || 'Custom'}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {preset.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {preset.metaDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {preset.items.map((item) => (
                  <span 
                    key={item.id}
                    className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                  >
                    {item.label}: {item.widthPx ? `${item.widthPx}x${item.heightPx}` : 'Adaptive'}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(preset.slug)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-xs"
            >
              <span>Format Image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
