import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SITE_NAME } from '../config';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <AlertTriangle className="w-4 h-4" />
          <span>Official Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Disclaimer & Official Notification Notice
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Please read this important notice regarding government agencies, examination boards, and image dimensions.
        </p>
      </div>

      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Important Callout */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base sm:text-lg font-bold mb-1">
                Not Affiliated With Any Government Body or Exam Authority
              </h2>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>{SITE_NAME}</strong> is an independent educational and utility web application developed to help users format and optimize images. We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with any government body, ministry, or examination authority, including but not limited to the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), State Bank of India (SBI), Railway Recruitment Boards (RRB), National Testing Agency (NTA), UIDAI, Central Board of Direct Taxes (CBDT), Passport Seva, or any State Public Service Commission.
              </p>
            </div>
          </div>
        </div>

        {/* Verification Obligation */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            Always Check the Official Exam Notification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-3">
            Recruitment agencies and examination authorities periodically update their notification criteria, dimensions, allowable file sizes, date stamps, and background specifications from cycle to cycle.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>While we make every effort to keep our preset values up to date based on the latest publicly available notifications, <strong>candidates are solely responsible</strong> for verifying the current rules stated in their specific examination brochure or recruitment portal.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>We provide preset parameters as helpful convenience baselines. You can freely adjust the dimensions, quality, and target KB limits in our tool to match your exact notification rules.</span>
            </li>
          </ul>
        </div>

        {/* Trademarks */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Trademarks & Copyrights</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            All product names, logos, trademarks, and registered trademarks mentioned on this website (e.g., SSC, UPSC, IBPS, NEET, Aadhaar, PAN) are the property of their respective owners. Their mention on this website is solely for informational identification and reference purposes and does not imply any endorsement or affiliation.
          </p>
        </div>
      </div>
    </div>
  );
};
