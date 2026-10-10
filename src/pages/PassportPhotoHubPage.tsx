import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  CreditCard,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface PassportPhotoHubPageProps {
  onNavigate: (route: string) => void;
}

export const PassportPhotoHubPage: React.FC<PassportPhotoHubPageProps> = ({ onNavigate }) => {
  const passportPresets = getPresetsByCategory('passport-id');

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>Passport, Visa & Biometric ID Tools</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Passport Photo & ID Card Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Crop and resize photos to official ICAO and government standards for Indian Passports (35x45 mm), Passport Seva portal, US/Schengen/UK Visas, Aadhaar card, PAN card, and Driving Licences.
        </p>
      </div>

      {/* Verification notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> Biometric passport and visa photo guidelines are strictly enforced by embassies and visa application centers (VFS, TLScontact). Please check country-specific guidelines before booking biometric appointments.
        </p>
      </div>

      {/* Grid of Passport & ID Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passportPresets.map((preset) => (
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
                  {preset.items[0]?.dimensionCm || 'Standard Ratio'}
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
                    {item.label.split('(')[0].trim()}: {item.maxKB ? `≤${item.maxKB}KB` : 'Auto'}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(preset.slug)}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors shadow-xs"
            >
              <span>Format Photo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Key standards breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-500" />
          Standard Passport Photo Specifications at a Glance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">India / UK / Schengen</h4>
            <p>35 mm x 45 mm (3.5 x 4.5 cm). Face coverage 70% to 80%. White or light grey background.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">United States (DS-160)</h4>
            <p>2 x 2 inches (51 x 51 mm / 600 x 600 px). 1:1 Square. White background. No eyeglasses permitted.</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1">PAN Card & Aadhaar</h4>
            <p>NSDL: 213x213 px under 50KB. Aadhaar: 1:1 square under 2MB for UIDAI demographic update.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
