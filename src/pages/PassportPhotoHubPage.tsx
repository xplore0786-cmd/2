import React from 'react';
import { getPresetsByCategory } from '../presets';
import { 
  Globe, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface PassportPhotoHubPageProps {
  onNavigate: (route: string) => void;
}

export const PassportPhotoHubPage: React.FC<PassportPhotoHubPageProps> = ({ onNavigate }) => {
  const passportPresets = getPresetsByCategory('passport-id');

  const faqs = [
    {
      question: 'What are the official dimensions of an Indian passport photo?',
      answer: 'The Ministry of External Affairs mandates a physical size of 35 mm x 45 mm (3.5 cm x 4.5 cm). In digital pixels at 300 DPI, this corresponds to exactly 413 pixels wide by 531 pixels tall with a plain white or light off-white background.'
    },
    {
      question: 'What is the required face coverage ratio for biometric passport photos?',
      answer: 'According to International Civil Aviation Organization (ICAO Doc 9303) standards, the candidate face (from the bottom of the chin to the crown of the head) must cover between 70% and 80% of the vertical photo height.'
    },
    {
      question: 'Are eyeglasses allowed in US visa and passport photos?',
      answer: 'No. The US Department of State strictly prohibits eyeglasses in visa (DS-160) and passport photographs to eliminate flash reflections and obscurement of eye biometric markers.'
    },
    {
      question: 'Can I upload a smartphone portrait directly to Passport Seva or VFS Global?',
      answer: 'Yes, provided the image is centered, well-lit without shadows, captured against a clean white background, and formatted into the exact pixel resolution and kilobyte constraints required by the respective agency.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
          <Globe className="w-3.5 h-3.5" />
          <span>Biometric Travel &amp; Identity Standards</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Passport Photo, Visa &amp; ID Card Resizers
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Format photos and documents to official government and ICAO biometric specifications for Indian Passports (35x45 mm), Passport Seva portal, US Visas (2x2 inch), Schengen visas, UK visas, Aadhaar, PAN card, and Driving Licences.
        </p>
      </div>

      {/* Unique In-Depth Intro (250+ Words) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          International Biometric Standards for Passports, Visas &amp; Identity Documents
        </h2>
        <p>
          Official biometric travel and citizenship identification documents—such as national passports, consular tourist and business visas, Permanent Account Number (PAN) cards, Aadhaar cards, Voter ID (EPIC) cards, and state driving licences—must adhere rigorously to international biometric standards codified by the International Civil Aviation Organization (ICAO Doc 9303). Modern automated border inspection gates (e-Gates), high-throughput airport biometric scanners, and diplomatic consular review systems rely heavily on automated facial recognition software to match live traveler geometry against digital photos stored in microchips and government databases.
        </p>
        <p>
          Even trivial photographic defects—such as improper head tilt, an unacceptable face-to-frame coverage ratio, reflections or glare across spectacles, faint background shadows, or non-compliant digital resolutions—cause immediate administrative rejections at Passport Seva Kendras (PSK), Post Office Passport Seva Kendras (POPSK), VFS Global visa application centers, or during online DS-160 visa portal processing. For instance, Indian passport and Schengen visa standards require an exact 35 mm by 45 mm dimension with the applicant face occupying between 70% and 80% of the vertical frame against an off-white background. In contrast, United States visa guidelines demand a 2 inch by 2 inch (600x600 pixels) square image under 240 KB with zero eyeglasses allowed under any circumstances.
        </p>
        <p>
          FreeImageResize delivers precision-engineered digital formatting templates for every major international visa authority and Indian identity portal. Our smart browser-based engine automatically calibrates physical measurements into print-perfect 300 DPI pixel dimensions, crops to the required aspect ratio, and optimizes output JPEG quality to ensure guaranteed compliance. Most importantly, because our zero-upload architecture runs entirely client-side on your local device, your sensitive biometric photographs remain strictly private and secure.
        </p>
      </div>

      {/* Grid of ALL Passport & ID Tools with plain <a href> */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-500" />
            <span>Select Your Passport, Visa or ID Document Tool</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse our dedicated biometric presets to crop, convert, and format photos and signatures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passportPresets.map((preset) => (
            <a
              key={preset.id}
              href={`/${preset.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(preset.slug);
              }}
              className="flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all group no-underline text-inherit"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg">
                    {preset.categoryLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {preset.items[0]?.dimensionCm || preset.items[0]?.aspectRatio || 'Standard'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {preset.title}
                </h3>

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

              <div className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 group-hover:bg-indigo-700 transition-colors shadow-xs">
                <span>Open {preset.title.split('(')[0].trim()}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          Frequently Asked Questions About Passport &amp; Visa Photos
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
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

    </div>
  );
};
