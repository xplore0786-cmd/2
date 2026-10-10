import React, { useState } from 'react';
import { 
  Heart, 
  Coffee, 
  Copy, 
  Check, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Mail
} from 'lucide-react';
import { SUPPORT_CONFIG, SITE_NAME } from '../config';
import { PageRoute } from '../types';
import { useI18n } from '../lib/i18n';

interface SupportPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  const { t, language } = useI18n();
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(SUPPORT_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const isHinglish = language === 'hinglish';

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{isHinglish ? '100% Free Tool • Voluntary Support' : '100% Free Forever • Support the Project'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {isHinglish ? 'FreeImageResize ko Support Karein' : 'Support FreeImageResize'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isHinglish
            ? 'FreeImageResize hamesha 100% free aur unlimited rahega. Bharat bhar ke lakhon students aur job seekers cyber cafe gaye bina apne SSC, UPSC, IBPS aur police exam form ki photo aur signature resize kar sakein. Agar is tool ne aapka samay ya paisa bachaya, to aap voluntary tip de sakte hain.'
            : 'FreeImageResize is and will always remain 100% free and unlimited. Built to help students and job aspirants across India and globally resize photos & signatures for SSC, UPSC, IBPS, police exams, and passports without cyber cafe charges. If this tool saved you time or money, consider supporting its maintenance!'}
        </p>
      </div>

      {/* Main Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* UPI Option (India) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    UPI Payment (India)
                  </h2>
                  <span className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                0% Fees
              </span>
            </div>

            {/* QR Code Graphic */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
              <img
                src={SUPPORT_CONFIG.qrImagePlaceholder}
                alt="Support FreeImageResize via UPI QR"
                className="w-48 h-48 object-contain rounded-xl bg-white p-2 shadow-2xs"
                width={192}
                height={192}
              />
              <p className="text-[11px] font-semibold text-slate-500 mt-3">
                Payee: <strong className="text-slate-800 dark:text-slate-200">{SUPPORT_CONFIG.payeeName}</strong>
              </p>
            </div>

            {/* UPI ID Copy Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                UPI ID (Virtual Payment Address):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={SUPPORT_CONFIG.upiId}
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono font-semibold"
                />
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            {isHinglish 
              ? 'Koi bhi amount (₹20, ₹50, ₹100) server & domain cost chalane me madad karta hai.'
              : 'Any amount (₹20, ₹50, ₹100) directly supports server, domain & development costs.'}
          </p>
        </div>

        {/* Buy Me a Coffee (Global / Cards) */}
        <div className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Buy Me a Coffee
                  </h2>
                  <span className="text-[11px] text-slate-500">Credit / Debit Card / PayPal (Global)</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Worldwide
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {isHinglish
                  ? 'Agar aap India se bahar hain ya international card use karna chahte hain, to aap Buy Me a Coffee par direct support bhej sakte hain.'
                  : 'For visitors outside India or anyone preferring credit cards or PayPal, you can support us with a coffee! Every contribution keeps the tool completely free and fast.'}
              </p>
              
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>100% Secure Checkout</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Instant Confirmation</span>
                </li>
              </ul>
            </div>

            <a
              href={SUPPORT_CONFIG.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#FFDD00] hover:bg-[#FACC15] active:scale-95 text-slate-950 font-black text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Coffee className="w-4 h-4 fill-slate-950" />
              <span>Buy Me a Coffee</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
            </a>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Questions or feedback?</span>
            <a 
              href={`mailto:${SUPPORT_CONFIG.supportEmail}`}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>{SUPPORT_CONFIG.supportEmail}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Back to Home CTA */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors"
        >
          <span>← Back to Free Image Resizer Tool</span>
        </button>
      </div>

    </div>
  );
};
