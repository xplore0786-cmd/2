import React from 'react';
import { PRESETS, getPresetsByCategory } from '../presets';
import { 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck, 
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';

interface GovtJobsHubPageProps {
  onNavigate: (route: string) => void;
}

export const GovtJobsHubPage: React.FC<GovtJobsHubPageProps> = ({ onNavigate }) => {
  const govtPresets = getPresetsByCategory('govt-jobs');

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Government Job Exam Photo Tools</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Govt Job Photo & Signature Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Quickly crop and compress photos, signatures, thumb impressions, and handwritten declarations for SSC, UPSC, IBPS, Railways (RRB), State PSCs, NEET, and Police recruitment forms. 100% free and client-side private.
        </p>
      </div>

      {/* Verification notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Candidate Notice:</strong> Always check the current official exam brochure or recruitment portal for any recent changes to photo, signature, or date stamp requirements before submitting.
        </p>
      </div>

      {/* Grid of Govt Exam Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {govtPresets.map((preset) => (
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
                  {preset.items.length} {preset.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                {preset.title}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                {preset.metaDescription}
              </p>

              {/* Items chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {preset.items.map((item) => (
                  <span 
                    key={item.id}
                    className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                  >
                    {item.label.split('(')[0].trim()}: {item.minKB ? `${item.minKB}-${item.maxKB}KB` : `${item.maxKB}KB`}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(preset.slug)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-xs"
            >
              <span>Open Resizer Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Guide & Advice section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-indigo-500" />
          General Government Exam Photo Guidelines in India
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Background:</strong> Use a plain white or light off-white background without patterns or shadows.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Facial Coverage:</strong> Face should occupy 70% to 80% of the frame with both ears clearly visible.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Caps or Sunglasses:</strong> Caps, dark glasses, and tinted spectacles are strictly forbidden.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Signature in Running Hand:</strong> Sign on unruled white paper with black/blue ink. Do not use block capitals.</span>
          </li>
        </ul>
      </div>

    </div>
  );
};
