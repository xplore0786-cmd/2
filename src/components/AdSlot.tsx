import React from 'react';
import { ADS_ENABLED, ADSENSE_CLIENT } from '../config';

export interface AdSlotProps {
  position: 'top' | 'belowTool' | 'sidebar' | 'inArticle';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, className = '' }) => {
  // If ads are disabled in config, return empty or zero-height placeholder
  if (!ADS_ENABLED) {
    return null;
  }

  // Pre-determined fixed heights to prevent Cumulative Layout Shift (CLS)
  const heightClasses = {
    top: 'min-h-[90px] max-h-[90px] md:min-h-[100px] md:max-h-[100px]',
    belowTool: 'min-h-[120px] max-h-[120px] md:min-h-[250px] md:max-h-[250px]',
    sidebar: 'min-h-[250px] max-h-[250px] md:min-h-[600px] md:max-h-[600px]',
    inArticle: 'min-h-[120px] max-h-[120px] md:min-h-[250px] md:max-h-[250px]',
  }[position];

  return (
    <div 
      className={`w-full flex flex-col items-center justify-center my-6 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 text-slate-400 text-xs text-center p-2 select-none ${heightClasses} ${className}`}
      aria-label="Advertisement"
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1">
        Sponsored Advertisement
      </span>
      {/* Real AdSense snippet placeholder */}
      <ins 
        className="adsbygoogle w-full h-full block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
