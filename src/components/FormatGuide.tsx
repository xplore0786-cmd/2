import React from 'react';
import { Layers, Check, Sparkles, FileImage, ShieldCheck, Zap } from 'lucide-react';

export const FormatGuide: React.FC = () => {
  const formats = [
    {
      name: 'WebP',
      badge: 'Recommended',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      bestFor: 'Modern Web, E-commerce, High Performance',
      compression: '30-40% smaller than JPG with same visual quality',
      transparency: 'Yes (Lossless alpha channel)',
      animation: 'Supported',
      pros: ['Smallest payload size', 'Supported by 98%+ modern browsers', 'Retains crisp details'],
    },
    {
      name: 'JPG / JPEG',
      badge: 'Universal Standard',
      badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      bestFor: 'Photographs, Real-world scenery, Print',
      compression: 'Lossy DCT (Discrete Cosine Transform)',
      transparency: 'No (Replaces with background color)',
      animation: 'No',
      pros: ['100% universal device compatibility', 'Excellent color graduation', 'Flexible quality tuning'],
    },
    {
      name: 'PNG',
      badge: 'Lossless & Crisp',
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      bestFor: 'Logos, Screenshots, UI Icons, Graphics with Text',
      compression: 'DEFLATE lossless algorithm',
      transparency: 'Yes (Full 8-bit alpha channel)',
      animation: 'APNG only',
      pros: ['Zero pixel degradation', 'Pixel-perfect sharp edges', 'Ideal for transparent UI badges'],
    },
  ];

  return (
    <section className="w-full py-12 border-t border-slate-200 dark:border-slate-800" id="format-guide-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Format Comparison Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Which format is right for your needs?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Comparing modern image formats to help you pick the best balance of file size, transparency, and clarity.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formats.map((f) => (
            <div
              key={f.name}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{f.name}</h3>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${f.badgeColor}`}>
                    {f.badge}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Best For</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{f.bestFor}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Compression Tech</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{f.compression}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Transparency</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{f.transparency}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                    Key Advantages
                  </span>
                  <ul className="space-y-1.5">
                    {f.pros.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
