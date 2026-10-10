import React from 'react';
import { AFFILIATE_ITEMS, AFFILIATES_ENABLED } from '../affiliates';
import { ExternalLink, Sparkles, BookOpen, Smartphone, Printer } from 'lucide-react';

export const AffiliateBox: React.FC<{ category?: string }> = () => {
  // Disabled until explicitly enabled and filled
  if (!AFFILIATES_ENABLED || AFFILIATE_ITEMS.length === 0) {
    return null;
  }

  const renderIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-indigo-500" />;
      case 'Printer':
        return <Printer className="w-5 h-5 text-indigo-500" />;
      default:
        return <Smartphone className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="w-full my-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950 border border-indigo-100 dark:border-indigo-950/60 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Recommended Tools & Resources
          </h3>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          Sponsored / Affiliate
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {AFFILIATE_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="flex flex-col justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                {renderIcon(item.iconName)}
                <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {item.description}
              </p>
            </div>
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-3 py-2 rounded-lg transition-colors"
            >
              <span>{item.buttonText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
