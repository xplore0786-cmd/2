import React from 'react';
import { ShieldCheck, Heart, Zap, Lock, Cpu, Globe, AlertTriangle } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SHOW_PRO, SITE_NAME } from '../config';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                FR
              </div>
              <span className="font-bold text-slate-900 dark:text-white">{SITE_NAME}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fast, 100% in-browser image compressor and photo resizer. Designed for government exam candidates, students, and professionals in India and worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% In-Browser Privacy</span>
            </div>
          </div>

          {/* Col 2: Govt Exam Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Govt Job Exams
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('ssc-photo-signature-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  SSC Photo & Signature (20-50KB)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('upsc-photo-signature-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  UPSC Photo & Signature
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ibps-photo-signature-thumb-declaration')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  IBPS PO / Clerk / RRB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sbi-po-clerk-photo-signature-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  SBI PO & Clerk Resizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rrb-railway-photo-signature-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Railway RRB Photo (30-70KB)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('govt-jobs')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  All Govt Job Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Passport, Visa & ID */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Passport, Visa & ID
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('indian-passport-photo-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Indian Passport (35x45 mm)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('passport-seva-photo-signature-upload')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Passport Seva Online Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('us-visa-photo-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  US Visa (2x2 inch / 600x600 px)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pan-card-photo-signature-resize')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  PAN Card (NSDL / UTIITSL)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resize-signature-to-20kb')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Signature Resizer (10-20KB)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('passport-photo')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  All Passport & ID Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Target KB & Formats */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Resize to KB & Converters
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('resize-image-to-20kb')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Resize to 20 KB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resize-image-to-50kb')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Resize to 50 KB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resize-image-to-100kb')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  Resize to 100 KB
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('webp-to-jpg')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  WebP to JPG Converter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('png-to-jpg')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left">
                  PNG to JPG (White Background)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resize-by-size')} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  All KB & Size Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal, About & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Information & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-bold text-rose-600 dark:text-rose-400 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  <span>Support Project (UPI / Tip)</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disclaimer')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Official Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy-policy')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy (Client-Side)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Support
                </button>
              </li>
              <li className="pt-2">
                <LanguageSwitcher compact={false} />
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mb-6">
          <p>
            <strong>Disclaimer:</strong> {SITE_NAME} is an independent educational and utility web tool. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with any government body, exam authority (SSC, UPSC, IBPS, NTA, RRB), or passport office. All candidates are advised to verify the exact photograph, signature, and document dimensions with the official notification before submitting their forms.
          </p>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>100% In-Browser Compression</span>
            <span>•</span>
            <span>Zero Server Uploads</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
